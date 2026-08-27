"""
NIFS Full SEO Health Check — GSC + PageSpeed + Technical
End-to-end audit: performance, coverage, keywords, CTR, CWV
"""
import datetime, json, urllib.request, urllib.error, ssl
from google.oauth2 import service_account
from googleapiclient.discovery import build

SA = r'C:\Users\user\.config\claude-seo\vyzma-seo-a209580c533b.json'
PROPERTY = 'https://www.nifsindia.net/'
PSI_KEY = 'AIzaSyDtKSE5REvu-r8TLhBXe4vhsKRbqTHyPcs'
SITE = 'https://www.nifsindia.net'

creds = service_account.Credentials.from_service_account_file(SA, scopes=[
    'https://www.googleapis.com/auth/webmasters.readonly',
])
gsc = build('searchconsole', 'v1', credentials=creds)

end = datetime.date.today()
start28 = end - datetime.timedelta(days=28)
start90 = end - datetime.timedelta(days=90)

print("=" * 60)
print("NIFS SEO FULL AUDIT —", end.strftime("%d %b %Y %H:%M"))
print("=" * 60)

# ─── 1. OVERALL SITE PERFORMANCE (28d vs 90d) ─────────────────
def get_totals(start, end):
    r = gsc.searchanalytics().query(siteUrl=PROPERTY, body={
        'startDate': str(start), 'endDate': str(end),
        'dimensions': [], 'rowLimit': 1,
    }).execute()
    rows = r.get('rows', [{}])
    return rows[0] if rows else {}

t28 = get_totals(start28, end)
t90 = get_totals(start90, end)

print("\n📊 SITE TOTALS")
print(f"  28-day  → clicks: {int(t28.get('clicks',0)):,}  |  impressions: {int(t28.get('impressions',0)):,}  |  CTR: {t28.get('ctr',0)*100:.2f}%  |  Avg pos: {t28.get('position',0):.1f}")
print(f"  90-day  → clicks: {int(t90.get('clicks',0)):,}  |  impressions: {int(t90.get('impressions',0)):,}  |  CTR: {t90.get('ctr',0)*100:.2f}%  |  Avg pos: {t90.get('position',0):.1f}")

# ─── 2. TOP 20 QUERIES ────────────────────────────────────────
print("\n🔍 TOP 20 QUERIES (28d, by clicks)")
r = gsc.searchanalytics().query(siteUrl=PROPERTY, body={
    'startDate': str(start28), 'endDate': str(end),
    'dimensions': ['query'], 'rowLimit': 20,
    'orderBy': [{'fieldName': 'clicks', 'sortOrder': 'DESCENDING'}],
}).execute()
for row in r.get('rows', []):
    q = row['keys'][0]
    print(f"  {int(row['clicks']):4d} clicks | {int(row['impressions']):6d} imp | {row['ctr']*100:.1f}% CTR | pos {row['position']:.1f} | {q}")

# ─── 3. STRIKING DISTANCE (pos 4-15, >100 imp, <4% CTR) ───────
print("\n🎯 STRIKING DISTANCE (pos 4–15, >100 imp, <4% CTR)")
r = gsc.searchanalytics().query(siteUrl=PROPERTY, body={
    'startDate': str(start28), 'endDate': str(end),
    'dimensions': ['query'], 'rowLimit': 500,
}).execute()
striking = [row for row in r.get('rows', [])
            if 4 <= row['position'] <= 15
            and row['impressions'] >= 100
            and row['ctr'] < 0.04]
striking.sort(key=lambda x: x['impressions'], reverse=True)
for row in striking[:20]:
    q = row['keys'][0]
    print(f"  pos {row['position']:5.1f} | {int(row['impressions']):5d} imp | {row['ctr']*100:.1f}% CTR | {q}")

# ─── 4. TOP PAGES ─────────────────────────────────────────────
print("\n📄 TOP 20 PAGES (28d, by clicks)")
r = gsc.searchanalytics().query(siteUrl=PROPERTY, body={
    'startDate': str(start28), 'endDate': str(end),
    'dimensions': ['page'], 'rowLimit': 20,
    'orderBy': [{'fieldName': 'clicks', 'sortOrder': 'DESCENDING'}],
}).execute()
for row in r.get('rows', []):
    pg = row['keys'][0].replace(SITE, '')
    print(f"  {int(row['clicks']):4d} clicks | {row['ctr']*100:.1f}% CTR | pos {row['position']:.1f} | {pg}")

