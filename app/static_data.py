"""Reads the embedded snapshot constants straight out of static/daily_data.js so the
backend and frontend never hold two copies of the same data to keep in sync."""

import json
import re
from functools import lru_cache
from pathlib import Path

DAILY_DATA_JS = Path(__file__).resolve().parent.parent / "static" / "daily_data.js"


@lru_cache
def _text() -> str:
    return DAILY_DATA_JS.read_text(encoding="utf-8")


def get_companies() -> list:
    m = re.search(r"const COMPANIES\s*=\s*(\[.*?\]);", _text())
    return json.loads(m.group(1)) if m else []


def get_live_asof() -> str:
    m = re.search(r'let LIVE_ASOF\s*=\s*"([^"]*)"', _text())
    return m.group(1) if m else ""
