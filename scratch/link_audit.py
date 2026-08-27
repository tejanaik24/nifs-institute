"""
NIFS Internal Link Audit — finds links pointing to routes that don't exist in the Next.js app
"""
import os
import re
from pathlib import Path

APP_DIR = Path(r'C:\claude code\nifs-india\src\app')
PUBLIC_DIR = Path(r'C:\claude code\nifs-india\public')

# 1. Discover all actual routes from the app directory
print("=== EXISTING ROUTES (from src/app/) ===")
existing_routes = set()
existing_routes.add('/')

for root, dirs, files in os.walk(APP_DIR):
    # Skip private/system dirs
    dirs[:] = [d for d in dirs if not d.startswith('_') and not d.startswith('.')]
    for fname in files:
        if fname in ('page.tsx', 'page.js'):
            rel = Path(root).relative_to(APP_DIR)
            route = '/' + str(rel).replace('\\', '/').replace('[slug]', ':slug').replace('[id]', ':id')
            if route == '/':
                pass
            existing_routes.add(route.rstrip('/') + '/')
            print(f"  {route.rstrip('/') + '/'}")

print(f"\nTotal routes: {len(existing_routes)}")

# 2. Scan all TSX/HTML files for internal <Link href=...> and <a href=...>
print("\n=== SCANNING FOR INTERNAL LINKS ===")
internal_links = {}  # href -> list of source files

# Patterns
link_patterns = [
    re.compile(r'href=["\']([^"\'#?]+)["\']'),   # href="/path"
    re.compile(r'href=\{["\']([^"\'#?]+)["\']\}'),  # href={"/path"}
]

# Files to scan
scan_dirs = [
    Path(r'C:\claude code\nifs-india\src'),
    Path(r'C:\claude code\nifs-india\public'),
]

for scan_dir in scan_dirs:
    for root, dirs, files in os.walk(scan_dir):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ('node_modules', '.next', 'out')]
        for fname in files:
            if not fname.endswith(('.tsx', '.ts', '.jsx', '.js', '.html')):
                continue
            fpath = Path(root) / fname
            try:
                content = fpath.read_text(encoding='utf-8', errors='ignore')
            except:
                continue
            for pat in link_patterns:
                for m in pat.finditer(content):
                    href = m.group(1)
                    # Only internal links starting with /
                    if href.startswith('/') and not href.startswith('//'):
                        # Normalize
                        href_norm = href.rstrip('/') + '/'
                        if href_norm not in internal_links:
                            internal_links[href_norm] = []
                        rel_src = str(fpath).replace(r'C:\claude code\nifs-india\\', '')
                        if rel_src not in internal_links[href_norm]:
                            internal_links[href_norm].append(rel_src)

print(f"Found {len(internal_links)} unique internal href values")

# 3. Cross-check: find links that don't match any existing route
print("\n=== BROKEN INTERNAL LINKS (href doesn't match any page route) ===")

# Build a set of known static routes (non-dynamic)
static_routes = {r for r in existing_routes if ':slug' not in r and ':id' not in r}
dynamic_prefixes = [r.split(':')[0] for r in existing_routes if ':slug' in r or ':id' in r]

broken = []
skip_patterns = [
    r'^/images/', r'^/icons/', r'^/fonts/', r'^/api/', r'^/llms',
    r'^/robots', r'^/sitemap', r'^/favicon', r'^/indexnow',
    r'^\._', r'^/blog/', r'^/centers/', r'^/courses/', r'^/about/',
    r'^/industrial-services/', r'^/tag/', r'^/top-picks',
    r'^/why-safety', r'^/advantages-of', r'^/sbtet',
]

import re as re2
skip_compiled = [re2.compile(p) for p in skip_patterns]

for href, sources in sorted(internal_links.items()):
    # Skip known-good patterns (dynamic routes, static assets)
    if any(p.match(href) for p in skip_compiled):
        continue
    if href in static_routes:
        continue
    # Check if it matches a dynamic route prefix
    matched_dynamic = any(href.startswith(prefix) for prefix in dynamic_prefixes)
    if matched_dynamic:
        continue
    broken.append((href, sources))

if broken:
    for href, sources in broken:
        print(f"\n  🔴 {href}")
        for s in sources[:3]:
            print(f"       ← {s}")
        if len(sources) > 3:
            print(f"       ← ...and {len(sources)-3} more files")
else:
    print("  No obviously broken internal links detected.")

# 4. Check specific known-problematic routes from GSC
print("\n=== CHECKING SPECIFIC HIGH-IMPRESSION PAGES AGAINST ROUTES ===")
gsc_pages = [
    '/top-picks-for-free-online-safety-courses-you-can-trust/',
    '/why-safety-engineering-courses-by-nifs-are-your-best-for-a-secure-future/',
    '/advantages-of-studying-industrial-safety-from-a-government-recognized-institute/',
    '/sbtet-certificate-course-in-industrial-safety/',
    '/job-openings/',
    '/admissions/',
    '/placements/',
    '/fire-and-safety-course/',
    '/courses/safety-officer-course/',
    '/industrial-services/',
]

for pg in gsc_pages:
    # Check if page.tsx exists
    # Convert route to file path
    route_path = pg.strip('/')
    page_tsx = APP_DIR / route_path / 'page.tsx'
    page_js = APP_DIR / route_path / 'page.js'
    if page_tsx.exists():
        print(f"  ✅ {pg}  → {page_tsx.relative_to(APP_DIR.parent.parent)}")
    elif page_js.exists():
        print(f"  ✅ {pg}  → {page_js.relative_to(APP_DIR.parent.parent)}")
    else:
        # Check if it could be a dynamic route
        parts = route_path.split('/')
        found = False
        if len(parts) >= 2:
            parent = '/'.join(parts[:-1])
            slug_path = APP_DIR / parent / '[slug]' / 'page.tsx'
            if slug_path.exists():
                print(f"  🟡 {pg}  → dynamic [slug] at {slug_path.relative_to(APP_DIR.parent.parent)}")
                found = True
        if not found:
            print(f"  ❌ {pg}  → NO page.tsx found — likely 404!")
