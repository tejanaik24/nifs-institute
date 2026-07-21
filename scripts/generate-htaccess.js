// Regenerates public/.htaccess from the same data next.config.ts used to
// build redirects()/headers() before the static-export migration.
// Run: node scripts/generate-htaccess.js
const fs = require("fs");
const path = require("path");

const blogPosts = require("../src/lib/data/blog-posts.json");
const galleryCategories = require("../src/lib/data/gallery.json");

const lines = [];

lines.push("RewriteEngine On");
lines.push("");

// Old WordPress blog URLs -> new /blog/<slug>/ pages
for (const post of blogPosts) {
  lines.push(`RewriteRule ^${post.slug}/?$ /blog/${post.slug}/ [R=301,L]`);
}
lines.push("");

// Old gallery category URLs -> new filterable /gallery/ page
for (const cat of galleryCategories) {
  const oldPath =
    cat.slug === "recognition-gallery" ? cat.slug : `gallery/${cat.slug}`;
  lines.push(
    `RewriteRule ^${oldPath}/?$ /gallery/?category=${cat.slug} [R=301,L]`
  );
}
lines.push("");

// Security headers (mod_headers)
lines.push("<IfModule mod_headers.c>");
lines.push('  Header set X-Content-Type-Options "nosniff"');
lines.push('  Header set X-Frame-Options "DENY"');
lines.push('  Header set Referrer-Policy "strict-origin-when-cross-origin"');
lines.push(
  '  Header set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"'
);
lines.push("</IfModule>");
lines.push("");

// Static export needs .html extension resolved for clean URLs
lines.push("RewriteCond %{REQUEST_FILENAME} !-f");
lines.push("RewriteCond %{REQUEST_FILENAME} !-d");
lines.push("RewriteCond %{REQUEST_FILENAME}.html -f");
lines.push("RewriteRule ^(.*)$ $1.html [L]");

const out = lines.join("\n") + "\n";
fs.writeFileSync(path.join(__dirname, "../public/.htaccess"), out);
console.log(
  `Wrote public/.htaccess — ${blogPosts.length} blog redirects, ${galleryCategories.length} gallery redirects`
);
