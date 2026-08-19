// Pings IndexNow (Bing + Yandex + friends — NOT Google, which doesn't participate)
// with the current sitemap. Run after a successful deploy so the key file is
// already live when the ping fires. See D:\Vyzma\_BRAIN\ai-readiness-playbook.md
// Phase 4 for the honest per-engine limits of this mechanism.
const fs = require("fs");
const path = require("path");

async function pingIndexNow() {
  console.log("Initializing IndexNow ping for nifsindia.net...");
  const sitemapPath = path.join(__dirname, "..", "out", "sitemap.xml");

  if (!fs.existsSync(sitemapPath)) {
    console.error("Sitemap not found at out/sitemap.xml — run npm run build first.");
    return;
  }

  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
  const urls = (sitemapContent.match(/<loc>(.*?)<\/loc>/g) || []).map((m) =>
    m.replace("<loc>", "").replace("</loc>", "")
  );

  if (!urls.length) {
    console.log("No URLs found in sitemap.xml.");
    return;
  }

  // Self-generated key — no signup required. Written to public/ (source) so
  // every future `npm run build` carries it into out/ automatically — writing
  // only into out/ would need a redeploy before the key is ever live to ping.
  const apiKey = "9f4c2e17ab8d4f3d8c02a5a1f4b6e30d";
  const host = "nifsindia.net";

  const publicKeyPath = path.join(__dirname, "..", "public", `${apiKey}.txt`);
  if (!fs.existsSync(publicKeyPath)) {
    fs.writeFileSync(publicKeyPath, apiKey, "utf-8");
    console.log(`  Wrote verification file: public/${apiKey}.txt (will ship on next build)`);
  }
  const outKeyPath = path.join(__dirname, "..", "out", `${apiKey}.txt`);
  if (!fs.existsSync(outKeyPath)) {
    fs.writeFileSync(outKeyPath, apiKey, "utf-8");
  }

  const payload = {
    host,
    key: apiKey,
    keyLocation: `https://${host}/${apiKey}.txt`,
    urlList: urls.slice(0, 1000),
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`IndexNow ping succeeded (${response.status}) — ${urls.length} URLs submitted.`);
    } else {
      console.log(`IndexNow ping response: ${response.status} (${response.statusText})`);
    }
  } catch (err) {
    console.warn("IndexNow ping network error:", err.message);
  }
}

pingIndexNow();
