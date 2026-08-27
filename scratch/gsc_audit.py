import json, datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = r'C:\Users\user\.config\claude-seo\vyzma-seo-a209580c533b.json'
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
PROPERTY = 'https://www.nifsindia.net/'

creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('searchconsole', 'v1', credentials=creds)

end = datetime.date.today()
start = end - datetime.timedelta(days=28)

print(f"=== GSC AUDIT: {PROPERTY} ===")
print(f"Period: {start} to {end}\n")

# 1. Top queries
body = {'startDate': str(start), 'endDate': str(end), 'dimensions': ['query'], 'rowLimit': 50}
res = service.searchanalytics().query(siteUrl=PROPERTY, body=body).execute()
rows = res.get('rows', [])
print(f"=== TOP QUERIES ({len(rows)}) ===")
total_clicks = sum(r['clicks'] for r in rows)
total_imp = sum(r['impressions'] for r in rows)
print(f"Total clicks (top 50): {total_clicks}, Total impressions (top 50): {total_imp}")
for r in rows:
    q = r['keys'][0]
    print(f"  clicks={int(r['clicks']):4d}  imp={int(r['impressions']):6d}  ctr={r['ctr']:.2%}  pos={r['position']:5.1f}  [{q}]")

# 2. Striking distance: pos 4-15, imp > 50
print("\n=== STRIKING DISTANCE (pos 4-15, imp>50) ===")
sd = [r for r in rows if 4 <= r['position'] <= 15 and r['impressions'] > 50]
sd.sort(key=lambda x: x['impressions'], reverse=True)
for r in sd:
    q = r['keys'][0]
    print(f"  pos={r['position']:5.1f}  imp={int(r['impressions']):6d}  clicks={int(r['clicks']):4d}  [{q}]")

# 3. Top pages
body2 = {'startDate': str(start), 'endDate': str(end), 'dimensions': ['page'], 'rowLimit': 30}
res2 = service.searchanalytics().query(siteUrl=PROPERTY, body=body2).execute()
pages = res2.get('rows', [])
print(f"\n=== TOP PAGES ({len(pages)}) ===")
for r in pages:
    pg = r['keys'][0].replace('https://www.nifsindia.net', '')
    print(f"  clicks={int(r['clicks']):4d}  imp={int(r['impressions']):6d}  ctr={r['ctr']:.2%}  pos={r['position']:5.1f}  {pg}")

# 4. Overall site totals
body3 = {'startDate': str(start), 'endDate': str(end), 'dimensions': [], 'rowLimit': 1}
res3 = service.searchanalytics().query(siteUrl=PROPERTY, body=body3).execute()
rows3 = res3.get('rows', [])
if rows3:
    r = rows3[0]
    print(f"\n=== SITE TOTALS (28 days) ===")
    print(f"  Total Clicks:      {int(r['clicks'])}")
    print(f"  Total Impressions: {int(r['impressions'])}")
    print(f"  Avg CTR:           {r['ctr']:.2%}")
    print(f"  Avg Position:      {r['position']:.1f}")

# 5. Mobile vs desktop
for device in ['MOBILE', 'DESKTOP']:
    body4 = {'startDate': str(start), 'endDate': str(end), 'dimensions': [], 'rowLimit': 1,
             'dimensionFilterGroups': [{'filters': [{'dimension': 'device', 'expression': device}]}]}
    r4 = service.searchanalytics().query(siteUrl=PROPERTY, body=body4).execute().get('rows', [])
    if r4:
        r = r4[0]
        print(f"  {device}: clicks={int(r['clicks'])}, imp={int(r['impressions'])}, pos={r['position']:.1f}")

print("\nDone.")
