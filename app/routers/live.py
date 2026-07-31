from datetime import date, timedelta

from fastapi import APIRouter, HTTPException, Query

from ..db import run_query
from ..sql_fragments import BAL_COLS, BASE, BU_IDS, DELTA_BAL_COLS, PNL_COLS

router = APIRouter()

_CUTOVER = "2024-07-01"  # first month of the embedded snapshot / live window


def _rownum(r: dict) -> dict:
    out = {}
    for k, v in r.items():
        out[k] = int(v) if k in ("bu", "y", "m") and v is not None else (float(v) if v is not None else 0.0)
    return out


@router.get("/api/live/monthly")
def live_monthly():
    """Mirrors window.liveMonthly() in the original HTML: monthly P&L + balance
    movements per business unit, opening balances, and top AR/AP counterparties."""
    try:
        pl = run_query(
            f"""SELECT intBusinessUnitId bu,YEAR(dteTransactionDate) y,MONTH(dteTransactionDate) m,{PNL_COLS},
             {DELTA_BAL_COLS}
             {BASE} AND dteTransactionDate>=:cutover
             GROUP BY intBusinessUnitId,YEAR(dteTransactionDate),MONTH(dteTransactionDate)""",
            {"cutover": _CUTOVER},
        )
        if not pl:
            raise HTTPException(status_code=502, detail="no monthly rows returned")

        openb = run_query(
            f"""SELECT intBusinessUnitId bu,{BAL_COLS}
             {BASE} AND dteTransactionDate<:cutover GROUP BY intBusinessUnitId""",
            {"cutover": _CUTOVER},
        )

        ar_top = run_query(
            f"""SELECT bu,name,bal FROM (SELECT intBusinessUnitId bu,strPartnerName name,SUM(numAmount)/1e7 bal,
             ROW_NUMBER() OVER(PARTITION BY intBusinessUnitId ORDER BY SUM(numAmount) DESC) rn
             {BASE} AND strGeneralLedgerName='Trade Receivable (Local)' AND strPartnerName IS NOT NULL
             GROUP BY intBusinessUnitId,strPartnerName) x WHERE rn<=8"""
        )
        ap_top = run_query(
            f"""SELECT bu,name,bal FROM (SELECT intBusinessUnitId bu,strPartnerName name,-SUM(numAmount)/1e7 bal,
             ROW_NUMBER() OVER(PARTITION BY intBusinessUnitId ORDER BY SUM(numAmount) ASC) rn
             {BASE} AND strGeneralLedgerName='Payable against Suppliers' AND strPartnerName IS NOT NULL
             GROUP BY intBusinessUnitId,strPartnerName) x WHERE rn<=8"""
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"live monthly query failed: {e}")

    return {
        "pl": [_rownum(r) for r in pl],
        "open": [_rownum(r) for r in openb],
        "arTop": ar_top,
        "apTop": ap_top,
    }


@router.get("/api/live/exact")
def live_exact(
    from_: date = Query(..., alias="from"),
    to: date = Query(...),
    bu: int | None = Query(None),
    pc: str | None = Query(None, description="Comma-separated profit center ids to filter to"),
):
    """Mirrors window.liveExact(): current-period, same-period-last-year, and
    balance-as-of-`to` figures, optionally scoped to a single business unit
    and/or a set of profit centers."""
    if to < from_:
        raise HTTPException(status_code=400, detail="to must be >= from")
    if bu is not None and bu not in BU_IDS:
        raise HTTPException(status_code=400, detail="unknown business unit id")
    pc_ids = [int(x) for x in pc.split(",") if x.strip()] if pc else []

    py_from, py_to = from_ - timedelta(days=365), to - timedelta(days=365)
    bu_filter = " AND intBusinessUnitId=:bu" if bu is not None else ""
    pc_filter = f" AND intProfitCenterId IN ({','.join(str(i) for i in pc_ids)})" if pc_ids else ""
    params = {"f": from_, "t": to, "pf": py_from, "pt": py_to}
    if bu is not None:
        params["bu"] = bu

    try:
        cur = run_query(
            f"SELECT intBusinessUnitId bu,{PNL_COLS} {BASE}{bu_filter}{pc_filter} AND dteTransactionDate>=:f AND dteTransactionDate<=:t GROUP BY intBusinessUnitId",
            params,
        )
        py = run_query(
            f"SELECT intBusinessUnitId bu,{PNL_COLS} {BASE}{bu_filter}{pc_filter} AND dteTransactionDate>=:pf AND dteTransactionDate<=:pt GROUP BY intBusinessUnitId",
            params,
        )
        end = run_query(
            f"SELECT intBusinessUnitId bu,{BAL_COLS} {BASE}{bu_filter}{pc_filter} AND dteTransactionDate<=:t GROUP BY intBusinessUnitId",
            params,
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"live exact query failed: {e}")

    zero = {"rev": 0, "oth": 0, "cogs": 0, "sm": 0, "logi": 0, "admin": 0, "mfg": 0, "depr": 0, "fin": 0, "tax": 0,
             "salesTax": 0, "salesWastage": 0}
    ids = [bu] if bu is not None else BU_IDS
    cur_m = {str(b): dict(zero) for b in ids}
    py_m = {str(b): dict(zero) for b in ids}
    end_m = {}
    for r in cur:
        cur_m[str(int(r["bu"]))] = {**zero, **_rownum(r)}
    for r in py:
        py_m[str(int(r["bu"]))] = {**zero, **_rownum(r)}
    for r in end:
        end_m[str(int(r["bu"]))] = _rownum(r)

    return {
        "key": f"{bu if bu is not None else 'all'}|{from_}|{to}|{pc or ''}",
        "cur": cur_m,
        "py": py_m,
        "end": end_m,
    }


@router.get("/api/live/profit-centers")
def profit_centers(bu: str = Query(..., description="Comma-separated business unit ids")):
    """Profit centers for the given business unit(s), to populate the Profit
    Center filter -- cascades off the selected company/companies."""
    bu_ids = [int(x) for x in bu.split(",") if x.strip()]
    if not bu_ids or any(b not in BU_IDS for b in bu_ids):
        raise HTTPException(status_code=400, detail="unknown business unit id")
    rows = run_query(
        "SELECT intProfitCenterId id, strProfitCenterName name, intBusinessUnitId bu"
        " FROM cco.tblProfitCenter WHERE isActive=1 AND intBusinessUnitId IN"
        f" ({','.join(str(b) for b in bu_ids)}) ORDER BY strProfitCenterName",
    )
    return [{"id": int(r["id"]), "name": r["name"], "bu": int(r["bu"])} for r in rows]
