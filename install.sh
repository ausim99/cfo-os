#!/usr/bin/env bash
# CFO OS installer (macOS/Linux) -- clones the repo, creates a venv, installs
# dependencies, and sets up .env. Mirrors install.ps1 for Windows.
set -e

repo="https://github.com/ausim99/cfo-os.git"
dir="cfo-os"

if [ -d "$dir" ]; then
  echo "Directory '$dir' already exists -- pulling latest changes instead of cloning."
  cd "$dir"
  git pull
else
  git clone "$repo" "$dir"
  cd "$dir"
fi

echo "Creating virtual environment..."
python3 -m venv .venv

echo "Installing dependencies..."
./.venv/bin/pip install --upgrade pip
./.venv/bin/pip install -r requirements.txt

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example."
else
  echo ".env already exists -- left untouched."
fi

echo "Starting server..."
nohup ./.venv/bin/python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 > cfo_os_server.log 2>&1 &
disown
sleep 3

lan_ip=$(./.venv/bin/python -c "import socket; s=socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('8.8.8.8',80)); print(s.getsockname()[0]); s.close()")

(open "http://localhost:8000" 2>/dev/null || xdg-open "http://localhost:8000" 2>/dev/null) || true

echo ""
echo "Install + deploy complete. Server running in background, bound to all interfaces (log: $dir/cfo_os_server.log)."
echo "  This machine:                       http://localhost:8000"
echo "  Phone / other device on same WiFi:  http://${lan_ip}:8000"
echo "Fill in $dir/.env with real MSSQL, GROK/GEMINI, and SMTP credentials for live data -- until then it runs on the embedded snapshot."
