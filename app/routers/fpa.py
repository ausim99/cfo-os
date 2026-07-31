from datetime import date, timedelta

from fastapi import APIRouter, HTTPException, Query

from ..db import run_query
from ..sql_fragments import BU_IDS, CHANNEL_BUCKET, GEO_BUCKET, GLVAR_DEPT_CASE, _GLVAR_GL_IN

router = APIRouter()


def _bu(co: int) -> int:
    if co not in BU_IDS:
        raise HTTPException(status_code=400, detail="unknown business unit id")
    return co


@router.get("/api/fpa/yield")
def fpa_yield(co: int = Query(...), from_: date = Query(..., alias="from"), to: date = Query(...)):
    """Price vs Volume decomposition per SKU: how much of the revenue change
    from same period last year is price-driven vs volume-driven."""
    _bu(co)
    if to < from_:
        raise HTTPException(status_code=400, detail="to must be >= from")
    py_from, py_to = from_ - timedelta(days=365), to - timedelta(days=365)

    sql = """SELECT r.intItemId item_id, r.strItemName name, SUM(r.numOrderQuantity) qty, SUM(r.numNetValue) val
     FROM oms.tblSalesOrderRow r JOIN oms.tblSalesOrderHeader h ON h.intSalesOrderId=r.intSalesOrderId
     WHERE h.intBusinessUnitId=:bu AND h.dteSalesOrderDate BETWEEN :f AND :t AND ISNULL(r.isFreeItem,0)=0
     GROUP BY r.intItemId, r.strItemName"""
    try:
        cur_rows = run_query(sql, {"bu": co, "f": from_, "t": to})
        py_rows = run_query(sql, {"bu": co, "f": py_from, "t": py_to})
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"yield query failed: {e}")

    cur = {int(r["item_id"]): r for r in cur_rows if r["item_id"] is not None}
    py = {int(r["item_id"]): r for r in py_rows if r["item_id"] is not None}

    items = []
    for item_id in set(cur) | set(py):
        c, p = cur.get(item_id), py.get(item_id)
        cur_qty, cur_val = (float(c["qty"]), float(c["val"])) if c else (0.0, 0.0)
        py_qty, py_val = (float(p["qty"]), float(p["val"])) if p else (0.0, 0.0)
        name = (c or p)["name"]
        if cur_qty and py_qty:
            cur_price, py_price = cur_val / cur_qty, py_val / py_qty
            price_effect = (cur_price - py_price) * cur_qty
            volume_effect = (cur_qty - py_qty) * py_price
        elif cur_qty and not py_qty:
            price_effect, volume_effect = 0.0, cur_val  # new SKU: all upside is "volume" (new business)
        elif py_qty and not cur_qty:
            price_effect, volume_effect = 0.0, -py_val  # dropped SKU: all downside is "volume"
        else:
            continue
        net = price_effect + volume_effect
        if abs(net) < 1e-6:
            continue
        items.append({
            "itemId": item_id, "name": name, "curRevenue": cur_val, "pyRevenue": py_val,
            "priceEffect": price_effect, "volumeEffect": volume_effect, "netEffect": net,
        })

    items.sort(key=lambda x: x["netEffect"], reverse=True)
    total_price = sum(i["priceEffect"] for i in items)
    total_volume = sum(i["volumeEffect"] for i in items)
    return {
        "total": {
            "curRevenue": sum(i["curRevenue"] for i in items),
            "pyRevenue": sum(i["pyRevenue"] for i in items),
            "priceEffect": total_price,
            "volumeEffect": total_volume,
        },
        "topPositive": items[:5],
        "topNegative": list(reversed(items[-5:])) if len(items) > 5 else list(reversed(items)),
    }


@router.get("/api/fpa/channel-geo")
def fpa_channel_geo(co: int = Query(...), from_: date = Query(..., alias="from"), to: date = Query(...)):
    """Sales split by distribution channel and by geography (territory)."""
    _bu(co)
    if to < from_:
        raise HTTPException(status_code=400, detail="to must be >= from")
    params = {"bu": co, "f": from_, "t": to}
    try:
        channel = run_query(
            f"""SELECT {CHANNEL_BUCKET} bucket, SUM(r.numNetValue) val
             FROM oms.tblSalesOrderRow r JOIN oms.tblSalesOrderHeader h ON h.intSalesOrderId=r.intSalesOrderId
             WHERE h.intBusinessUnitId=:bu AND h.dteSalesOrderDate BETWEEN :f AND :t
             GROUP BY {CHANNEL_BUCKET}""",
            params,
        )
        geo = run_query(
            f"""SELECT {GEO_BUCKET} bucket, SUM(r.numNetValue) val
             FROM oms.tblSalesOrderRow r JOIN oms.tblSalesOrderHeader h ON h.intSalesOrderId=r.intSalesOrderId
             LEFT JOIN rtm.tblTerritoryInfo t ON t.intTerritoryId=h.intTerritoryId
             WHERE h.intBusinessUnitId=:bu AND h.dteSalesOrderDate BETWEEN :f AND :t
             GROUP BY {GEO_BUCKET}""",
            params,
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"channel/geo query failed: {e}")

    return {
        "channel": [{"name": r["bucket"], "value": float(r["val"] or 0)} for r in channel],
        "geo": [{"name": r["bucket"], "value": float(r["val"] or 0)} for r in geo],
    }


