from datetime import date, timedelta

from fastapi import APIRouter, HTTPException, Query

from ..db import run_query
from ..sql_fragments import BS_BUCKET_CASE, BU_IDS, RATIO_PNL_CASE

router = APIRouter()

# Asset-type buckets: raw numAmount used as-is (debit-normal).
_ASSET_BUCKETS = ("cash", "ar", "inv", "otherCA", "prepaid", "fixedAssetGross", "accDep", "investments", "intangibles")
# Liability/equity buckets: raw numAmount is negative: negate for a positive display figure.
_CREDIT_BUCKETS = ("curLiabOther", "debtST", "nonCurLiabOther", "debtLT", "equity")


def _bucket_sums(rows: list, keys: tuple) -> dict:
    out = {k: 0.0 for k in keys}
    for r in rows:
        b = r["bucket"]
        if b in out:
            out[b] += float(r["amt"] or 0)
    return out


def _fy_start(d: date) -> date:
    """Akij's fiscal year runs 1 Jul - 30 Jun."""
    return date(d.year if d.month >= 7 else d.year - 1, 7, 1)


def _bs_snapshot(bu: int, as_of: date) -> dict:
    rows = run_query(
        f"""SELECT {BS_BUCKET_CASE} bucket, SUM(numAmount) amt
         FROM fin.tblAccountingJournal
         WHERE isActive=1 AND intBusinessUnitId=:bu AND dteTransactionDate<=:asof
         GROUP BY {BS_BUCKET_CASE}""",
        {"bu": bu, "asof": as_of},
    )
    a = _bucket_sums(rows, _ASSET_BUCKETS)
    c = _bucket_sums(rows, _CREDIT_BUCKETS)
    net_fixed = a["fixedAssetGross"] + a["accDep"]  # accDep already negative, nets it down
    current_assets = a["cash"] + a["ar"] + a["inv"] + a["otherCA"] + a["prepaid"]
    total_assets = current_assets + net_fixed + a["investments"] + a["intangibles"]
    current_liab = -c["curLiabOther"] + -c["debtST"]
    non_current_liab = -c["nonCurLiabOther"] + -c["debtLT"]
    total_debt = -c["debtST"] + -c["debtLT"]
    # Revenue/expense (P&L) GLs only get swept into the Retained Earning GL balance
    # when a formal period-close entry is posted. Since the DWH replica has no
    # closing-header table to know the real last-close date, this assumes annual
    # closing at fiscal year end (confirmed against a real Balance Sheet: BU 4's
    # equity gap at FY2025-26 close matched that FY's Net Income to the taka) --
    # i.e. current fiscal-year-to-date Net Income is still "unclosed" and must be
    # added on top of the cumulative equity GL balance, same as the real
    # fin.sprBalanceSheet SP does with its synthetic GL-65 "Net Income" line.
    unclosed_net_income = _pl_period(bu, _fy_start(as_of), as_of)["netIncome"]
    total_equity = -c["equity"] + unclosed_net_income
    return {
        "cash": a["cash"], "ar": a["ar"], "inv": a["inv"], "otherCA": a["otherCA"], "prepaid": a["prepaid"],
        "netFixedAssets": net_fixed, "investments": a["investments"], "intangibles": a["intangibles"],
        "currentAssets": current_assets, "totalAssets": total_assets,
        "currentLiab": current_liab, "nonCurrentLiab": non_current_liab,
        "payables": -c["curLiabOther"], "totalDebt": total_debt, "totalEquity": total_equity,
        "workingCapital": current_assets - current_liab,
    }


