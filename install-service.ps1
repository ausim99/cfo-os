# Registers CFO OS as a background task that starts automatically at logon
# and runs with no console window -- no VS Code, no terminal, no manual
# `uvicorn` command needed after this. Run once from the cfo-os folder.
$ErrorActionPreference = "Stop"
$dir = $PSScriptRoot
$taskName = "CFO OS Server"

if (-not (Test-Path "$dir\.venv\Scripts\pythonw.exe")) {
    Write-Host "No .venv found -- run install.ps1 first to set up dependencies."
    exit 1
}

$action = New-ScheduledTaskAction -Execute "$dir\.venv\Scripts\pythonw.exe" -Argument "service_runner.py" -WorkingDirectory $dir
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -ExecutionTimeLimit ([TimeSpan]::Zero)

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null
Start-ScheduledTask -TaskName $taskName

Start-Sleep -Seconds 3
$lanIp = & "$dir\.venv\Scripts\python.exe" -c "import socket; s=socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('8.8.8.8',80)); print(s.getsockname()[0]); s.close()"

Write-Host ""
Write-Host "CFO OS is now running as a background task ('$taskName')."
Write-Host "It starts automatically every time you log in to Windows -- no terminal or VS Code needed."
Write-Host "  This PC:                            http://localhost:8000"
Write-Host "  Phone / other device on same WiFi:  http://${lanIp}:8000"
Write-Host "Logs: $dir\service.log"
Write-Host "To stop or remove it, run uninstall-service.ps1."
