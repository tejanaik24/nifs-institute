# Runs once/day via Windows Task Scheduler. Moves one queued blog post live,
# rebuilds, FTP-deploys via fast-deploy.js, pings IndexNow, and logs the result.
# Safe to run on a day the queue is empty.
$ErrorActionPreference = "Stop"
$repo = "C:\claude code\nifs-india"
$log = Join-Path $repo "scripts\blog-publish-log.txt"
Set-Location $repo

function Log($msg) {
    $line = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm')] $msg"
    Add-Content -Path $log -Value $line -Encoding utf8
    Write-Output $line
}

try {
    $publishOutput = node scripts/publish-scheduled-blog.cjs 2>&1 | Out-String
    Log $publishOutput.Trim()

    if ($publishOutput -match "^Published") {
        Log "Building..."
        npm run build 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) { Log "BUILD FAILED - not deploying"; exit 1 }

        Log "Deploying via fast-deploy.js (cPanel FTP)..."
        node fast-deploy.js 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) { Log "DEPLOY FAILED"; exit 1 }

        Log "Pinging IndexNow..."
        node scripts/ping-indexnow.cjs 2>&1 | Out-Null

        Log "Done - post is live."
    } else {
        Log "Nothing published today (queue empty or already run)."
    }
} catch {
    Log "ERROR: $($_.Exception.Message)"
    exit 1
}
