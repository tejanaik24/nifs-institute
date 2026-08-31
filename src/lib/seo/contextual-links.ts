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

LINK_MAP["salary"] = "/safety-officer-salary-in-india/";
LINK_MAP["salary in india"] = "/safety-officer-salary-in-india/";
LINK_MAP["pay scale"] = "/safety-officer-salary-in-india/";
LINK_MAP["how to become"] = "/how-to-become-a-safety-officer-in-india/";
LINK_MAP["career guide"] = "/how-to-become-a-safety-officer-in-india/";
LINK_MAP["after 12th"] = "/safety-officer-course-after-12th/";
LINK_MAP["12th pass"] = "/safety-officer-course-after-12th/";
LINK_MAP["training yard"] = "/gallery/practical-training-yard/";
LINK_MAP["practical training"] = "/gallery/practical-training-yard/";

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
  if (url === "/centers/") return "Find a Center Near You (70+ Nationwide)";
  if (url === "/admissions/") return "Admissions Open — Apply Online";
  if (url === "/how-to-become-a-safety-officer-in-india/")
    return "Step-by-Step Guide: How to Become a Safety Officer";
  if (url === "/safety-officer-course-after-12th/")
    return "Safety Officer Courses After 12th (Eligibility & Fees)";
  if (url === "/safety-officer-salary-in-india/")
    return "Safety Officer Salary in India (2026 Pay Scales)";
  if (url === "/gallery/practical-training-yard/")
    return "Explore NIFS Practical Firefighting Training Yard";
  const course = courses.find((c) => `/courses/${c.slug}/` === url);
  return course ? `${course.name} (Curriculum & Fees)` : url;
}
