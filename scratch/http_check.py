import urllib.request
import urllib.error
import time
import re

urls = [
    ("Homepage", "https://www.nifsindia.net/"),
    ("robots.txt", "https://www.nifsindia.net/robots.txt"),
    ("sitemap.xml", "https://www.nifsindia.net/sitemap.xml"),
    ("llms.txt", "https://www.nifsindia.net/llms.txt"),
    ("Courses", "https://www.nifsindia.net/courses/"),
    ("Blog", "https://www.nifsindia.net/blog/"),
    ("Centers", "https://www.nifsindia.net/centers/"),
    ("Admissions", "https://www.nifsindia.net/admissions/"),
]

print("=== HTTP Status Checks ===")
for name, url in urls:
    try:
        t0 = time.time()
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as r:
            ms = int((time.time() - t0) * 1000)
            size = len(r.read())
            print(f"  [{r.status}] {name}: {size/1024:.0f}KB, {ms}ms")
    except urllib.error.HTTPError as e:
        print(f"  [{e.code}] {name}: HTTP Error")
    except Exception as e:
        print(f"  [ERR] {name}: {e}")

print("\n=== robots.txt Content ===")
try:
    req = urllib.request.Request("https://www.nifsindia.net/robots.txt", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as r:
        content = r.read().decode('utf-8', errors='replace')
        print(content[:800])
except Exception as e:
    print(f"Error: {e}")

print("\n=== sitemap.xml Stats ===")
try:
    req = urllib.request.Request("https://www.nifsindia.net/sitemap.xml", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=15) as r:
        content = r.read().decode('utf-8', errors='replace')
        url_count = len(re.findall('<url>', content))
        locs = re.findall('<loc>(.*?)</loc>', content)
        print(f"  URL count: {url_count}")
        print(f"  Size: {len(content)/1024:.0f}KB")
        print("  Sample URLs:")
        for loc in locs[:8]:
            print(f"    {loc}")
except Exception as e:
    print(f"Error: {e}")

print("\n=== llms.txt Status ===")
try:
    req = urllib.request.Request("https://www.nifsindia.net/llms.txt", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as r:
        content = r.read().decode('utf-8', errors='replace')
        print(f"  EXISTS: {len(content)} bytes")
        print(content[:400])
except urllib.error.HTTPError as e:
    print(f"  NOT FOUND ({e.code})")
except Exception as e:
    print(f"  ERROR: {e}")