# ─── 5. DEVICE BREAKDOWN ──────────────────────────────────────
print("\n📱 DEVICE BREAKDOWN (28d)")
r = gsc.searchanalytics().query(siteUrl=PROPERTY, body={
    'startDate': str(start28), 'endDate': str(end),
    'dimensions': ['device'], 'rowLimit': 10,
}).execute()
for row in r.get('rows', []):
    print(f"  {row['keys'][0]:10s} → clicks: {int(row['clicks']):5,}  imp: {int(row['impressions']):7,}  CTR: {row['ctr']*100:.2f}%  pos: {row['position']:.1f}")

# ─── 6. COUNTRY BREAKDOWN ─────────────────────────────────────
print("\n🌍 TOP COUNTRIES (28d)")
r = gsc.searchanalytics().query(siteUrl=PROPERTY, body={
    'startDate': str(start28), 'endDate': str(end),
    'dimensions': ['country'], 'rowLimit': 10,
    'orderBy': [{'fieldName': 'clicks', 'sortOrder': 'DESCENDING'}],
}).execute()
for row in r.get('rows', []):
    print(f"  {row['keys'][0]:5s} → clicks: {int(row['clicks']):5,}  imp: {int(row['impressions']):7,}  CTR: {row['ctr']*100:.2f}%")

# ─── 7. SITEMAPS ──────────────────────────────────────────────
print("\n🗺️  SITEMAPS")
try:
    sm = gsc.sitemaps().list(siteUrl=PROPERTY).execute()
    for s in sm.get('sitemap', []):
        submitted = s.get('contents', [{}])[0].get('submitted', 'n/a')
        indexed = s.get('contents', [{}])[0].get('indexed', 'n/a')
        errors = s.get('errors', 0)
        warnings = s.get('warnings', 0)
        print(f"  {s['path']}")
        print(f"    submitted: {submitted}  indexed: {indexed}  errors: {errors}  warnings: {warnings}")
        print(f"    last crawled: {s.get('lastDownloaded','n/a')[:10]}  status: {s.get('isPending','false')}")
except Exception as e:
    print('  Error:', e)

# ─── 8. SEARCH APPEARANCE ────────────────────────────────────
print("\n✨ SEARCH APPEARANCE (28d)")
r = gsc.searchanalytics().query(siteUrl=PROPERTY, body={
    'startDate': str(start28), 'endDate': str(end),
    'dimensions': ['searchAppearance'], 'rowLimit': 20,
}).execute()
for row in r.get('rows', []):
    print(f"  {row['keys'][0]:30s} | clicks: {int(row['clicks']):5,}  imp: {int(row['impressions']):6,}")

# ─── 9. WORST CTR PAGES (>500 imp) ────────────────────────────
print("\n⚠️  WORST CTR PAGES (>500 imp, ordered by CTR asc)")
r = gsc.searchanalytics().query(siteUrl=PROPERTY, body={
    'startDate': str(start28), 'endDate': str(end),
    'dimensions': ['page'], 'rowLimit': 500,
}).execute()
low_ctr = [row for row in r.get('rows', []) if row['impressions'] >= 500]
low_ctr.sort(key=lambda x: x['ctr'])
for row in low_ctr[:15]:
    pg = row['keys'][0].replace(SITE, '')
    print(f"  CTR {row['ctr']*100:.1f}% | {int(row['impressions']):6,} imp | {int(row['clicks']):4,} clicks | pos {row['position']:.1f} | {pg}")

# ─── 10. WEEK-OVER-WEEK TREND ─────────────────────────────────
print("\n📈 WEEK-OVER-WEEK TREND (last 8 weeks)")
r = gsc.searchanalytics().query(siteUrl=PROPERTY, body={
    'startDate': str(end - datetime.timedelta(days=56)),
    'endDate': str(end),
    'dimensions': ['date'], 'rowLimit': 500,
}).execute()
# Aggregate by week
weeks = {}
for row in r.get('rows', []):
    d = datetime.date.fromisoformat(row['keys'][0])
    wk = d - datetime.timedelta(days=d.weekday())
    if wk not in weeks:
        weeks[wk] = {'clicks': 0, 'impressions': 0}
    weeks[wk]['clicks'] += row['clicks']
    weeks[wk]['impressions'] += row['impressions']
for wk in sorted(weeks.keys()):
    trend = ""
    wks = sorted(weeks.keys())
    i = wks.index(wk)
    if i > 0:
        prev = weeks[wks[i-1]]['clicks']
        curr = weeks[wk]['clicks']
        if prev > 0:
            pct = (curr - prev) / prev * 100
            trend = f" ({'+' if pct >= 0 else ''}{pct:.0f}%)"
    print(f"  Wk {wk}  clicks: {int(weeks[wk]['clicks']):5,}  imp: {int(weeks[wk]['impressions']):7,}{trend}")

print("\n" + "=" * 60)
print("DONE — GSC AUDIT COMPLETE")
print("=" * 60)
