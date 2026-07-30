# Production Deployment Guide — NIFS India Website

This document provides exact server credentials and automated scripts for deploying updates (including blog posts, page changes, and static assets) to the live cPanel production server for `nifsindia.net`.

---

## 🔑 Server & FTP Credentials

- **Domain / Site:** `https://www.nifsindia.net`
- **FTP Server / Host:** `ftp://nifsindia.net`
- **FTP Username:** `nifsindi`
- **FTP Password:** `0xyg3N@751023`
- **Remote Root Path:** `/home7/nifsindi/public_html` (FTP root starts directly in `public_html`)

---

## 🛠️ Step-by-Step Deployment Process

Run the production build script in the repository root (`C:\claude code\nifs-india`):
```bash
npm run build
```
This outputs compiled static HTML and JS/CSS assets to `C:\claude code\nifs-india\out`. 
> **CRITICAL RULE:** `npm run build` now automatically runs a post-build sync script that copies `public/homepage.html` (220KB) over `out/index.html`. Never deploy raw Next.js `out/index.html` without verifying it matches `public/homepage.html`. Alternatively, use `node restore-homepage-html.js` or `node fast-deploy.js` which automatically performs this sync before FTP upload.

---

### 2. Deploy Files via FTP

> **IMPORTANT:** cPanel direct FTP upload must be used. Do **not** compress into ZIP or use cPanel file manager extraction.

#### PowerShell Deployment Script (Recommended)
Run the following script in PowerShell to deploy compiled `_next` chunks and `blog` pages directly:

```powershell
$pw = '0xyg3N@751023'
$user = 'nifsindi'
$localBase = 'C:\claude code\nifs-india\out'
$ftpBase = 'ftp://nifsindia.net/public_html'

function Upload-Folder ($localPath) {
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

# Sync _next JS/CSS bundles, blog pages, courses, and images
Upload-Folder "$localBase\_next"
Upload-Folder "$localBase\blog"
Upload-Folder "$localBase\courses"
if (Test-Path "$localBase\images") {
    Upload-Folder "$localBase\images"
}

# Upload homepage if updated
if (Test-Path "$localBase\homepage.html") {
    $wc = New-Object System.Net.WebClient
    $wc.Credentials = New-Object System.Net.NetworkCredential($user, $pw)
    $wc.UploadFile("$ftpBase/homepage.html", "$localBase\homepage.html")
    Write-Host "Uploaded homepage.html"
}
```

---

### 3. Git Commit & Push
After deployment, commit the changes to Git:
```bash
git add .
git commit -m "Deploy blog updates & static assets"
git push origin main
```
