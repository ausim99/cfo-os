import requests
from fastapi import HTTPException

from .ai_common import parse_json_reply
from .config import settings


def call_gemini(prompt: str) -> dict:
    """Send prompt to Google Gemini (generateContent) and parse the JSON object
    the model returns, same contract as call_grok()."""
    if not settings.GEMINI_API_KEY:
        raise HTTPException(status_code=503, detail="GEMINI_API_KEY not configured")
    try:
        res = requests.post(
            f"{settings.GEMINI_BASE_URL}/models/{settings.GEMINI_MODEL}:generateContent",
            params={"key": settings.GEMINI_API_KEY},
            headers={"Content-Type": "application/json"},
            json={"contents": [{"parts": [{"text": prompt}]}]},
            timeout=60,
        )
        if not res.ok:
            raise HTTPException(status_code=502, detail=f"Gemini request failed: {res.status_code} {res.text[:500]}")
        text = res.json()["candidates"][0]["content"]["parts"][0]["text"]
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Gemini request failed: {e}")

    return parse_json_reply(text, "Gemini")
