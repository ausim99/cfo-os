import requests
from fastapi import HTTPException

from .ai_common import parse_json_reply
from .config import settings


def _post_gemini(prompt: str, tools: list | None = None) -> dict:
    if not settings.GEMINI_API_KEY:
        raise HTTPException(status_code=503, detail="GEMINI_API_KEY not configured")
    body = {"contents": [{"parts": [{"text": prompt}]}]}
    if tools:
        body["tools"] = tools
    try:
        res = requests.post(
            f"{settings.GEMINI_BASE_URL}/models/{settings.GEMINI_MODEL}:generateContent",
            params={"key": settings.GEMINI_API_KEY},
            headers={"Content-Type": "application/json"},
            json=body,
            timeout=60,
        )
        if not res.ok:
            raise HTTPException(status_code=502, detail=f"Gemini request failed: {res.status_code} {res.text[:500]}")
        return res.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Gemini request failed: {e}")


def call_gemini(prompt: str) -> dict:
    """Send prompt to Google Gemini (generateContent) and parse the JSON object
    the model returns, same contract as call_grok()."""
    data = _post_gemini(prompt)
    text = data["candidates"][0]["content"]["parts"][0]["text"]
    return parse_json_reply(text, "Gemini")


def call_gemini_grounded(prompt: str) -> dict:
    """Like call_gemini but with Google Search grounding enabled, so the model
    can pull in current public web results (used for the competitor/market
    share module, which has no ERP-backed data source)."""
    data = _post_gemini(prompt, tools=[{"google_search": {}}])
    candidate = data["candidates"][0]
    text = candidate["content"]["parts"][0]["text"]
    result = parse_json_reply(text, "Gemini")
    chunks = (candidate.get("groundingMetadata") or {}).get("groundingChunks") or []
    result["sources"] = [
        {"title": c["web"]["title"], "uri": c["web"]["uri"]}
        for c in chunks
        if c.get("web", {}).get("uri")
    ]
    return result
