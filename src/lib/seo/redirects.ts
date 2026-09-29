import blogPosts from "../data/blog-posts.json";
import galleryCategories from "../data/gallery.json";
import { courses } from "../data/courses";

/**
 * Single source of truth for every legacy-URL 301 this site has ever needed,
 * consumed by next.config.ts's redirects(). Mirrors the exact rule set that
 * scripts/generate-htaccess.js produced for the old cPanel/.htaccess setup —
 * ported here (not hand-retranscribed) so nothing is silently dropped.
 */
export function buildRedirects() {
  const redirects: {
    source: string;
    destination: string;
    permanent: boolean;
    has?: { type: "host"; value: string }[];
  }[] = [];

  // www -> apex (canonical domain is https://nifsindia.net)
  redirects.push({
    source: "/:path*",
    has: [{ type: "host", value: "www.nifsindia.net" }],
    destination: "https://nifsindia.net/:path*",
    permanent: true,
  });

  // Legacy homepage.html -> /
  redirects.push({ source: "/homepage.html", destination: "/", permanent: true });

  // Old WordPress blog URLs -> new /blog/<slug>/ pages
  for (const post of blogPosts as { slug: string }[]) {
    redirects.push({ source: `/${post.slug}/`, destination: `/blog/${post.slug}/`, permanent: true });
  }

  // Old WordPress course URLs -> new /courses/<slug>/ pages
  for (const course of courses) {
    redirects.push({ source: `/${course.slug}/`, destination: `/courses/${course.slug}/`, permanent: true });
  }

  // Old course URLs that used a different slug suffix
  const courseAliases: Record<string, string> = {
    "diploma-in-fire-safety-dfs": "diploma-in-fire-safety",
    "certificate-course-in-fire-safety-ccfs": "certificate-course-in-fire-safety",
    "sbtet-certificate-course-in-industrial-safety": "certificate-course-in-fire-safety",
  };
  for (const [oldSlug, newSlug] of Object.entries(courseAliases)) {
    redirects.push({ source: `/${oldSlug}/`, destination: `/courses/${newSlug}/`, permanent: true });
  }

  // Old gallery category URLs -> filterable /gallery/ page
  for (const cat of galleryCategories as { slug: string }[]) {
    if (cat.slug === "practical-training-yard") continue;
    const oldPath = cat.slug === "recognition-gallery" ? cat.slug : `gallery/${cat.slug}`;
    redirects.push({ source: `/${oldPath}/`, destination: `/gallery/?category=${cat.slug}`, permanent: true });
  }

  // GSC-indexed root-level practical-training-yard URL -> its own real page
  redirects.push({ source: "/practical-training-yard/", destination: "/gallery/practical-training-yard/", permanent: true });

  // Vizag has its own dedicated landing page
  redirects.push({ source: "/nifs-visakhapatnam/", destination: "/centers/visakhapatnam/", permanent: true });
  redirects.push({ source: "/vizag/", destination: "/centers/visakhapatnam/", permanent: true });
  redirects.push({ source: "/visakhapatnam/", destination: "/centers/visakhapatnam/", permanent: true });

  // Old per-city landing pages -> the single current /centers/ page
  redirects.push({ source: "/nifs-:city/", destination: "/centers/", permanent: true });

  // High-demand category with no dedicated course page -> catalog
  redirects.push({ source: "/category/safety-officer-course/", destination: "/courses/", permanent: true });

  // Old WordPress taxonomy archives -> current blog index
  redirects.push({ source: "/tag/:path*", destination: "/blog/", permanent: true });
  redirects.push({ source: "/category/:path*", destination: "/blog/", permanent: true });

  // Duplicate/cannibalizing pages -> the single surviving URL for that topic
  redirects.push({ source: "/safety-officer-salary-in-india/", destination: "/blog/safety-officer-salary-in-india-2026-complete-guide/", permanent: true });
  redirects.push({ source: "/blog/fire-safety-courses-after-12th/", destination: "/blog/top-fire-and-safety-courses-after-10th-12th-graduation-2026/", permanent: true });
  redirects.push({ source: "/safety-officer-course-after-12th/", destination: "/blog/top-fire-and-safety-courses-after-10th-12th-graduation-2026/", permanent: true });

  // Old utility/program pages with no 1:1 page today
  const utilityRedirects: Record<string, string> = {
    "how-to-apply": "/admissions/",
    "job-openings": "/placements/",
    jobs: "/placements/",
    "online-courses": "/courses/",
    "offline-courses": "/courses/",
    "nsdc-courses": "/courses/",
    sbtet: "/courses/",
    "annamalai-university-courses": "/courses/",
    "acharya-nagarjuna-university-courses": "/courses/",
    "mba-in-safety-management": "/courses/",
    "b-sc-in-health-safety-environment": "/courses/",
    "about/mission-vision": "/about/vision-mission/",
    "about/benefits": "/about/company-profile/",
  };
  for (const [oldSlug, dest] of Object.entries(utilityRedirects)) {
    redirects.push({ source: `/${oldSlug}/`, destination: dest, permanent: true });
  }

  return redirects;
}
