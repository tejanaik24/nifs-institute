// Moves the first entry of src/lib/data/blog-queue.json into blog-posts.json
// with today's date. NIFS has a single source of truth for blog data (no
// prerender.cjs/siteLinks.ts duplication like the Vyzma repo), so this is a
// straight move — not the 3-way mirror the Vyzma version needs.
const fs = require("fs");
const path = require("path");

const QUEUE_FILE = path.join(__dirname, "..", "src", "lib", "data", "blog-queue.json");
const POSTS_FILE = path.join(__dirname, "..", "src", "lib", "data", "blog-posts.json");

function main() {
  if (!fs.existsSync(QUEUE_FILE)) {
    console.log("No blog-queue.json found. Nothing to publish.");
    process.exit(0);
  }

  const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, "utf-8"));
  if (!queue.length) {
    console.log("Queue is empty. All posts published.");
    process.exit(0);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));

  const next = queue.shift();
  next.date = new Date().toISOString().split("T")[0];

  if (posts.some((p) => p.slug === next.slug)) {
    console.log(`Slug "${next.slug}" already exists in blog-posts.json — skipping, removing from queue.`);
  } else {
    posts.unshift(next); // newest first, matches existing file ordering convention
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
  }

  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), "utf-8");
  console.log(`Published "${next.slug}" with date ${next.date}. Remaining in queue: ${queue.length}`);
}

try {
  main();
} catch (e) {
  console.error("Publish error:", e.message);
  process.exit(1);
}
