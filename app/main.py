from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .routers import chat, companies, email, health, live

STATIC_DIR = Path(__file__).resolve().parent.parent / "static"

app = FastAPI(title="CFO OS")

for r in (health, companies, live, chat, email):
    app.include_router(r.router)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/")
def index():
    return FileResponse(STATIC_DIR / "index.html")
