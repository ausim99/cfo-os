# Stops and removes the CFO OS background task created by install-service.ps1.
$ErrorActionPreference = "Stop"
$taskName = "CFO OS Server"

if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
    Stop-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "Removed scheduled task '$taskName'. CFO OS will no longer start automatically."
} else {
    Write-Host "No '$taskName' scheduled task found -- nothing to remove."
}

Get-Process pythonw -ErrorAction SilentlyContinue |
    Where-Object { $_.Path -like "*cfo-os*" } |
    Stop-Process -Force -ErrorAction SilentlyContinue
