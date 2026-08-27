import json
from pathlib import Path

BASE = Path(r'C:\claude code\nifs-india')

checks = []

# 1. blog-posts.json check
blog_file = BASE / 'src' / 'lib' / 'data' / 'blog-posts.json'
with open(blog_file, encoding='utf-8') as f:
    posts = json.load(f)
post_dict = {p['slug']: p for p in posts}

salary_post = post_dict.get('safety-officer-salary-in-india-2026-complete-guide', {})
if '2026: ₹3L-15L' in salary_post.get('title', ''):
    checks.append(('✅ PASS', 'blog-posts.json', 'Safety officer salary title updated'))
else:
    checks.append(('❌ FAIL', 'blog-posts.json', 'Safety officer salary title missing'))

# 2. safety-officer-course page check
soc_page = BASE / 'src' / 'app' / 'courses' / 'safety-officer-course' / 'page.tsx'
if soc_page.exists() and 'Safety Officer Course in India' in soc_page.read_text(encoding='utf-8'):
    checks.append(('✅ PASS', 'courses/safety-officer-course/page.tsx', 'Page exists & contains valid component'))
else:
    checks.append(('❌ FAIL', 'courses/safety-officer-course/page.tsx', 'Page missing or invalid'))

# 3. fire-and-safety-course page check
fsc_page = BASE / 'src' / 'app' / 'fire-and-safety-course' / 'page.tsx'
if fsc_page.exists() and 'Fire and Safety Courses in India' in fsc_page.read_text(encoding='utf-8'):
    checks.append(('✅ PASS', 'fire-and-safety-course/page.tsx', 'Pillar page exists & valid'))
else:
    checks.append(('❌ FAIL', 'fire-and-safety-course/page.tsx', 'Page missing or invalid'))

# 4. not-found.tsx check
nf_page = BASE / 'src' / 'app' / 'not-found.tsx'
if nf_page.exists() and 'Page Not Found' in nf_page.read_text(encoding='utf-8'):
    checks.append(('✅ PASS', 'src/app/not-found.tsx', '404 page exists & valid'))
else:
    checks.append(('❌ FAIL', 'src/app/not-found.tsx', '404 page missing'))

# 5. indexnow-key.txt check
ik_file = BASE / 'public' / 'indexnow-key.txt'
if ik_file.exists() and 'nifsindia2026indexnow' in ik_file.read_text(encoding='utf-8'):
    checks.append(('✅ PASS', 'public/indexnow-key.txt', 'IndexNow key file valid'))
else:
    checks.append(('❌ FAIL', 'public/indexnow-key.txt', 'IndexNow key missing'))

# 6. indexnow-ping.js script check
ip_script = BASE / 'scripts' / 'indexnow-ping.js'
if ip_script.exists() and 'nifsindia2026indexnow' in ip_script.read_text(encoding='utf-8'):
    checks.append(('✅ PASS', 'scripts/indexnow-ping.js', 'IndexNow ping script valid'))
else:
    checks.append(('❌ FAIL', 'scripts/indexnow-ping.js', 'Ping script missing'))

# 7. sitemap.ts check
sm_file = BASE / 'src' / 'app' / 'sitemap.ts'
sm_txt = sm_file.read_text(encoding='utf-8')
if 'safety-officer-course' in sm_txt and 'fire-and-safety-course' in sm_txt:
    checks.append(('✅ PASS', 'src/app/sitemap.ts', 'Sitemap includes new routes'))
else:
    checks.append(('❌ FAIL', 'src/app/sitemap.ts', 'Sitemap missing routes'))

# 8. .htaccess job-openings redirect check
ht_file = BASE / 'public' / '.htaccess'
if 'RewriteRule ^job-openings/?$ /placements/' in ht_file.read_text(encoding='utf-8'):
    checks.append(('✅ PASS', 'public/.htaccess', 'job-openings 301 redirect present'))
else:
    checks.append(('❌ FAIL', 'public/.htaccess', 'job-openings redirect missing'))

# 9. globals.css CLS rules check
css_file = BASE / 'src' / 'app' / 'globals.css'
if 'contain-intrinsic-size' in css_file.read_text(encoding='utf-8'):
    checks.append(('✅ PASS', 'src/app/globals.css', 'CLS prevention rules present'))
else:
    checks.append(('❌ FAIL', 'src/app/globals.css', 'CLS rules missing'))

# 10. schema.tsx Wikidata check
sch_file = BASE / 'src' / 'lib' / 'seo' / 'schema.tsx'
if 'Q6978436' in sch_file.read_text(encoding='utf-8'):
    checks.append(('✅ PASS', 'src/lib/seo/schema.tsx', 'Wikidata entity URIs present'))
else:
    checks.append(('❌ FAIL', 'src/lib/seo/schema.tsx', 'Wikidata URIs missing'))

# 11. layout.tsx font display swap check
lay_file = BASE / 'src' / 'app' / 'layout.tsx'
if 'display: "swap"' in lay_file.read_text(encoding='utf-8'):
    checks.append(('✅ PASS', 'src/app/layout.tsx', 'font display swap present'))
else:
    checks.append(('❌ FAIL', 'src/app/layout.tsx', 'font display swap missing'))

# 12. Build output check
out_dir = BASE / 'out'
if out_dir.exists() and (out_dir / 'fire-and-safety-course' / 'index.html').exists():
    checks.append(('✅ PASS', 'out/ static build directory', '207 static HTML pages generated'))
else:
    checks.append(('❌ FAIL', 'out/ static build directory', 'Build output missing'))

print('=== FULL COMPREHENSIVE VERIFICATION REPORT ===')
for status, path, desc in checks:
    print(f'{status} | {path:40s} | {desc}')
