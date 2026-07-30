from fastapi import APIRouter, Request, Response
from fastapi.responses import JSONResponse

from .. import auth

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login")
def login(payload: dict, response: Response):
    username = (payload.get("username") or "").strip()
    password = payload.get("password") or ""
    user = auth.verify_user(username, password)
    if not user:
        return JSONResponse({"error": "Invalid username or password"}, status_code=401)
    token = auth.create_session(user["username"])
    response.set_cookie(auth.SESSION_COOKIE, token, httponly=True, samesite="lax", max_age=60 * 60 * 24 * 30)
    return {"ok": True, "username": user["username"], "is_admin": bool(user["is_admin"])}


@router.post("/logout")
def logout(request: Request, response: Response):
    token = request.cookies.get(auth.SESSION_COOKIE)
    if token:
        auth.delete_session(token)
    response.delete_cookie(auth.SESSION_COOKIE)
    return {"ok": True}


@router.get("/me")
def me(request: Request):
    user = auth.user_from_request(request)
    if not user:
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return {"username": user["username"], "is_admin": bool(user["is_admin"])}
