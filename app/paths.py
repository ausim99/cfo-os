"""Path resolution that works both running from source and as a PyInstaller exe.

Frozen (PyInstaller onefile): bundled read-only assets (static/) extract to a
temp dir every launch (sys._MEIPASS) -- fine for those, but persistent data
(SQLite users DB, .env) must live next to the exe instead, or it'd vanish
between runs.
"""
import sys
from pathlib import Path


def is_frozen() -> bool:
    return bool(getattr(sys, "frozen", False))


def base_dir() -> Path:
    """Persistent location: next to the exe (frozen) or the repo root (dev)."""
    if is_frozen():
        return Path(sys.executable).resolve().parent
    return Path(__file__).resolve().parent.parent


def bundle_dir() -> Path:
    """Read-only bundled assets: PyInstaller's extraction dir (frozen) or repo root (dev)."""
    if is_frozen():
        return Path(getattr(sys, "_MEIPASS", str(base_dir())))
    return Path(__file__).resolve().parent.parent
