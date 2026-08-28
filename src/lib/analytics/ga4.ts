import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { getGoogleCredentials } from "./google-credentials";

const client = new BetaAnalyticsDataClient(getGoogleCredentials());

export async function getDailySummary() {
  const propertyId = process.env.GA4_PROPERTY_ID!;

  const [summary] = await client.runReport({
    property: propertyId,
    dateRanges: [{ startDate: "yesterday", endDate: "yesterday" }],
    metrics: [{ name: "activeUsers" }],
  });
  const visitors = Number(summary.rows?.[0]?.metricValues?.[0]?.value ?? 0);

  const [pages] = await client.runReport({
    property: propertyId,
    dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "averageSessionDuration" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 10,
  });

  const topPages = (pages.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? "",
    views: Number(row.metricValues?.[0]?.value ?? 0),
    avgTimeSeconds: Number(row.metricValues?.[1]?.value ?? 0),
  }));

  return { visitors, topPages };
}

export async function getActiveUsersRightNow(): Promise<number> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await client.runRealtimeReport({
    property: propertyId,
    metrics: [{ name: "activeUsers" }],
  });
  return Number(response.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}

async function runDimensionReport(dimension: string, limit = 10) {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await client.runReport({
    property: propertyId,
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: dimension }],
    metrics: [{ name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    limit,
  });
  return (response.rows ?? []).map((row) => ({
    label: row.dimensionValues?.[0]?.value ?? "",
    users: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

/** Where visitors came from (organic search, direct, social, referral...). */
export async function getTrafficSources() {
  return runDimensionReport("sessionDefaultChannelGroup");
}

/** Country-level geography — 28 days. */
export async function getCountries() {
  return runDimensionReport("country");
}

/** State/region-level geography — 28 days. */
export async function getRegions() {
  return runDimensionReport("region", 15);
}

export async function getDeviceBreakdown() {
  return runDimensionReport("deviceCategory");
}

export async function getBrowserBreakdown() {
  return runDimensionReport("browser");
}

/** Age brackets — requires Google Signals/demographics enabled on the GA4
 * property. If it isn't, GA4 returns an empty row set rather than an error,
 * so an empty array here means "not enabled," not "zero users of any age" —
 * the caller must render that as unavailable, never as real zero data. */
export async function getAgeBreakdown() {
  return runDimensionReport("userAgeBracket");
}

/** Per-post pageviews for /blog/<slug>/ paths, keyed by slug — used to show
 * real performance numbers next to each post on the Content page. */
export async function getBlogPostViews(): Promise<Map<string, number>> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await client.runReport({
    property: propertyId,
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: { matchType: "BEGINS_WITH", value: "/blog/" },
      },
    },
    limit: 1000,
  });

  const bySlug = new Map<string, number>();
  for (const row of response.rows ?? []) {
    const path = row.dimensionValues?.[0]?.value ?? "";
    const slug = path.replace(/^\/blog\//, "").replace(/\/$/, "");
    const views = Number(row.metricValues?.[0]?.value ?? 0);
    if (slug) bySlug.set(slug, views);
  }
  return bySlug;
}
