// One-off Pexels image fetcher for new blog posts. Usage:
//   node scripts/fetch-blog-image.cjs "<search query>" <output-slug>
// Downloads the first landscape result to public/images/blog/<output-slug>.jpg
require("dotenv").config({ path: ".env.local" });
const https = require("https");
const fs = require("fs");
const path = require("path");

const [, , query, outSlug] = process.argv;
if (!query || !outSlug) {
  console.error("Usage: node fetch-blog-image.cjs \"<query>\" <output-slug>");
  process.exit(1);
}

const key = process.env.PEXELS_API_KEY;
if (!key) {
  console.error("PEXELS_API_KEY not set");
  process.exit(1);
}

function search(q) {
  return new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname: "api.pexels.com",
          path: "/v1/search?query=" + encodeURIComponent(q) + "&per_page=1&orientation=landscape",
          headers: { Authorization: key },
        },
        (res) => {
          let d = "";
          res.on("data", (c) => (d += c));
          res.on("end", () => resolve(JSON.parse(d)));
        }
      )
      .on("error", reject);
  });
}

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location, destPath).then(resolve, reject);
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", reject);
  });
}

(async () => {
  const result = await search(query);
  const photo = result.photos && result.photos[0];
  if (!photo) {
    console.error("No Pexels result for:", query, JSON.stringify(result));
    process.exit(1);
  }
  const destDir = path.join(__dirname, "..", "public", "images", "blog");
  fs.mkdirSync(destDir, { recursive: true });
  const destPath = path.join(destDir, `${outSlug}.jpg`);
  await download(photo.src.large, destPath);
  console.log(`Saved: public/images/blog/${outSlug}.jpg (photo by ${photo.photographer}, Pexels)`);
})();
