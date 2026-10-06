# NIFS India — SEO Content Rules
## Read this before writing ANY copy for NIFS India.

### FORBIDDEN — Never write these:
- "100% placement" or "100% job guarantee" — use "dedicated placement assistance"
- "top-rated", "#1", "best in India", "leading" — unless you have a citation URL
- "guaranteed job" or "guaranteed placement" — never, ever
- Any center count other than what's in site-constants.ts → SITE.centerCount
- Any state count other than what's in site-constants.ts → SITE.stateCount
- Student count other than SITE.studentsPlaced
- "ITI eligible" for B.Sc courses (not true)
- Any salary figure without citing the source

### REQUIRED for every new blog post:
- Minimum 1200 words
- author field must be populated — use { name: "NIFS Faculty", title: "Fire & Safety Education Specialists" } if no named expert available
- No duplicate topic — search blog-posts.json for similar slugs first
- Canonical = self (no entry in contextual-links or overrides needed)
- No hardcoded stats — import from site-constants.ts

### REQUIRED for every city/center page:
- Use SITE.tagline for the "centers nationwide" line
- No superlatives in meta description (Google will rewrite them and it hurts CTR)
- Placement FAQs must reference Pan-India national recruiters only, NOT unverified local plant claims

### CANONICAL RULES:
- Every page self-canonicalizes by default — do NOT add canonical overrides without a clear reason
- Before adding any canonical-override entry, verify the target URL returns HTTP 200
- Never point a canonical at a URL you haven't checked is live

### DATA RULE:
- Before writing ANY number (centers, states, students placed) — check src/lib/data/site-constants.ts
- If the number isn't there, ADD it to site-constants.ts first, then use it