@router.get("/api/fpa/prod-inventory")
def fpa_prod_inventory(co: int = Query(...), from_: date = Query(..., alias="from"), to: date = Query(...)):
    """Production status (OEE proxy + order counts) and inventory status
    (ABC value split + ageing buckets from last-receipt date)."""
    _bu(co)
    if to < from_:
        raise HTTPException(status_code=400, detail="to must be >= from")
    params = {"bu": co, "f": from_, "t": to}
    try:
        oee = run_query(
            """SELECT SUM(numShiftTargetQuantity) target, SUM(numActualOutputQuantity) actual,
             SUM(numGoodOutputQuantity) good, SUM(numAvailableMinute) avail_min, SUM(numLoadingMinute) load_min
             FROM mes.tblOeeProdWasteHeader
             WHERE intBusinessUnitId=:bu AND isActive=1 AND dteProductionDate BETWEEN :f AND :t""",
            params,
        )
        orders = run_query(
            """SELECT SUM(CASE WHEN isClose=1 THEN 1 ELSE 0 END) closed_ct, SUM(CASE WHEN isClose=0 OR isClose IS NULL THEN 1 ELSE 0 END) open_ct
             FROM mes.tblProductionOrder
             WHERE intBusinessUnitId=:bu AND isActive=1 AND dteStartDate<=:t AND (dteEndDate IS NULL OR dteEndDate>=:f)""",
            params,
        )
        abc = run_query(
            """SELECT ISNULL(NULLIF(w.strABC,''),'Unclassified') abc, SUM(w.numCurrentStock*ISNULL(i.numAverageRate,0))/1e7 value
             FROM wms.tblItemPlantWarehouse w
             LEFT JOIN itm.tblItem i ON i.intItemId=w.intItemId AND i.intBusinesUnitId=w.intBusinessUnitId
             WHERE w.intBusinessUnitId=:bu AND w.isActive=1 AND w.numCurrentStock>0
             GROUP BY ISNULL(NULLIF(w.strABC,''),'Unclassified')""",
            {"bu": co},
        )
        ageing = run_query(
            """SELECT
             CASE WHEN DATEDIFF(day,i.dteLastReceiptDate,GETDATE())<=30 THEN '0-30'
                  WHEN DATEDIFF(day,i.dteLastReceiptDate,GETDATE())<=60 THEN '31-60'
                  WHEN DATEDIFF(day,i.dteLastReceiptDate,GETDATE())<=90 THEN '61-90'
                  ELSE '90+' END bucket,
             SUM(w.numCurrentStock*ISNULL(i.numAverageRate,0))/1e7 value
             FROM wms.tblItemPlantWarehouse w
             JOIN itm.tblItem i ON i.intItemId=w.intItemId AND i.intBusinesUnitId=w.intBusinessUnitId
             WHERE w.intBusinessUnitId=:bu AND w.isActive=1 AND w.numCurrentStock>0 AND i.dteLastReceiptDate IS NOT NULL
             GROUP BY CASE WHEN DATEDIFF(day,i.dteLastReceiptDate,GETDATE())<=30 THEN '0-30'
                  WHEN DATEDIFF(day,i.dteLastReceiptDate,GETDATE())<=60 THEN '31-60'
                  WHEN DATEDIFF(day,i.dteLastReceiptDate,GETDATE())<=90 THEN '61-90'
                  ELSE '90+' END""",
            {"bu": co},
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"production/inventory query failed: {e}")

    o = oee[0] if oee else {}
    avail_min, load_min = float(o.get("avail_min") or 0), float(o.get("load_min") or 0)
    target, actual, good = float(o.get("target") or 0), float(o.get("actual") or 0), float(o.get("good") or 0)
    availability = load_min / avail_min * 100 if avail_min else 0.0
    performance = actual / target * 100 if target else 0.0  # proxy: no standard ideal-cycle-time feed available
    quality = good / actual * 100 if actual else 0.0
    ord_row = orders[0] if orders else {}

    by_abc = {}
    for r in abc:
        key = r["abc"] if r["abc"] in ("A", "B", "C") else "Unclassified"
        by_abc[key] = by_abc.get(key, 0.0) + float(r["value"] or 0)

    return {
        "production": {
            "availability": availability, "performance": performance, "quality": quality,
            "oee": availability * performance * quality / 10000,
            "openOrders": int(ord_row.get("open_ct") or 0), "closedOrders": int(ord_row.get("closed_ct") or 0),
        },
        "inventory": {
            "byAbc": [{"abc": k, "value": v} for k, v in by_abc.items()],
            "ageing": [{"bucket": r["bucket"], "value": float(r["value"] or 0)} for r in ageing],
            "total": sum(by_abc.values()),
        },
    }


