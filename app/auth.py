import hashlib
import secrets
import sqlite3
from datetime import datetime, timezone

from .paths import base_dir

DB_PATH = base_dir() / "data" / "app.db"
SESSION_COOKIE = "sid"


def get_conn():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def hash_password(password: str, salt: str | None = None) -> tuple[str, str]:
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), bytes.fromhex(salt), 200_000)
    return digest.hex(), salt


def create_user(conn: sqlite3.Connection, username: str, password: str, is_admin: bool = False) -> None:
    pw_hash, salt = hash_password(password)
    conn.execute(
        "INSERT INTO users(username,password_hash,salt,is_admin,created_at) VALUES(?,?,?,?,?)",
        (username, pw_hash, salt, int(is_admin), datetime.now(timezone.utc).isoformat()),
    )
    conn.commit()


def init_db() -> None:
    conn = get_conn()
    conn.execute(
        """CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            is_admin INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL
        )"""
    )
    conn.execute(
        """CREATE TABLE IF NOT EXISTS sessions(
            token TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            created_at TEXT NOT NULL
        )"""
    )
    conn.commit()
    if not conn.execute("SELECT 1 FROM users WHERE username=?", ("admin",)).fetchone():
        create_user(conn, "admin", "admin123", is_admin=True)
    conn.close()


def verify_user(username: str, password: str) -> sqlite3.Row | None:
    conn = get_conn()
    row = conn.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
    conn.close()
    if not row:
        return None
    pw_hash, _ = hash_password(password, row["salt"])
    if secrets.compare_digest(pw_hash, row["password_hash"]):
        return row
    return None


def create_session(username: str) -> str:
    token = secrets.token_hex(32)
    conn = get_conn()
    conn.execute(
        "INSERT INTO sessions(token,username,created_at) VALUES(?,?,?)",
        (token, username, datetime.now(timezone.utc).isoformat()),
    )
    conn.commit()
    conn.close()
    return token


def get_session_user(token: str | None) -> sqlite3.Row | None:
    if not token:
        return None
    conn = get_conn()
    row = conn.execute(
        "SELECT u.* FROM sessions s JOIN users u ON u.username = s.username WHERE s.token=?",
        (token,),
    ).fetchone()
    conn.close()
    return row


def set_password(username: str, new_password: str) -> None:
    pw_hash, salt = hash_password(new_password)
    conn = get_conn()
    conn.execute("UPDATE users SET password_hash=?, salt=? WHERE username=?", (pw_hash, salt, username))
    conn.commit()
    conn.close()


def delete_session(token: str) -> None:
    conn = get_conn()
    conn.execute("DELETE FROM sessions WHERE token=?", (token,))
    conn.commit()
    conn.close()


def user_from_request(request) -> sqlite3.Row | None:
    return get_session_user(request.cookies.get(SESSION_COOKIE))
