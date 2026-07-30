from datetime import date, timedelta

from fastapi import APIRouter, HTTPException, Query

from ..db import run_query
from ..sql_fragments import BS_BUCKET_CASE, BU_IDS, RATIO_PNL_CASE

router = APIRouter()

# Asset-type buckets: raw numAmount used as-is (debit-normal).
_ASSET_BUCKETS = ("cash", "ar", "inv", "otherCA", "fixedAssetGross", "accDep", "investments", "intangibles")
# Liability/equity buckets: raw numAmount is negative: negate for a positive display figure.
_CREDIT_BUCKETS = ("curLiabOther", "debtST", "nonCurLiabOther", "debtLT", "equity")


def _bucket_sums(rows: list, keys: tuple) -> dict:
    out = {k: 0.0 for k in keys}
    for r in rows:
        b = r["bucket"]
        if b in out:
            out[b] += float(r["amt"] or 0)
    return out


def _bs_snapshot(bu: int, as_of: date) -> dict:
    rows = run_query(
        f"""SELECT {BS_BUCKET_CASE} bucket, SUM(numAmount) amt
         FROM fin.tblAccountingJournalArc
         WHERE isActive=1 AND intBusinessUnitId=:bu AND dteTransactionDate<=:asof
         GROUP BY {BS_BUCKET_CASE}""",
        {"bu": bu, "asof": as_of},
    )
    a = _bucket_sums(rows, _ASSET_BUCKETS)
    c = _bucket_sums(rows, _CREDIT_BUCKETS)
    net_fixed = a["fixedAssetGross"] + a["accDep"]  # accDep already negative, nets it down
    current_assets = a["cash"] + a["ar"] + a["inv"] + a["otherCA"]
    total_assets = current_assets + net_fixed + a["investments"] + a["intangibles"]
    current_liab = -c["curLiabOther"] + -c["debtST"]
    non_current_liab = -c["nonCurLiabOther"] + -c["debtLT"]
    total_debt = -c["debtST"] + -c["debtLT"]
    total_equity = -c["equity"]
    return {
        "cash": a["cash"], "ar": a["ar"], "inv": a["inv"], "otherCA": a["otherCA"],
        "netFixedAssets": net_fixed, "investments": a["investments"], "intangibles": a["intangibles"],
        "currentAssets": current_assets, "totalAssets": total_assets,
        "currentLiab": current_liab, "nonCurrentLiab": non_current_liab,
        "payables": -c["curLiabOther"], "totalDebt": total_debt, "totalEquity": total_equity,
        "workingCapital": current_assets - current_liab,
    }


