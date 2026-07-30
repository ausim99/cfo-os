from urllib.parse import quote_plus

from sqlalchemy import create_engine, text

from .config import settings

# ponytail: direct SQLAlchemy/pyodbc for v1. To swap to an MCP sql_query tool later,
# replace run_query()'s body with an MCP client call that returns the same list[dict]
# shape -- callers (routers/live.py) don't need to change.


def _engine():
    odbc = (
        f"mssql+pyodbc://{quote_plus(settings.MSSQL_USER)}:{quote_plus(settings.MSSQL_PASSWORD)}"
        f"@{settings.MSSQL_SERVER}:{settings.MSSQL_PORT}/{settings.MSSQL_DATABASE}"
        f"?driver={quote_plus(settings.MSSQL_DRIVER)}"
    )
    return create_engine(odbc, pool_pre_ping=True)


_ENGINE = None


def get_engine():
    global _ENGINE
    if _ENGINE is None:
        _ENGINE = _engine()
    return _ENGINE


def run_query(sql: str, params: dict | None = None) -> list[dict]:
    with get_engine().connect() as conn:
        rows = conn.execute(text(sql), params or {}).mappings().all()
        return [dict(r) for r in rows]
