from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

from . import auth
from .routers import admin, auth as auth_router, chat, companies, competitor, email, fpa, health, live, ratios

STATIC_DIR = Path(__file__).resolve().parent.parent / "static"

app = FastAPI(title="CFO OS")
auth.init_db()

for r in (health, companies, live, chat, email, fpa, competitor, ratios, auth_router, admin):
    app.include_router(r.router)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# paths reachable without a session -- everything else needs a valid login,
# including /static/* (the embedded snapshot data lives in daily_data.js and
# must not be fetchable by URL while logged out)
PUBLIC_PATHS = {"/", "/api/auth/login", "/api/health", "/static/favicon.svg"}


@app.middleware("http")
async def auth_gate(request: Request, call_next):
    path = request.url.path
    if path not in PUBLIC_PATHS and (path.startswith("/api/") or path.startswith("/static/")):
        if not auth.user_from_request(request):
            return JSONResponse({"error": "unauthorized"}, status_code=401)
    return await call_next(request)


@app.middleware("http")
async def no_cache(request, call_next):
    response = await call_next(request)
    if request.url.path in ("/", "/admin"):
        # the HTML shell decides which JS/CSS to fetch -- never let a browser
        # serve a stale copy of it independently of those assets' own cache state
        response.headers["Cache-Control"] = "no-store"
    elif request.url.path.startswith("/static/"):
        response.headers["Cache-Control"] = "no-cache"
    return response


@app.get("/")
def index(request: Request):
    if not auth.user_from_request(request):
        return FileResponse(STATIC_DIR / "login.html")
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/admin")
def admin_page(request: Request):
    user = auth.user_from_request(request)
    if not user:
        return FileResponse(STATIC_DIR / "login.html")
    if not user["is_admin"]:
        return RedirectResponse("/")
    return FileResponse(STATIC_DIR / "admin.html")
