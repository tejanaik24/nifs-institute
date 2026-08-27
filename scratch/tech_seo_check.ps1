
# Technical SEO checks for nifsindia.net
$urls = @(
    "https://www.nifsindia.net/",
    "https://www.nifsindia.net/robots.txt",
    "https://www.nifsindia.net/sitemap.xml",
    "https://www.nifsindia.net/llms.txt",
    "https://www.nifsindia.net/llms-full.txt",
    "https://www.nifsindia.net/courses/",
    "https://www.nifsindia.net/blog/",
    "https://www.nifsindia.net/centers/"
)

Write-Host "=== NIFS Technical SEO - HTTP Status Checks ==="
foreach ($url in $urls) {
    try {
        $sw = [System.Diagnostics.Stopwatch]::StartNew()
        $resp = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 15 -ErrorAction Stop
        $sw.Stop()
        $path = $url.Replace("https://www.nifsindia.net","")
        Write-Host "  [$($resp.StatusCode)] ${path} - $($sw.ElapsedMilliseconds)ms"
    } catch {
        $path = $url.Replace("https://www.nifsindia.net","")
        Write-Host "  [ERR] ${path} - $($_.Exception.Message)"
    }
}

# Check robots.txt content
Write-Host "`n=== robots.txt Content ==="
try {
    $robots = Invoke-WebRequest -Uri "https://www.nifsindia.net/robots.txt" -TimeoutSec 10
    Write-Host $robots.Content.Substring(0, [Math]::Min(500, $robots.Content.Length))
} catch { Write-Host "Could not fetch robots.txt" }

# Check sitemap URL count
Write-Host "`n=== sitemap.xml Stats ==="
try {
    $sitemap = Invoke-WebRequest -Uri "https://www.nifsindia.net/sitemap.xml" -TimeoutSec 10
    $urlCount = ([regex]::Matches($sitemap.Content, "<url>")).Count
    Write-Host "  URL count in sitemap: $urlCount"
    if ($sitemap.Content.Length -gt 0) {
        Write-Host "  Sitemap size: $($sitemap.Content.Length) bytes"
        # Check first few URLs
        $matches = [regex]::Matches($sitemap.Content, "<loc>(.*?)</loc>")
        $first5 = $matches | Select-Object -First 5
        Write-Host "  First 5 URLs:"
        foreach ($m in $first5) { Write-Host "    $($m.Groups[1].Value)" }
    }
} catch { Write-Host "  Could not fetch sitemap.xml: $($_.Exception.Message)" }

# Check llms.txt
Write-Host "`n=== llms.txt ==="
try {
    $llms = Invoke-WebRequest -Uri "https://www.nifsindia.net/llms.txt" -TimeoutSec 10
    Write-Host "  llms.txt exists: $($llms.Content.Length) bytes"
    Write-Host $llms.Content.Substring(0, [Math]::Min(300, $llms.Content.Length))
} catch { Write-Host "  llms.txt NOT FOUND or error" }

Write-Host "`nDone."
