import { google } from "googleapis";
import { getGoogleCredentials } from "./google-credentials";

export async function getTopQueries(rowLimit = 25) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    ...getGoogleCredentials(),
  });
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 28);

  const response = await searchconsole.searchanalytics.query({
    siteUrl: process.env.GSC_SITE_URL!,
    requestBody: {
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      dimensions: ["query"],
      rowLimit,
    },
  });

  return (response.data.rows ?? []).map((row) => ({
    query: row.keys?.[0] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    position: row.position ?? 0,
  }));
}

/** Cross-checks a list of target keywords (from NIFS-CHEAT-SHEET.md's active
 * keyword table) against real GSC data — flags any with zero impressions as
 * genuinely not-ranking. GSC never exposes a "not ranking" list directly; this
 * derives it honestly from a real target list instead of inventing one. */
export async function getKeywordGaps(targetKeywords: string[]) {
  // Wide net (not just the top 25) so a real but lower-volume ranking
  // keyword isn't mislabeled as "not ranking."
  const allQueries = await getTopQueries(5000);
  const seen = new Map(allQueries.map((q) => [q.query.toLowerCase(), q]));

  return targetKeywords.map((keyword) => {
    const match = seen.get(keyword.toLowerCase());
    return match
      ? { keyword, status: "ranking" as const, position: match.position, clicks: match.clicks }
      : { keyword, status: "not-ranking-yet" as const };
  });
}
