# Daily 6 PM NIFS lead report -> NIFS Social Media WhatsApp group (Task Scheduler: "NIFS Lead Report 6PM").
# WAHA lives in Docker on this PC; if it is down, start Docker Desktop and wait up to 4 min.
$log = "C:\claude code\nifs-india\scripts\out\lead-report.log"
function Test-Waha { try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 5 "http://127.0.0.1:3001/ping" | Out-Null; $true } catch { $false } }
if (-not (Test-Waha)) {
  Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe" -WindowStyle Hidden
  for ($i = 0; $i -lt 24 -and -not (Test-Waha); $i++) { Start-Sleep 10 }
}
Set-Location "C:\claude code\nifs-india"
"=== $(Get-Date -Format 'yyyy-MM-dd HH:mm') ===" | Out-File -Append -Encoding utf8 $log
& node scripts/lead-report.mjs *>&1 | Out-File -Append -Encoding utf8 $log
"exit $LASTEXITCODE" | Out-File -Append -Encoding utf8 $log