def _pl_period(bu: int, f: date, t: date) -> dict:
    rows = run_query(
        f"""SELECT {RATIO_PNL_CASE} bucket, SUM(numAmount) amt
         FROM fin.tblAccountingJournalArc
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
    other_operating_gain_loss = -v["otherIncome"]  # proxy: no finer operating/non-operating split at GL level
    ebitda = gross_margin - other_opex + other_operating_gain_loss
    depr_amort = v["depr"]
    ebit = ebitda - depr_amort
    financial_exp = v["financial"]
    non_operating_income = -(v["capitalGain"] + v["freightIncome"] + v["agencyIncome"])
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
               safe_div(closing["currentAssets"] - closing["inv"], closing["currentLiab"]), "x",
               "Prepaid Expense isn't a separate GL bucket -- it's netted inside Other Current Assets, so only Inventory is excluded here"),
        _ratio("1.02", "Current Ratio", ">1.5", ">", 1.5, safe_div(closing["currentAssets"], closing["currentLiab"]), "x"),
        _ratio("1.03", "Net Working Capital Ratio", ">0.1", ">", 0.1,
               safe_div(closing["currentAssets"] - closing["currentLiab"], closing["totalAssets"]), "x"),
    ]
    profitability = [
        _ratio("2.01", "Gross Profit Ratio", ">0.2", ">", 0.2, safe_div(pl["grossMargin"], pl["netRevenue"]), "x"),
        _ratio("2.02", "EBITDA Margin", ">0.1", ">", 0.1, safe_div(pl["ebitda"], pl["netRevenue"]), "x"),
        _ratio("2.03", "Net Profit Ratio", ">0.06", ">", 0.06, safe_div(pl["netIncome"], pl["netRevenue"]), "x"),
        _ratio("2.04", "Operating Cash Flow Ratio", ">0.08", ">", 0.08, safe_div(ocf, pl["netRevenue"]), "x",
               "Operating Cash Flow derived from BS deltas (indirect method), not a stored ledger figure"),
        _ratio("2.05", "Return on Assets (ROA)", ">0.05", ">", 0.05, safe_div(pl["netIncome"], closing["totalAssets"]), "x"),
        _ratio("2.06", "Return on Equity (ROE)", ">0.1", ">", 0.1, safe_div(pl["netIncome"], closing["totalEquity"]), "x"),
        _ratio("2.07", "Return on Capital Employed (ROCE)", ">0.1", ">", 0.1,
               safe_div(pl["ebit"], closing["totalAssets"] - closing["currentLiab"]), "x"),
    ]
    activity = [
        _ratio("3.01", "Asset Turnover Ratio", ">1", ">", 1, safe_div(pl["netRevenue"], avg["totalAssets"]), "x"),
        _ratio("3.02", "Fixed Asset Turnover Ratio", ">2", ">", 2, safe_div(pl["netRevenue"], avg["netFixedAssets"]), "x"),
        _ratio("3.03", "Inventory Turnover Ratio", ">4", ">", 4, safe_div(pl["netRevenue"], avg["inv"]), "x"),
        _ratio("3.04", "Accounts Receivable Turnover Ratio", ">6", ">", 6, safe_div(pl["netRevenue"], avg["ar"]), "x",
               "Net Credit Sales proxied by Net Revenue (no cash/credit flag on transactions)"),
        _ratio("3.05", "Accounts Payable Turnover Ratio", ">6", ">", 6, safe_div(pl["cogs"], avg["payables"]), "x",
               "Net Credit Purchase proxied by COGS"),
        _ratio("3.06", "Working Capital Turnover Ratio", ">5", ">", 5, safe_div(pl["netRevenue"], avg["workingCapital"]), "x"),
        _ratio("3.07", "Days Sales Outstanding", "<50", "<", 50, (safe_div(avg["ar"], pl["netRevenue"]) or 0) * 365, "days"),
        _ratio("3.08", "Days Inventory Outstanding", "<60", "<", 60, (safe_div(avg["inv"], pl["cogs"]) or 0) * 365, "days"),
        _ratio("3.09", "Days Payable Outstanding", ">30", ">", 30, (safe_div(avg["payables"], pl["cogs"]) or 0) * 365, "days"),
        _ratio("3.12", "Free Cash Flow", ">0", ">", 0, fcf, "amt"),
        _ratio("3.13", "Days Cash on Hand", ">30", ">", 30,
               safe_div(closing["cash"], ((pl["cogs"] + pl["mfg"] + pl["adminExp"] + pl["marketingExp"] + pl["sellingExp"] + pl["logisticsExp"] + pl["financialExp"] + pl["taxExp"]) * annualize - pl["deprAmort"] * annualize) / 365),
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
            "Net Credit Sales / Net Credit Purchase are proxied by Net Revenue / COGS (no cash-vs-credit flag on transactions).",
            "DSCR and Cash Flow Coverage Ratio proxy \"Principal (and Interest)\" with Financial Expenses (no loan repayment schedule table exists in the DWH).",
            "EBITDA's \"Other Operating Gain/Loss\" is proxied by Other Income (no finer operating/non-operating split exists at GL level).",
            "Operating Cash Flow is derived from balance-sheet deltas (indirect method), not a stored ledger figure.",
        ],
    }
