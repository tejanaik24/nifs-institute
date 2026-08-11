// Regenerates public/.htaccess from the same data next.config.ts used to
// build redirects()/headers() before the static-export migration.
// Run: node scripts/generate-htaccess.js
const fs = require("fs");
const path = require("path");

const blogPosts = require("../src/lib/data/blog-posts.json");
const galleryCategories = require("../src/lib/data/gallery.json");

// courses.ts is TypeScript (not directly requirable from this plain Node
// script) — slugs mirrored here from src/lib/data/courses.ts. Update both
// if a course slug ever changes.
const courses = [
  { slug: "certificate-course-in-fire-safety" },
  { slug: "diploma-in-fire-safety" },
  { slug: "diploma-in-health-safety-environment" },
  { slug: "advanced-diploma-in-fire-safety-adfs" },
  { slug: "advanced-diploma-in-industrial-safety-adis" },
  { slug: "pg-diploma-in-fire-safety-pg-dfs" },
  { slug: "pg-diploma-in-health-safety-environment-pg-dhse" },
  { slug: "b-sc-in-fire-industrial-safety" },
  { slug: "b-sc-honours-in-fire-industrial-safety" },
];

const lines = [];

lines.push("# Disable LiteSpeed Caching for dynamic/static HTML updates");
lines.push("<IfModule LiteSpeed>");
lines.push("  CacheLookup off");
lines.push("</IfModule>");
lines.push("");

lines.push("RewriteEngine On");
lines.push("");

// Legacy homepage.html -> /
lines.push("RewriteRule ^homepage\\.html$ / [R=301,L]");
lines.push("");

// Old WordPress blog URLs -> new /blog/<slug>/ pages
for (const post of blogPosts) {
  lines.push(`RewriteRule ^${post.slug}/?$ /blog/${post.slug}/ [R=301,L]`);
}
lines.push("");

// Old WordPress course URLs -> new /courses/<slug>/ pages (exact slug matches)
for (const course of courses) {
  lines.push(`RewriteRule ^${course.slug}/?$ /courses/${course.slug}/ [R=301,L]`);
}
lines.push("");

// Old course URLs that used a different slug suffix than today's course page
const courseAliases = {
  "diploma-in-fire-safety-dfs": "diploma-in-fire-safety",
  "certificate-course-in-fire-safety-ccfs": "certificate-course-in-fire-safety",
  "sbtet-certificate-course-in-industrial-safety": "certificate-course-in-fire-safety",
};
for (const [oldSlug, newSlug] of Object.entries(courseAliases)) {
  lines.push(`RewriteRule ^${oldSlug}/?$ /courses/${newSlug}/ [R=301,L]`);
}
lines.push("");

// Old gallery category URLs -> new filterable /gallery/ page.
// "practical-training-yard" is skipped here — it now has its own real
// static page at this exact URL (/gallery/practical-training-yard/), so
// redirecting it away would bounce the page to itself.
for (const cat of galleryCategories) {
  if (cat.slug === "practical-training-yard") continue;
  const oldPath =
    cat.slug === "recognition-gallery" ? cat.slug : `gallery/${cat.slug}`;
  lines.push(
    `RewriteRule ^${oldPath}/?$ /gallery/?category=${cat.slug} [R=301,L]`
  );
}
lines.push("");

// GSC-indexed root-level URL (no /gallery/ prefix) for the practical
// training yard photos — send it to its own real page, not the generic
// /gallery/ filter, so title/meta stay unique. Must come before the
// single-segment catch-all below.
lines.push(
  "RewriteRule ^practical-training-yard/?$ /gallery/practical-training-yard/ [R=301,L]"
);
lines.push("");

// Visakhapatnam now has its own dedicated landing page — send it there
// instead of the generic /centers/ directory. Must come before the
// catch-all below (Apache stops at the first matching rule).
lines.push("RewriteRule ^nifs-visakhapatnam/?$ /centers/visakhapatnam/ [R=301,L]");
lines.push("");

