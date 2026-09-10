import { google } from "googleapis";
import { getGoogleCredentials } from "./google-credentials";
import { withCache, withTimeout, FIVE_MINUTES } from "./cache";

const GSC_TIMEOUT_MS = 15_000;

export async function getTopQueriesRaw(rowLimit = 25) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    ...getGoogleCredentials(),
  });
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 28);

  const response = await withTimeout(
    searchconsole.searchanalytics.query({
      siteUrl: process.env.GSC_SITE_URL!,
      requestBody: {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
        dimensions: ["query"],
        rowLimit,
      },
    }),
    GSC_TIMEOUT_MS,
  );

  return (response.data.rows ?? []).map((row) => ({
    query: row.keys?.[0] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    position: row.position ?? 0,
  }));
}

export const getTopQueries = withCache(getTopQueriesRaw, FIVE_MINUTES);

/** Real site-wide totals — no `query` dimension, so this is the actual total
 * across every keyword, not a sum of only the top N rows (which understates
 * the true number whenever the site ranks for more than `rowLimit` queries). */
export async function getSiteTotalsRaw() {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    ...getGoogleCredentials(),
  });
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 28);

  const response = await withTimeout(
    searchconsole.searchanalytics.query({
      siteUrl: process.env.GSC_SITE_URL!,
      requestBody: {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
        dimensions: [],
      },
    }),
    GSC_TIMEOUT_MS,
  );

  const row = response.data.rows?.[0];
  return {
    totalClicks: row?.clicks ?? 0,
    totalImpressions: row?.impressions ?? 0,
    avgPosition: row?.position ?? 0,
  };
}

export const getSiteTotals = withCache(getSiteTotalsRaw, FIVE_MINUTES);

/** Cross-checks a list of target keywords (from NIFS-CHEAT-SHEET.md's active
 * keyword table) against real GSC data — flags any with zero impressions as
 * genuinely not-ranking. GSC never exposes a "not ranking" list directly; this
 * derives it honestly from a real target list instead of inventing one. */
export function getKeywordGaps(targetKeywords: string[]) {
  // Wide net (not just the top 25) so a real but lower-volume ranking
  // keyword isn't mislabeled as "not ranking." The underlying call is cached,
  // so this stays cheap even with the 5000-row pull.
  return getTopQueries(5000).then((allQueries) => {
    const seen = new Map(allQueries.map((q) => [q.query.toLowerCase(), q]));

    return targetKeywords.map((keyword) => {
      const match = seen.get(keyword.toLowerCase());
      return match
        ? { keyword, status: "ranking" as const, position: match.position, clicks: match.clicks }
        : { keyword, status: "not-ranking-yet" as const };
    });
  });
}