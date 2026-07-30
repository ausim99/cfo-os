import requests
from fastapi import HTTPException

from .ai_common import parse_json_reply
from .config import settings


def call_grok(prompt: str) -> dict:
    """Send prompt to xAI Grok (OpenAI-compatible chat completions) and parse the
    JSON object the model returns, mirroring the original askClaude() logic."""
    if not settings.GROK_API_KEY:
        raise HTTPException(status_code=503, detail="GROK_API_KEY not configured")
    try:
        res = requests.post(
            f"{settings.GROK_BASE_URL}/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.GROK_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": settings.GROK_MODEL,
                "max_tokens": 1500,
                "messages": [{"role": "user", "content": prompt}],
            },
            timeout=60,
        )
        if not res.ok:
            raise HTTPException(status_code=502, detail=f"Grok request failed: {res.status_code} {res.text[:500]}")
        text = res.json()["choices"][0]["message"]["content"]
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Grok request failed: {e}")

    return parse_json_reply(text, "Grok")
