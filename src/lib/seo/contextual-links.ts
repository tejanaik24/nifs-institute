import type { BlogPost } from "@/lib/data/blog";
import { centers } from "@/lib/data/centers";
import { courses } from "@/lib/data/courses";

const LINK_MAP: Record<string, string> = {};

for (const course of courses) {
  LINK_MAP[course.name.toLowerCase()] = `/courses/${course.slug}/`;
  LINK_MAP[course.shortName.toLowerCase()] = `/courses/${course.slug}/`;
}

for (const center of centers) {
  LINK_MAP[center.city.toLowerCase()] = "/centers/";
}

for (const keyword of ["admission", "apply", "enroll", "enquiry"]) {
  LINK_MAP[keyword] = "/admissions/";
}

// Point directly at the surviving canonical URL, not the redirected
// duplicate (2026-09-29 cannibalization fix) — avoids sending internal
// link equity through an unnecessary redirect hop.
LINK_MAP["salary"] = "/blog/safety-officer-salary-in-india-2026-complete-guide/";
LINK_MAP["salary in india"] = "/blog/safety-officer-salary-in-india-2026-complete-guide/";
LINK_MAP["pay scale"] = "/blog/safety-officer-salary-in-india-2026-complete-guide/";
LINK_MAP["how to become"] = "/how-to-become-a-safety-officer-in-india/";
LINK_MAP["career guide"] = "/how-to-become-a-safety-officer-in-india/";
LINK_MAP["after 12th"] = "/blog/top-fire-and-safety-courses-after-10th-12th-graduation-2026/";
LINK_MAP["12th pass"] = "/blog/top-fire-and-safety-courses-after-10th-12th-graduation-2026/";
LINK_MAP["training yard"] = "/gallery/practical-training-yard/";
LINK_MAP["practical training"] = "/gallery/practical-training-yard/";

// 2026-09-29: route more internal links into 3 blog posts sitting at
// striking distance (position 5-15) for real, already-ranking queries —
// more internal links is one of the fastest ways to push them onto page 1.
// Keywords checked against the live posts table before picking them —
// the first version of this used "safety officer training" (matches only
// 1 other post) and "safety engineering" (matches 0 other posts, dead
// code that could never fire); replaced with keywords that actually
// appear on other posts' titles/categories.
LINK_MAP["safety officer"] =
  "/blog/how-safety-officer-training-equips-you-to-lead-in-industrial-environments/";
LINK_MAP["fire and safety course"] = "/blog/a-complete-guide-on-fire-courses-at-nifs/";
LINK_MAP["safety engineer"] =
  "/blog/why-safety-engineering-courses-by-nifs-are-your-best-for-a-secure-future/";

const MAX_LINKS = 6;

export type ContextualLink = { title: string; url: string };

export function getContextualLinks(
  post: Pick<BlogPost, "title" | "categories">,
): ContextualLink[] {
  const haystack = `${post.categories.join(" ")} ${post.title}`.toLowerCase();
  const seen = new Set<string>();
  const links: ContextualLink[] = [];

  for (const [keyword, url] of Object.entries(LINK_MAP)) {
    if (links.length >= MAX_LINKS) break;
    if (seen.has(url)) continue;
    if (haystack.includes(keyword)) {
      seen.add(url);
      links.push({ title: titleForUrl(url), url });
    }
  }

  return links;
}

function titleForUrl(url: string): string {
  if (url === "/centers/") return "Find a Center Near You (65+ Nationwide)";
  if (url === "/admissions/") return "Admissions Open — Apply Online";
  if (url === "/how-to-become-a-safety-officer-in-india/")
    return "Step-by-Step Guide: How to Become a Safety Officer";
  if (url === "/blog/top-fire-and-safety-courses-after-10th-12th-graduation-2026/")
    return "Top Fire & Safety Courses After 10th/12th (Fees, Eligibility & Jobs)";
  if (url === "/blog/safety-officer-salary-in-india-2026-complete-guide/")
    return "Safety Officer Salary in India (2026 Pay Scales)";
  if (url === "/gallery/practical-training-yard/")
    return "Explore NIFS Practical Firefighting Training Yard";
  if (url === "/blog/how-safety-officer-training-equips-you-to-lead-in-industrial-environments/")
    return "How Safety Officer Training Prepares You to Lead";
  if (url === "/blog/a-complete-guide-on-fire-courses-at-nifs/")
    return "Complete Guide to Fire & Safety Courses at NIFS";
  if (url === "/blog/why-safety-engineering-courses-by-nifs-are-your-best-for-a-secure-future/")
    return "Why Safety Engineering Courses Boost Your Career";
  const course = courses.find((c) => `/courses/${c.slug}/` === url);
  return course ? `${course.name} (Curriculum & Fees)` : url;
}
