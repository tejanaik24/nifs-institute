"""
NIFS PageSpeed + Technical SEO Check
Core Web Vitals mobile + desktop, robots.txt, sitemap, structured data
"""
import urllib.request, json, time

PSI_KEY = 'AIzaSyDtKSE5REvu-r8TLhBXe4vhsKRbqTHyPcs'
URLS_TO_CHECK = [
    ('Homepage', 'https://www.nifsindia.net/'),
    ('Blog Index', 'https://www.nifsindia.net/blog/'),
    ('Courses', 'https://www.nifsindia.net/courses/'),
    ('Safety Officer Salary', 'https://www.nifsindia.net/blog/safety-officer-salary-in-india-2026-complete-guide/'),
    ('Admissions', 'https://www.nifsindia.net/admissions/'),
]

def psi(url, strategy):
    api = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy={strategy}&key={PSI_KEY}&category=performance&category=seo&category=accessibility&category=best-practices"
    try:
        with urllib.request.urlopen(api, timeout=30) as r:
            return json.loads(r.read())
    except Exception as e:
        return {'error': str(e)}

print("=" * 60)
print("NIFS PAGESPEED + TECHNICAL AUDIT")
print("=" * 60)

for label, url in URLS_TO_CHECK:
    print(f"\n--- {label} ---")
    print(f"URL: {url}")
    for strategy in ['mobile', 'desktop']:
        d = psi(url, strategy)
        if 'error' in d:
            print(f"  {strategy}: ERROR - {d['error']}")
            continue
        cats = d.get('lighthouseResult', {}).get('categories', {})
        audits = d.get('lighthouseResult', {}).get('audits', {})
        scores = {k: int(v['score']*100) if v.get('score') is not None else 'n/a' for k,v in cats.items()}
        print(f"  [{strategy.upper():7s}] Perf:{scores.get('performance','?'):3}  SEO:{scores.get('seo','?'):3}  A11y:{scores.get('accessibility','?'):3}  BP:{scores.get('best-practices','?'):3}")
        if strategy == 'mobile':
            # Core Web Vitals
            cwv_keys = [
                ('largest-contentful-paint', 'LCP'),
                ('first-contentful-paint', 'FCP'),
                ('total-blocking-time', 'TBT'),
                ('cumulative-layout-shift', 'CLS'),
                ('speed-index', 'SI'),
                ('interactive', 'TTI'),
            ]
            for key, name in cwv_keys:
                if key in audits:
                    val = audits[key].get('displayValue', 'n/a')
                    score = audits[key].get('score', None)
                    flag = '✅' if score is not None and score >= 0.9 else ('⚠️ ' if score is not None and score >= 0.5 else '🔴')
                    print(f"           {flag} {name}: {val}")
        time.sleep(1)

# ─── Check key technical URLs ──────────────────────────────
print("\n" + "=" * 60)
print("TECHNICAL URL CHECKS")
print("=" * 60)
tech_urls = [
    ('robots.txt', 'https://www.nifsindia.net/robots.txt'),
    ('sitemap.xml', 'https://www.nifsindia.net/sitemap.xml'),
    ('llms.txt', 'https://www.nifsindia.net/llms.txt'),
    ('IndexNow key', 'https://www.nifsindia.net/indexnow-key.txt'),
    ('404 page', 'https://www.nifsindia.net/this-page-does-not-exist-xyz/'),
    ('Fire & Safety page', 'https://www.nifsindia.net/fire-and-safety-course/'),
    ('Safety Officer Course', 'https://www.nifsindia.net/courses/safety-officer-course/'),
    ('job-openings redirect', 'https://www.nifsindia.net/job-openings/'),
]
for label, url in tech_urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 Googlebot/2.1'})
        with urllib.request.urlopen(req, timeout=10) as r:
            status = r.status
            content_len = len(r.read())
            print(f"  {'✅' if status < 400 else '🔴'} [{status}] {label} — {content_len} bytes — {url}")
    except urllib.error.HTTPError as e:
        print(f"  🔴 [{e.code}] {label} — {url}")
    except Exception as e:
        print(f"  ⚠️  [ERR] {label} — {type(e).__name__}: {e} — {url}")

print("\nDONE")
