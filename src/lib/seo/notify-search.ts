import { google } from "googleapis";
import { getGoogleCredentials } from "@/lib/analytics/google-credentials";

const HOST = "nifsindia.net";
// Same self-generated IndexNow key already served from public/ (see scripts/ping-indexnow.cjs).
const INDEXNOW_KEY = "9f4c2e17ab8d4f3d8c02a5a1f4b6e30d";

export function jobUrl(slug: string) {
  return `https://${HOST}/placements/jobs/${slug}/`;
}

/**
 * Tells Google (Indexing API, which officially supports JobPosting pages) and
 * Bing/Yandex (IndexNow) that a job page was added or changed. Closing a job
 * also uses this: the closed page stays live (no 404) but drops its JobPosting
 * markup, so a re-crawl is what we want, not URL_DELETED. Best-effort: never
 * throws, so a search-engine hiccup can't block publishing a job.
 */
export async function notifySearchEngines(url: string) {
  const [indexing, indexNow] = await Promise.allSettled([
    (async () => {
      const auth = new google.auth.GoogleAuth({
        ...getGoogleCredentials(),
        scopes: ["https://www.googleapis.com/auth/indexing"],
      });
      const res = await google.indexing({ version: "v3", auth }).urlNotifications.publish({
        requestBody: { url, type: "URL_UPDATED" },
      });
      return res.status;
    })(),
    fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: [url],
      }),
      signal: AbortSignal.timeout(8000),
    }).then((r) => r.status),
  ]);
  for (const [name, r] of [["google-indexing", indexing], ["indexnow", indexNow]] as const) {
    if (r.status === "rejected") console.warn(`[notify-search] ${name} failed for ${url}:`, r.reason?.message ?? r.reason);
  }
  return { indexing, indexNow };
}
