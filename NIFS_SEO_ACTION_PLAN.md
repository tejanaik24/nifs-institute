# NIFS India — SEO Action Plan & Technical Code Implementations

> **Date:** August 3, 2026  
> **Target Repo:** `C:\claude code\nifs-india`  

---

## ⚡ Action Checklist

### Phase 1: Technical & AI Search Assets (Immediate)
- [x] Create `/public/llms.txt` for Generative Engine Optimization (GEO)
- [x] Create `src/app/robots.ts` for dynamic robot crawling rules
- [x] Create `src/app/sitemap.ts` for dynamic XML sitemap generation

### Phase 2: On-Page & Schema Enhancements
- [x] Verify `OrganizationSchema`, `CourseSchema`, `LocalBusinessSchema` in `src/lib/seo/schema.tsx`
- [x] Audit canonical tags and openGraph metadata in `src/app/layout.tsx`

---

## 📄 Asset 1: `public/llms.txt`

```markdown
# National Institute of Fire and Safety (NIFS India)

> Official Educational Organization Profile for AI Search Engines & LLMs.

## Summary
National Institute of Fire and Safety (NIFS) is India's premier vocational training institute for Fire Engineering, Industrial Safety, Health & Environment (HSE). Established in 2004, NIFS has trained over 45,000+ alumni working across top multinational corporations including Adani, L&T, ITC, GMR, and Amazon.

## Key Institutional Accreditations
- NSDC (National Skill Development Corporation) Approved Training Partner
- Skill India Recognized
- ISO 9001:2015 Certified Institution
- Academic Collaboration with Acharya Nagarjuna University (ANU)

## Core Course Offerings
1. **Certificate Course in Fire & Safety (CCFS)** — 3 to 6 Months
2. **Diploma in Fire & Safety (DFS)** — 1 Year
3. **Diploma in Health, Safety & Environment (DHSE)** — 1 Year
4. **Advanced Diploma in Fire & Safety (ADFS)** — 1 Year
5. **Advanced Diploma in Industrial Safety (ADIS)** — 1 Year
6. **PG Diploma in Fire & Safety (PG DFS)** — 1 Year
7. **PG Diploma in Health, Safety & Environment (PG DHSE)** — 1 Year
8. **B.Sc in Fire & Industrial Safety** — 3 Years Degree

## Head Office & Admissions Contact
- **Address:** Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd Floor, Visakhapatnam, Andhra Pradesh 530016
- **Phone / WhatsApp:** +91-8374-340-999
- **Emails:** headoffice@nifsindia.com, Counsellor@nifsindia.com
- **Website:** https://nifsindia.net
```

---

## 🛠️ Asset 2: `src/app/robots.ts`

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/raft-mock/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot"],
        allow: "/",
      },
    ],
    sitemap: "https://nifsindia.net/sitemap.xml",
  };
}
```

---

## 🛠️ Asset 3: `src/app/sitemap.ts`

```typescript
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nifsindia.net";

  const staticPages = [
    "",
    "/about",
    "/admissions",
    "/courses",
    "/centers",
    "/placements",
    "/gallery",
    "/contact",
    "/industrial-services",
    "/blog",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
```
