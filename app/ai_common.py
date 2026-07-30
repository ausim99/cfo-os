import json

from fastapi import HTTPException


def parse_json_reply(text: str, provider: str) -> dict:
    """Strip code fences and pull out the {...} block a model returns."""
    text = text.replace("```json", "").replace("```", "").strip()
    a, b = text.find("{"), text.rfind("}")
    if a >= 0 and b > a:
        text = text[a : b + 1]
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=502, detail=f"{provider} returned non-JSON response: {e}")
