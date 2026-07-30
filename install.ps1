# CFO OS installer -- clones the repo, creates a venv, installs dependencies,
# and sets up .env. Does not start the server or touch real credentials.
$ErrorActionPreference = "Stop"

$repo = "https://github.com/ausim99/cfo-os.git"
$dir = "cfo-os"

if (Test-Path $dir) {
    Write-Host "Directory '$dir' already exists -- pulling latest changes instead of cloning."
    Push-Location $dir
    git pull
} else {
    git clone $repo $dir
    Push-Location $dir
}

Write-Host "Creating virtual environment..."
python -m venv .venv

Write-Host "Installing dependencies..."
& .\.venv\Scripts\pip.exe install --upgrade pip
& .\.venv\Scripts\pip.exe install -r requirements.txt

if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "Created .env from .env.example."
} else {
    Write-Host ".env already exists -- left untouched."
}

Write-Host "Starting server..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& .\.venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000"
Start-Sleep -Seconds 3
Start-Process "http://localhost:8000"

$lanIp = & .\.venv\Scripts\python.exe -c "import socket; s=socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('8.8.8.8',80)); print(s.getsockname()[0]); s.close()"

Pop-Location

Write-Host ""
Write-Host "Install + deploy complete. Server running in its own window, bound to all interfaces."
Write-Host "  This PC:            http://localhost:8000"
Write-Host "  Phone / other device on same WiFi: http://${lanIp}:8000"
Write-Host "Fill in $dir\.env with real MSSQL, GROK/GEMINI, and SMTP credentials for live data -- until then it runs on the embedded snapshot."
