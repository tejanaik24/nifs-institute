from google.oauth2 import service_account
from googleapiclient.discovery import build

SA = r'C:\Users\user\.config\claude-seo\vyzma-seo-a209580c533b.json'
creds = service_account.Credentials.from_service_account_file(SA, scopes=[
    'https://www.googleapis.com/auth/analytics.readonly',
])
try:
    svc = build('analyticsadmin', 'v1beta', credentials=creds)
    accounts = svc.accounts().list().execute()
    print('GA4 Accounts:')
    for a in accounts.get('accounts', []):
        print(' ', a['name'], a.get('displayName',''))
        props = svc.properties().list(filter=f"parent={a['name']}").execute()
        for p in props.get('properties', []):
            print('   Property:', p['name'], '|', p.get('displayName',''), '|', p.get('measurementId',''))
except Exception as e:
    print('Admin API error:', e)
    # Try listing via different approach
    try:
        svc2 = build('analytics', 'v3', credentials=creds)
        accs = svc2.management().accounts().list().execute()
        for a in accs.get('items', []):
            print('UA Account:', a['id'], a['name'])
    except Exception as e2:
        print('UA API error:', e2)
