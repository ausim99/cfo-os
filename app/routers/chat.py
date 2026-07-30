from fastapi import APIRouter
from pydantic import BaseModel

from ..config import settings
from ..gemini import call_gemini
from ..grok import call_grok

router = APIRouter()


class PromptIn(BaseModel):
    prompt: str


def call_ai(prompt: str) -> dict:
    if settings.AI_PROVIDER.lower() == "gemini":
        return call_gemini(prompt)
    return call_grok(prompt)


@router.post("/api/chat")
def chat(body: PromptIn):
    """Backs askSubmit() in app.js. Returns {"answer","keyNumbers","actions"} as
    produced by the model -- same shape askClaude() used to hand back."""
    return call_ai(body.prompt)


@router.post("/api/insights")
def insights(body: PromptIn):
    """Backs genInsights() in app.js. Returns the full AI insight object
    ({"summary","insights","interpretation",...,"confidence"})."""
    return call_ai(body.prompt)
