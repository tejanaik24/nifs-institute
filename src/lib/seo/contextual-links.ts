import { courses } from "@/lib/data/courses";
import { centers } from "@/lib/data/centers";
import type { BlogPost } from "@/lib/data/blog";

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

const MAX_LINKS = 6;

export type ContextualLink = { title: string; url: string };

export function getContextualLinks(post: Pick<BlogPost, "title" | "categories">): ContextualLink[] {
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
  if (url === "/centers/") return "Find a Center Near You";
  if (url === "/admissions/") return "Admissions Open — Apply Now";
  const course = courses.find((c) => `/courses/${c.slug}/` === url);
  return course ? course.name : url;
}