// Old per-city landing pages -> the single current /centers/ page
lines.push("RewriteRule ^nifs-[a-z-]+/?$ /centers/ [R=301,L]");
lines.push("");

// No dedicated "Safety Officer Course" page exists in courses.ts — send
// this specific high-demand category to the course catalog instead of the
// generic category->blog fallback below (several courses list "Safety
// Officer" as a career outcome: ADFS, ADIS, B.Sc Hons).
lines.push("RewriteRule ^category/safety-officer-course/?$ /courses/ [R=301,L]");
lines.push("");

// Old WordPress taxonomy archives -> the current blog index
lines.push("RewriteRule ^tag/.*$ /blog/ [R=301,L]");
lines.push("RewriteRule ^category/.*$ /blog/ [R=301,L]");
lines.push("");

// Old utility/program pages with no 1:1 page today -> closest current section
const utilityRedirects = {
  "how-to-apply": "/admissions/",
  jobs: "/placements/",
  "online-courses": "/courses/",
  "offline-courses": "/courses/",
  "nsdc-courses": "/courses/",
  sbtet: "/courses/",
  "annamalai-university-courses": "/courses/",
  "acharya-nagarjuna-university-courses": "/courses/",
  "mba-in-safety-management": "/courses/",
  "b-sc-in-health-safety-environment": "/courses/",
};
for (const [oldSlug, dest] of Object.entries(utilityRedirects)) {
  lines.push(`RewriteRule ^${oldSlug}/?$ ${dest} [R=301,L]`);
}
lines.push("");

// Ensure correct MIME types for static assets
lines.push("<IfModule mod_mime.c>");
lines.push("  AddType text/css .css");
lines.push("  AddType application/javascript .js");
lines.push("  AddType image/svg+xml .svg");
lines.push("  AddType image/webp .webp");
lines.push("  AddType font/woff2 .woff2");
lines.push("</IfModule>");
lines.push("");

// Security headers
lines.push("<IfModule mod_headers.c>");
lines.push('  Header set X-Content-Type-Options "nosniff"');
lines.push('  Header set X-Frame-Options "DENY"');
lines.push('  Header set Referrer-Policy "strict-origin-when-cross-origin"');
lines.push(
  '  Header set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"'
);
lines.push('  <FilesMatch "\\.(html|htm)$">');
lines.push('    Header set Cache-Control "no-cache, no-store, must-revalidate"');
lines.push('    Header set Pragma "no-cache"');
lines.push('    Header set Expires "0"');
lines.push("  </FilesMatch>");
lines.push('  <FilesMatch "\\.(css|js|woff2|jpg|png|webp|svg)$">');
lines.push('    Header set Cache-Control "public, max-age=31536000, immutable"');
lines.push("  </FilesMatch>");
lines.push("</IfModule>");
lines.push("");

// Static export needs .html extension resolved for clean URLs
lines.push("RewriteCond %{REQUEST_FILENAME} !-f");
lines.push("RewriteCond %{REQUEST_FILENAME} !-d");
lines.push("RewriteCond %{REQUEST_FILENAME}.html -f");
lines.push("RewriteRule ^(.*)$ $1.html [L]");
lines.push("");

// Catch-all: any remaining single-segment old URL with no known mapping
// still lands on real content (the blog index) instead of a dead 404.
lines.push("RewriteCond %{REQUEST_FILENAME} !-f");
lines.push("RewriteCond %{REQUEST_FILENAME} !-d");
lines.push("RewriteRule ^[^/]+/?$ /blog/ [R=301,L]");

const out = lines.join("\n") + "\n";
fs.writeFileSync(path.join(__dirname, "../public/.htaccess"), out);
console.log(
  `Wrote public/.htaccess — ${blogPosts.length} blog redirects, ${courses.length} course redirects, ${Object.keys(courseAliases).length} course aliases, ${galleryCategories.length} gallery redirects, city/tag/category/utility catch-alls, generic fallback`
);
