from fastapi import APIRouter
from pydantic import BaseModel

from ..gemini import call_gemini_grounded

router = APIRouter()


class CompetitorIn(BaseModel):
    company: str
    industry_hint: str = ""


@router.post("/api/competitor")
def competitor(body: CompetitorIn):
    """AI + live web search competitor/market-share summary. Not ERP data --
    there is no market-share source in the DWH, so this is best-effort public
    information via Gemini's Google Search grounding, with sources attached."""
    prompt = (
        f"Research the competitive landscape and market position for '{body.company}'"
        + (f" ({body.industry_hint})" if body.industry_hint else "")
        + " in Bangladesh. Use web search for current public information.\n"
        'Respond ONLY with valid JSON exactly in this shape: {"summary": string, '
        '"competitors": [{"name": string, "estMarketShare": string, "note": string}], '
        '"marketPosition": string, "asOf": string}. '
        "estMarketShare is a rough public estimate as a string (e.g. \"~15%\" or \"unknown\"), "
        "not a precise figure. No markdown, no backticks."
    )
    result = call_gemini_grounded(prompt)
    result["disclaimer"] = "AI-generated from public web sources, not ERP data. Verify before use."
    return result
