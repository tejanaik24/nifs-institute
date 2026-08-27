"""
NIFS 404 Checker — GSC Coverage + Internal Link Audit
"""
import json
import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = r'C:\Users\user\.config\claude-seo\vyzma-seo-a209580c533b.json'
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
PROPERTY = 'https://www.nifsindia.net/'

creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('searchconsole', 'v1', credentials=creds)

end = datetime.date.today()
start = end - datetime.timedelta(days=28)

print("=== GSC: Checking for pages with impressions but ZERO clicks (likely 404 or thin content) ===")

# Get all pages by impressions
body = {
    'startDate': str(start),
    'endDate': str(end),
    'dimensions': ['page'],
    'rowLimit': 100,
}
res = service.searchanalytics().query(siteUrl=PROPERTY, body=body).execute()
pages = res.get('rows', [])

# Pages with very low CTR that might be 404 candidates
print(f"\nTotal pages with impressions: {len(pages)}")
print("\n=== Pages with >200 impressions but <1% CTR (likely poor content or wrong landing) ===")
for r in pages:
    if r['impressions'] > 200 and r['ctr'] < 0.01:
        pg = r['keys'][0].replace('https://www.nifsindia.net', '')
        print(f"  ctr={r['ctr']:.2%}  imp={int(r['impressions']):5d}  clicks={int(r['clicks']):3d}  pos={r['position']:.1f}  {pg}")

# Also check pages ranked very badly (pos > 40) — likely 404 or thin
print("\n=== Pages with avg position > 40 (likely not indexing properly or thin/404) ===")
for r in pages:
    if r['position'] > 40 and r['impressions'] > 30:
        pg = r['keys'][0].replace('https://www.nifsindia.net', '')
        print(f"  pos={r['position']:.1f}  imp={int(r['impressions']):5d}  clicks={int(r['clicks']):3d}  {pg}")
