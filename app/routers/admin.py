import sqlite3

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from .. import auth

router = APIRouter(prefix="/api/admin", tags=["admin"])


def _require_admin(request: Request):
    user = auth.user_from_request(request)
    if not user or not user["is_admin"]:
        return None
    return user


@router.get("/users")
def list_users(request: Request):
    if not _require_admin(request):
        return JSONResponse({"error": "forbidden"}, status_code=403)
    conn = auth.get_conn()
    rows = conn.execute("SELECT id, username, is_admin, created_at FROM users ORDER BY id").fetchall()
    conn.close()
    return [dict(r) for r in rows]


@router.post("/users")
def add_user(payload: dict, request: Request):
    if not _require_admin(request):
        return JSONResponse({"error": "forbidden"}, status_code=403)
    username = (payload.get("username") or "").strip()
    password = payload.get("password") or ""
    is_admin = bool(payload.get("is_admin"))
    if not username or not password:
        return JSONResponse({"error": "username and password required"}, status_code=400)
    if len(password) < 6:
        return JSONResponse({"error": "password must be at least 6 characters"}, status_code=400)
    conn = auth.get_conn()
    try:
        auth.create_user(conn, username, password, is_admin)
    except sqlite3.IntegrityError:
        return JSONResponse({"error": "username already exists"}, status_code=409)
    finally:
        conn.close()
    return {"ok": True}


@router.post("/users/{user_id}/reset-password")
def reset_password(user_id: int, payload: dict, request: Request):
    if not _require_admin(request):
        return JSONResponse({"error": "forbidden"}, status_code=403)
    new_password = payload.get("new_password") or ""
    if len(new_password) < 6:
        return JSONResponse({"error": "password must be at least 6 characters"}, status_code=400)
    conn = auth.get_conn()
    row = conn.execute("SELECT username FROM users WHERE id=?", (user_id,)).fetchone()
    conn.close()
    if not row:
        return JSONResponse({"error": "user not found"}, status_code=404)
    auth.set_password(row["username"], new_password)
    return {"ok": True}


@router.delete("/users/{user_id}")
def delete_user(user_id: int, request: Request):
    if not _require_admin(request):
        return JSONResponse({"error": "forbidden"}, status_code=403)
    conn = auth.get_conn()
    row = conn.execute("SELECT username FROM users WHERE id=?", (user_id,)).fetchone()
    if row and row["username"] == "admin":
        conn.close()
        return JSONResponse({"error": "cannot delete the default admin account"}, status_code=400)
    conn.execute("DELETE FROM users WHERE id=?", (user_id,))
    conn.commit()
    conn.close()
    return {"ok": True}
