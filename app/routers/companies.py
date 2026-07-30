from fastapi import APIRouter

from ..static_data import get_companies, get_live_asof

router = APIRouter()


@router.get("/api/companies")
def companies():
    return {"companies": get_companies()}


@router.get("/api/snapshot")
def snapshot():
    # The embedded CSV snapshot itself is served as a static asset (loaded directly
    # by the frontend, and used as the automatic offline fallback -- see app.js).
    return {"asof": get_live_asof(), "embedded_data_url": "/static/daily_data.js"}
