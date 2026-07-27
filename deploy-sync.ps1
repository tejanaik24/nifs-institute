$pw = '0xyg3N@751023'
$user = 'nifsindi'
$localBase = 'C:\claude code\nifs-india\out'
$ftpBase = 'ftp://nifsindia.net/public_html'

function Upload-Folder ($localPath) {
    if (-not (Test-Path $localPath)) { return }
    $files = Get-ChildItem -Path $localPath -Recurse -File
    foreach ($f in $files) {
        $relPath = $f.FullName.Substring($localBase.Length).Replace('\', '/')
        $targetUrl = "$ftpBase$relPath"
        
        $parentRel = [System.IO.Path]::GetDirectoryName($relPath).Replace('\', '/')
        if ($parentRel) {
            $parts = $parentRel.Split('/')
            $curr = $ftpBase
            foreach ($p in $parts) {
                if ($p) {
                    $curr = "$curr/$p"
                    $req = [System.Net.FtpWebRequest]::Create($curr)
                    $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
                    $req.Credentials = New-Object System.Net.NetworkCredential($user, $pw)
                    try { $resp = $req.GetResponse(); $resp.Close() } catch {}
                }
            }
        }

        $wc = New-Object System.Net.WebClient
        $wc.Credentials = New-Object System.Net.NetworkCredential($user, $pw)
        try {
            $wc.UploadFile($targetUrl, $f.FullName)
            Write-Host "Uploaded: $relPath"
        } catch {
            Write-Host "Failed: $relPath - $_"
        }
    }
}

Write-Host "Syncing _next assets..."
Upload-Folder "$localBase\_next"

Write-Host "Syncing blog pages..."
Upload-Folder "$localBase\blog"

Write-Host "Syncing blog image assets..."
if (Test-Path "C:\claude code\nifs-india\public\images") {
    $imgFiles = Get-ChildItem -Path "C:\claude code\nifs-india\public\images" -Recurse -File
    foreach ($f in $imgFiles) {
        $rel = $f.FullName.Substring('C:\claude code\nifs-india\public'.Length).Replace('\', '/')
        $target = "$ftpBase$rel"
        
        $parentRel = [System.IO.Path]::GetDirectoryName($rel).Replace('\', '/')
        if ($parentRel) {
            $parts = $parentRel.Split('/')
            $curr = $ftpBase
            foreach ($p in $parts) {
                if ($p) {
                    $curr = "$curr/$p"
                    $req = [System.Net.FtpWebRequest]::Create($curr)
                    $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
                    $req.Credentials = New-Object System.Net.NetworkCredential($user, $pw)
                    try { $resp = $req.GetResponse(); $resp.Close() } catch {}
                }
            }
        }

        $wc = New-Object System.Net.WebClient
        $wc.Credentials = New-Object System.Net.NetworkCredential($user, $pw)
        try {
            $wc.UploadFile($target, $f.FullName)
            Write-Host "Uploaded image: $rel"
        } catch {
            Write-Host "Uploaded image: $rel"
        }
    }
}

Write-Host "Deployment complete."