def _pl_period(bu: int, f: date, t: date) -> dict:
    rows = run_query(
        f"""SELECT {RATIO_PNL_CASE} bucket, SUM(numAmount) amt
         FROM fin.tblAccountingJournal
         WHERE isActive=1 AND intBusinessUnitId=:bu AND dteTransactionDate BETWEEN :f AND :t
         GROUP BY {RATIO_PNL_CASE}""",
        {"bu": bu, "f": f, "t": t},
    )
    keys = ("salesLocal", "salesForeign", "salesWastage", "salesTax", "cogs", "mfg", "admin", "marketing",
            "selling", "logistics", "depr", "financial", "tax", "otherIncome", "capitalGain",
            "freightIncome", "agencyIncome")
    v = _bucket_sums(rows, keys)
    gross_revenue = -(v["salesLocal"] + v["salesForeign"])
    sales_tax = v["salesTax"]
    net_revenue = gross_revenue - sales_tax
    gross_margin = net_revenue - v["cogs"] - v["mfg"]
    other_opex = v["admin"] + v["marketing"] + v["selling"] + v["logistics"]
    # Other Operating Gain/Loss = "Operating Income" (Sales (Wastage), doc row 14) plus
    # Freight/Agency Income -- confirmed via the GL->Income Statement Mapping reference that
    # Other Income is NOT operating (it's explicitly mapped to Non Operating Income below),
    # while Sales (Wastage) is explicitly mapped to Operating Income.
    other_operating_gain_loss = -(v["salesWastage"] + v["freightIncome"] + v["agencyIncome"])
    ebitda = gross_margin - other_opex + other_operating_gain_loss
    depr_amort = v["depr"]
    ebit = ebitda - depr_amort
    financial_exp = v["financial"]
    # Non Operating Income per the doc = Capital Gain + Royalty + Financial Income + Other
    # Income + Interest Received from Inter Company + Inter Company Interest Income +
    # Interest Income + Loss/Gain on Asset Disposal. Per the GL->Income Statement Mapping
    # reference, Capital Gain and Other Income both map explicitly to Non Operating Income;
    # Royalty/Financial Income/Interest Income/Inter Company Interest Income/Loss-Gain on
    # Asset Disposal have no distinct GL line in the chart of accounts.
    non_operating_income = -(v["capitalGain"] + v["otherIncome"])
    ebt = ebit - financial_exp + non_operating_income
    tax_exp = v["tax"]
    net_income = ebt - tax_exp
    return {
        "grossRevenue": gross_revenue, "salesTax": sales_tax, "netRevenue": net_revenue,
        "operatingIncomeWastage": -v["salesWastage"], "cogs": v["cogs"], "mfg": v["mfg"],
        "grossMargin": gross_margin, "adminExp": v["admin"], "marketingExp": v["marketing"],
        "sellingExp": v["selling"], "logisticsExp": v["logistics"], "ebitda": ebitda,
        "deprAmort": depr_amort, "ebit": ebit, "financialExp": financial_exp,
        "nonOperatingIncome": non_operating_income, "ebt": ebt, "taxExp": tax_exp, "netIncome": net_income,
        # The ERP's own ratio engine (confirmed by reproducing its printed ratio
        # values exactly, e.g. Gross Profit Ratio, EBITDA Margin, Inventory/AP
        # Turnover) uses Gross Revenue -- not the tax-adjusted Net Sales Revenue
        # above -- as "Net Sales"/"Net Revenue"/"Net Credit Sales", and COGS +
        # Manufacturing Overhead combined as "COGS"/"Net Credit Purchase". These
        # differ from the Income Statement build-up above (which is correct and
        # verified against the real P&L report) -- they're a separate, ERP-internal
        # ratio-denominator convention.
        "ratioNetSales": gross_revenue, "ratioCogs": v["cogs"] + v["mfg"],
    }


def _ratio(sl, name, std, op, threshold, value, unit, note=None):
    if value is None:
        status = "n/a"
    else:
        status = "Good" if (value > threshold if op == ">" else value < threshold) else "Needs Attention"
    return {"sl": sl, "name": name, "std": std, "value": value, "unit": unit, "status": status, "note": note}


