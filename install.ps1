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

Pop-Location

Write-Host ""
Write-Host "Install complete. Next steps:"
Write-Host "  1. Edit $dir\.env with your MSSQL, GROK/GEMINI, and SMTP credentials"
Write-Host "  2. cd $dir"
Write-Host "  3. .\.venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8001"
Write-Host "  4. Open http://localhost:8001"