def _year_months(f: date, t: date) -> list:
    out, y, m = [], f.year, f.month
    while (y, m) <= (t.year, t.month):
        out.append((y, m))
        m += 1
        if m > 12:
            m, y = 1, y + 1
    return out


@router.get("/api/fpa/gl-variance")
def fpa_gl_variance(co: int = Query(...), from_: date = Query(..., alias="from"), to: date = Query(...)):
    """Top-3 sub-GL variance vs budget for each department bucket, plus a
    standalone Finance (Financial Expenses) variance line."""
    _bu(co)
    if to < from_:
        raise HTTPException(status_code=400, detail="to must be >= from")

    ym_pairs = _year_months(from_, to)
    ym_clause = " OR ".join(f"(intYearId={y} AND intMonthId={m})" for y, m in ym_pairs)

    try:
        actual_rows = run_query(
            f"""SELECT {GLVAR_DEPT_CASE} dept, intGeneralLedgerId glid, intSubGLId subglid, strSubGLName subgl,
             SUM(numAmount)/1e7 act
             FROM fin.tblAccountingJournal
             WHERE isActive=1 AND intBusinessUnitId=:bu AND strGeneralLedgerName IN ({_GLVAR_GL_IN})
             AND dteTransactionDate BETWEEN :f AND :t
             GROUP BY {GLVAR_DEPT_CASE}, intGeneralLedgerId, intSubGLId, strSubGLName""",
            {"bu": co, "f": from_, "t": to},
        )
        budget_rows = run_query(
            f"""SELECT intGeneralLedgerId glid, intSubGlId subglid, SUM(numAmount)/1e7 bud
             FROM bgt.tblBudgetIncomeExpenseRow
             WHERE intBusinessUnitId=:bu AND isActive=1 AND ISNULL(isForecast,0)=0 AND ({ym_clause})
             GROUP BY intGeneralLedgerId, intSubGlId""",
            {"bu": co},
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"gl variance query failed: {e}")

    bud_map = {}
    for r in budget_rows:
        if r["glid"] is None:
            continue
        bud_map[(int(r["glid"]), int(r["subglid"]) if r["subglid"] is not None else None)] = float(r["bud"] or 0)

    depts = {}
    for r in actual_rows:
        dept = r["dept"]
        if not dept:
            continue
        glid = int(r["glid"]) if r["glid"] is not None else None
        subglid = int(r["subglid"]) if r["subglid"] is not None else None
        # bgt stores expense budgets negative (contribution-to-profit sign); the
        # fin actual above is raw positive-is-expense (PNL_COLS convention).
        # Negate actual so both sides use the same negative-is-cost convention,
        # matching the existing dashboard's F/U logic (variance >= 0 => favorable).
        act = -float(r["act"] or 0)
        bud = bud_map.get((glid, subglid), 0.0)
        depts.setdefault(dept, []).append({
            "subGl": r["subgl"] or "(unspecified)", "budget": bud, "actual": act, "variance": act - bud,
        })

    finance_lines = depts.pop("Finance", [])
    finance = {
        "budget": sum(x["budget"] for x in finance_lines),
        "actual": sum(x["actual"] for x in finance_lines),
        "variance": sum(x["variance"] for x in finance_lines),
    }

    departments = []
    for dept, lines in depts.items():
        lines.sort(key=lambda x: abs(x["variance"]), reverse=True)
        departments.append({
            "name": dept,
            "budget": sum(x["budget"] for x in lines),
            "actual": sum(x["actual"] for x in lines),
            "variance": sum(x["variance"] for x in lines),
            "top3": lines[:3],
        })
    departments.sort(key=lambda d: abs(d["variance"]), reverse=True)

    return {"departments": departments, "finance": finance}
