"""PyInstaller entry point -- compiled to CFOOSServer.exe.

Built windowless (--noconsole), so stdout/stderr are redirected to a log file
next to the exe since there's no console to print to.
"""
import os
import sys

from app.paths import base_dir

LOG_PATH = base_dir() / "server.log"
log = open(LOG_PATH, "a", buffering=1)
sys.stdout = log
sys.stderr = log

os.chdir(str(base_dir()))

import uvicorn  # noqa: E402
from app.main import app as fastapi_app  # noqa: E402

if __name__ == "__main__":
    uvicorn.run(fastapi_app, host="0.0.0.0", port=8000)