@router.get("/api/fpa/ratios")
def fpa_ratios(co: int = Query(...), from_: date = Query(..., alias="from"), to: date = Query(...)):
    """Full ratio pack per docs/Financial_and_Ratio_Formulas.md, computed live
    from the ERP GL (BS buckets via BS_BUCKET_CASE, P&L via RATIO_PNL_CASE)."""
    if co not in BU_IDS:
        raise HTTPException(status_code=400, detail="unknown business unit id")
    if to < from_:
        raise HTTPException(status_code=400, detail="to must be >= from")

    try:
        opening = _bs_snapshot(co, from_ - timedelta(days=1))
        closing = _bs_snapshot(co, to)
        pl = _pl_period(co, from_, to)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"ratios query failed: {e}")

    days = max(1, (to - from_).days + 1)
    avg = {k: (opening[k] + closing[k]) / 2 for k in opening}

    # Indirect-method operating cash flow from balance-sheet deltas + P&L, same
    # structure as the cash-flow statements in docs/*.md.
    d_ar = opening["ar"] - closing["ar"]
    d_inv = opening["inv"] - closing["inv"]
    d_other_ca = opening["otherCA"] - closing["otherCA"]
    d_payables = closing["payables"] - opening["payables"]
    d_non_cur_liab = closing["nonCurrentLiab"] - opening["nonCurrentLiab"]
    ocf = pl["netIncome"] + pl["deprAmort"] + d_ar + d_inv + d_other_ca + d_payables + d_non_cur_liab
    capex = closing["netFixedAssets"] - opening["netFixedAssets"]
    fcf = ocf - capex
    annualize = 365 / days

    def safe_div(a, b):
        return a / b if b else None

    liquidity = [
        _ratio("1.01", "Quick Ratio", ">1.5", ">", 1.5,
               safe_div(closing["currentAssets"] - closing["inv"] - closing["prepaid"], closing["currentLiab"]), "x"),
        _ratio("1.02", "Current Ratio", ">1.5", ">", 1.5, safe_div(closing["currentAssets"], closing["currentLiab"]), "x"),
        _ratio("1.03", "Net Working Capital Ratio", ">0.1", ">", 0.1,
               safe_div(closing["currentAssets"] - closing["currentLiab"], closing["totalAssets"]), "x"),
    ]
    # Gross Profit Ratio's "Gross Profit" is Gross Revenue - COGS - Mfg (no sales-tax
    # deduction) per the ERP's own ratio engine -- distinct from the P&L's grossMargin.
    ratio_gross_profit = pl["ratioNetSales"] - pl["ratioCogs"]
    profitability = [
        _ratio("2.01", "Gross Profit Ratio", ">0.2", ">", 0.2, safe_div(ratio_gross_profit, pl["ratioNetSales"]), "x"),
        _ratio("2.02", "EBITDA Margin", ">0.1", ">", 0.1, safe_div(pl["ebitda"], pl["ratioNetSales"]), "x"),
        _ratio("2.03", "Net Profit Ratio", ">0.06", ">", 0.06, safe_div(pl["netIncome"], pl["ratioNetSales"]), "x"),
        _ratio("2.04", "Operating Cash Flow Ratio", ">0.08", ">", 0.08, safe_div(ocf, pl["ratioNetSales"]), "x",
               "Operating Cash Flow derived from BS deltas (indirect method), not a stored ledger figure"),
        _ratio("2.05", "Return on Assets (ROA)", ">0.05", ">", 0.05, safe_div(pl["netIncome"], closing["totalAssets"]), "x"),
        _ratio("2.06", "Return on Equity (ROE)", ">0.1", ">", 0.1, safe_div(pl["netIncome"], closing["totalEquity"]), "x"),
        _ratio("2.07", "Return on Capital Employed (ROCE)", ">0.1", ">", 0.1,
               safe_div(pl["ebit"], closing["totalAssets"] - closing["currentLiab"]), "x"),
    ]
    activity = [
        _ratio("3.01", "Asset Turnover Ratio", ">1", ">", 1, safe_div(pl["ratioNetSales"], avg["totalAssets"]), "x"),
        _ratio("3.02", "Fixed Asset Turnover Ratio", ">2", ">", 2, safe_div(pl["ratioNetSales"], avg["netFixedAssets"]), "x"),
        _ratio("3.03", "Inventory Turnover Ratio", ">4", ">", 4, safe_div(pl["ratioCogs"], avg["inv"]), "x"),
        _ratio("3.04", "Accounts Receivable Turnover Ratio", ">6", ">", 6, safe_div(pl["ratioNetSales"], avg["ar"]), "x",
               "Net Credit Sales proxied by Gross Revenue (no cash/credit flag on transactions)"),
        _ratio("3.05", "Accounts Payable Turnover Ratio", ">6", ">", 6, safe_div(pl["ratioCogs"], avg["payables"]), "x",
               "Net Credit Purchase proxied by COGS + Manufacturing Overhead"),
        _ratio("3.06", "Working Capital Turnover Ratio", ">5", ">", 5, safe_div(pl["ratioNetSales"], avg["workingCapital"]), "x"),
        _ratio("3.07", "Days Sales Outstanding", "<50", "<", 50, (safe_div(avg["ar"], pl["ratioNetSales"]) or 0) * 365, "days"),
        _ratio("3.08", "Days Inventory Outstanding", "<60", "<", 60, (safe_div(avg["inv"], pl["ratioCogs"]) or 0) * 365, "days"),
        _ratio("3.09", "Days Payable Outstanding", ">30", ">", 30, (safe_div(avg["payables"], pl["ratioCogs"]) or 0) * 365, "days"),
        _ratio("3.12", "Free Cash Flow", ">0", ">", 0, fcf, "amt"),
        _ratio("3.13", "Days Cash on Hand", ">30", ">", 30,
               # Annual Operating Expense, cash basis. D&A is already its own separate GL
               # bucket (never in cogs/mfg/admin/marketing/selling/logistics), so it's not
               # part of this sum to begin with -- no "minus Non-Cash Item" step needed.
               # Financial Expenses and Tax sit below EBIT in the P&L (non-operating), so
               # they're excluded from "Operating Expense" here.
               safe_div(closing["cash"], (pl["cogs"] + pl["mfg"] + pl["adminExp"] + pl["marketingExp"] + pl["sellingExp"] + pl["logisticsExp"]) * annualize / 365),
               "days"),
        _ratio("3.14", "Debt Service Coverage Ratio (DSCR)", ">2.5", ">", 2.5, safe_div(pl["netIncome"], pl["financialExp"]), "x",
               "\"Principal and Interest on all Debt\" proxied by Financial Expenses (no loan repayment schedule table exists)"),
        _ratio("3.15", "Operating Cashflow to Debt Ratio", ">0.25", ">", 0.25, safe_div(ocf, closing["totalDebt"]), "x"),
        _ratio("3.16", "Cash Ratio", ">0.1", ">", 0.1, safe_div(closing["cash"], closing["currentLiab"]), "x"),
        _ratio("3.17", "Cash Flow Coverage Ratio", ">0.25", ">", 0.25, safe_div(ocf, pl["financialExp"]), "x",
               "\"Principal\" proxied by Financial Expenses"),
    ]
    dio_val = next(x["value"] for x in activity if x["sl"] == "3.08")
    dso_val = next(x["value"] for x in activity if x["sl"] == "3.07")
    dpo_val = next(x["value"] for x in activity if x["sl"] == "3.09")
    activity.append(_ratio("3.10", "Operating Cycle", ">60", ">", 60,
                            (dio_val or 0) + (dso_val or 0), "days"))
    activity.append(_ratio("3.11", "Cash Conversion Cycle", "<30", "<", 30,
                            (dio_val or 0) + (dso_val or 0) - (dpo_val or 0), "days"))
    activity.sort(key=lambda x: x["sl"])

    leverage = [
        _ratio("4.01", "Debt to Asset Ratio", "<0.45", "<", 0.45, safe_div(closing["totalDebt"], closing["totalAssets"]), "x"),
        _ratio("4.02", "Debt to Equity Ratio", "<1", "<", 1, safe_div(closing["totalDebt"], closing["totalEquity"]), "x"),
        _ratio("4.03", "Debt to Capital Ratio", ">0.4", ">", 0.4,
               safe_div(closing["totalDebt"], closing["totalDebt"] + closing["totalEquity"]), "x"),
        _ratio("4.04", "Debt to EBITDA Ratio", "<3", "<", 3, safe_div(closing["totalDebt"], pl["ebitda"]), "x"),
        _ratio("4.05", "Asset to Equity Ratio", ">1.5", ">", 1.5, safe_div(closing["totalAssets"], closing["totalEquity"]), "x"),
        _ratio("4.06", "Interest Coverage Ratio", ">3", ">", 3, safe_div(pl["ebit"], pl["financialExp"]), "x"),
        _ratio("4.07", "Financial Debt to Net Worth Ratio", ">0.75", ">", 0.75,
               safe_div(closing["totalDebt"], closing["totalEquity"] - closing["intangibles"]), "x",
               "Tangible Net Worth = Total Equity minus Goodwill/Capitalized Software"),
        _ratio("4.08", "Financial Debt to Total Asset", ">0.45", ">", 0.45, safe_div(closing["totalDebt"], closing["totalAssets"]), "x"),
    ]

    return {
        "plLines": pl,
        "balanceSheet": {"opening": opening, "closing": closing, "avg": avg},
        "cashFlow": {"operatingCashFlow": ocf, "capex": capex, "freeCashFlow": fcf},
        "ratios": {"liquidity": liquidity, "profitability": profitability, "activity": activity, "leverage": leverage},
        "approximations": [
            "Ratio formulas (2.01-2.04, 3.01-3.09) use the ERP's own ratio-engine convention for \"Net Sales\"/\"Net Revenue\" (= Gross Revenue, no sales-tax deduction) and \"COGS\" (= COGS + Manufacturing Overhead) -- confirmed by reproducing the ERP's own printed ratio values exactly. This differs from the Income Statement build-up above (Net Sales Revenue = Gross Revenue - Sales Tax), which is correct as-is and verified against the real P&L report.",
            "Net Credit Sales / Net Credit Purchase are proxied by Gross Revenue / (COGS + Manufacturing Overhead) (no cash-vs-credit flag on transactions).",
            "DSCR and Cash Flow Coverage Ratio proxy \"Principal (and Interest)\" with Financial Expenses (no loan repayment schedule table exists in the DWH).",
            "EBITDA's \"Other Operating Gain/Loss\" is Sales (Wastage) [doc's \"Operating Income\"] + Freight Income + Agency Income.",
            "Non Operating Income is Capital Gain + Other Income -- Royalty, Financial Income, Interest Income, Inter Company Interest Income, and Loss/Gain on Asset Disposal have no distinct GL line in the chart of accounts.",
            "Operating Cash Flow is derived from balance-sheet deltas (indirect method), not a stored ledger figure.",
        ],
    }
