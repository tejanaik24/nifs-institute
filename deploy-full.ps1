$pw = '0xyg3N@751023'
$user = 'nifsindi'
$localBase = 'C:\claude code\nifs-india\out'
$ftpBase = 'ftp://nifsindia.net/public_html'

$createdDirs = New-Object 'System.Collections.Generic.HashSet[string]'

function Ensure-Dir ($relDir) {
    if (-not $relDir) { return }
    if ($createdDirs.Contains($relDir)) { return }
    $parts = $relDir.Split('/')
    $curr = $ftpBase
    foreach ($p in $parts) {
        if ($p) {
            $curr = "$curr/$p"
            if (-not $createdDirs.Contains($curr)) {
                $req = [System.Net.FtpWebRequest]::Create($curr)
                $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
                $req.Credentials = New-Object System.Net.NetworkCredential($user, $pw)
                try { $resp = $req.GetResponse(); $resp.Close() } catch {}
                $createdDirs.Add($curr) | Out-Null
            }
        }
    }
    $createdDirs.Add($relDir) | Out-Null
}

$files = Get-ChildItem -Path $localBase -Recurse -File
$total = $files.Count
$count = 0
$failed = @()

foreach ($f in $files) {
    $count++
    $relPath = $f.FullName.Substring($localBase.Length).Replace('\', '/')
    $targetUrl = "$ftpBase$relPath"
    $parentRel = [System.IO.Path]::GetDirectoryName($relPath).Replace('\', '/')
    Ensure-Dir $parentRel

    $wc = New-Object System.Net.WebClient
    $wc.Credentials = New-Object System.Net.NetworkCredential($user, $pw)
    try {
        $wc.UploadFile($targetUrl, $f.FullName)
    } catch {
        $failed += $relPath
        Write-Host "FAILED: $relPath - $_"
    }
    if ($count % 100 -eq 0) { Write-Host "Progress: $count / $total" }
}

Write-Host "DONE. Uploaded: $($total - $failed.Count) / $total"
if ($failed.Count -gt 0) {
    Write-Host "Failed files:"
    $failed | ForEach-Object { Write-Host " - $_" }
}
