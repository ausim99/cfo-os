"""Entry point for the background service (Task Scheduler / launchd runs this).

Runs uvicorn in-process so pythonw.exe (no console window) can host it, with
stdout/stderr redirected to a log file since a windowless process has nowhere
else to send them.
"""
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_PATH = os.path.join(BASE_DIR, "service.log")

log = open(LOG_PATH, "a", buffering=1)
sys.stdout = log
sys.stderr = log

os.chdir(BASE_DIR)
sys.path.insert(0, BASE_DIR)

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)
