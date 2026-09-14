import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { FIVE_MINUTES, withCache, withTimeout } from "./cache";
import { getGoogleCredentials } from "./google-credentials";

const client = new BetaAnalyticsDataClient(getGoogleCredentials());

const REPORT_TIMEOUT_MS = 15_000;
const REALTIME_TIMEOUT_MS = 10_000;

const runReportSafe = (request: Parameters<typeof client.runReport>[0]) =>
  withTimeout(client.runReport(request), REPORT_TIMEOUT_MS);

const runRealtimeReportSafe = (
  request: Parameters<typeof client.runRealtimeReport>[0],
) => withTimeout(client.runRealtimeReport(request), REALTIME_TIMEOUT_MS);

export async function getDailySummaryRaw() {
  const propertyId = process.env.GA4_PROPERTY_ID!;

  const [summary] = await runReportSafe({
    property: propertyId,
    dateRanges: [{ startDate: "yesterday", endDate: "yesterday" }],
    metrics: [{ name: "activeUsers" }],
  });
  const visitors = Number(summary.rows?.[0]?.metricValues?.[0]?.value ?? 0);

  const [pages] = await runReportSafe({
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

export const getDailySummary = withCache(getDailySummaryRaw, FIVE_MINUTES);

export async function getActiveUsersRightNow(): Promise<number> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await runRealtimeReportSafe({
    property: propertyId,
    metrics: [{ name: "activeUsers" }],
  });
  return Number(response.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}

async function runDimensionReport(dimension: string, limit = 10) {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await runReportSafe({
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

const cachedDimensionReport = withCache(runDimensionReport, FIVE_MINUTES);

/** Where visitors came from (organic search, direct, social, referral...). */
export function getTrafficSources() {
  return cachedDimensionReport("sessionDefaultChannelGroup");
}

/** Country-level geography — 28 days. */
export function getCountries() {
  return cachedDimensionReport("country");
}

/** State/region-level geography — 28 days. */
export function getRegions() {
  return cachedDimensionReport("region", 15);
}

export function getDeviceBreakdown() {
  return cachedDimensionReport("deviceCategory");
}

export function getBrowserBreakdown() {
  return cachedDimensionReport("browser");
}

export function getSourceBreakdown() {
  return cachedDimensionReport("sessionSource", 25);
}

/** Age brackets — requires Google Signals/demographics enabled on the GA4
 * property. If it isn't, GA4 returns an empty row set rather than an error,
 * so an empty array here means "not enabled," not "zero users of any age" —
 * the caller must render that as unavailable, never as real zero data. */
export function getAgeBreakdown() {
  return cachedDimensionReport("userAgeBracket");
}

/** Per-post pageviews for /blog/<slug>/ paths, keyed by slug — used to show
 * real performance numbers next to each post on the Content page. */
export async function getBlogPostViewsRaw(): Promise<Map<string, number>> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await runReportSafe({
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

export const getBlogPostViews = withCache(getBlogPostViewsRaw, FIVE_MINUTES);

export type IntentBreakdown = {
  courseViews: number;
  courseUsers: number;
  jobViews: number;
  jobUsers: number;
  generalViews: number;
  generalUsers: number;
  topCoursePages: { path: string; views: number; users: number }[];
  topJobPages: { path: string; views: number; users: number }[];
};

const COURSE_PATH_PREFIXES = ["/course", "/admission", "/centers"];
const JOB_PATH_MATCHERS = [
  {
    fieldName: "pagePath",
    stringFilter: { matchType: "BEGINS_WITH" as const, value: "/placement" },
  },
  {
    fieldName: "pagePath",
    stringFilter: { matchType: "BEGINS_WITH" as const, value: "/jobs" },
  },
  {
    fieldName: "pagePath",
    stringFilter: { matchType: "CONTAINS" as const, value: "hiring" },
  },
  {
    fieldName: "pagePath",
    stringFilter: { matchType: "CONTAINS" as const, value: "career" },
  },
];

/** True distinct-user count for a group of pages, via a single GA4 query
 * with an OR filter across all matching paths — GA4's `activeUsers` is not
 * additive across per-page dimension rows (a user who viewed 2 pages in the
 * group would be double-counted if summed row by row). */
async function getGroupActiveUsers(
  propertyId: string,
  expressions: {
    fieldName: string;
    stringFilter: { matchType: "BEGINS_WITH" | "CONTAINS"; value: string };
  }[],
): Promise<number> {
  const [response] = await runReportSafe({
    property: propertyId,
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    metrics: [{ name: "activeUsers" }],
    dimensionFilter: {
      orGroup: { expressions: expressions.map((filter) => ({ filter })) },
    },
  });
  return Number(response.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}

export async function getIntentBreakdownRaw(): Promise<IntentBreakdown> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await runReportSafe({
    property: propertyId,
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 250,
  });

  let courseViews = 0;
  let jobViews = 0;
  let generalViews = 0;
  let generalUsers = 0;

  const topCoursePages: { path: string; views: number; users: number }[] = [];
  const topJobPages: { path: string; views: number; users: number }[] = [];

  for (const row of response.rows ?? []) {
    const path = (row.dimensionValues?.[0]?.value ?? "").toLowerCase();
    const views = Number(row.metricValues?.[0]?.value ?? 0);
    const users = Number(row.metricValues?.[1]?.value ?? 0);

    if (COURSE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))) {
      courseViews += views;
      if (topCoursePages.length < 5)
        topCoursePages.push({ path, views, users });
    } else if (
      path.startsWith("/placement") ||
      path.startsWith("/jobs") ||
      path.includes("hiring") ||
      path.includes("career")
    ) {
      jobViews += views;
      if (topJobPages.length < 5) topJobPages.push({ path, views, users });
    } else {
      // Views are additive (each pageview is independent); activeUsers is
      // not, so "generalUsers" here is per-page, kept only for that display.
      generalViews += views;
      generalUsers += users;
    }
  }

  const [courseUsers, jobUsers] = await Promise.all([
    getGroupActiveUsers(
      propertyId,
      COURSE_PATH_PREFIXES.map((value) => ({
        fieldName: "pagePath",
        stringFilter: { matchType: "BEGINS_WITH" as const, value },
      })),
    ),
    getGroupActiveUsers(propertyId, JOB_PATH_MATCHERS),
  ]);

  return {
    courseViews,
    courseUsers,
    jobViews,
    jobUsers,
    generalViews,
    generalUsers,
    topCoursePages,
    topJobPages,
  };
}

export const getIntentBreakdown = withCache(
  getIntentBreakdownRaw,
  FIVE_MINUTES,
);

export type TimeSeriesPoint = {
  date: string;
  visitors: number;
  pageviews: number;
};

export async function getDailyTimeSeriesRaw(): Promise<TimeSeriesPoint[]> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await runReportSafe({
    property: propertyId,
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
    orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
    limit: 30,
  });

  return (response.rows ?? []).map((row) => {
    const rawDate = row.dimensionValues?.[0]?.value ?? "";
    const month = rawDate.slice(4, 6);
    const day = rawDate.slice(6, 8);
    const formatted = `${day}/${month}`;
    return {
      date: formatted,
      visitors: Number(row.metricValues?.[0]?.value ?? 0),
      pageviews: Number(row.metricValues?.[1]?.value ?? 0),
    };
  });
}

export const getDailyTimeSeries = withCache(
  getDailyTimeSeriesRaw,
  FIVE_MINUTES,
);

export type CenterCityMetric = {
  city: string;
  users: number;
  views: number;
  isMajorNifsHub: boolean;
};

const NIFS_HUB_CITIES = new Set([
  "visakhapatnam",
  "hyderabad",
  "patna",
  "bengaluru",
  "lucknow",
  "delhi",
  "mumbai",
  "chennai",
  "bhubaneswar",
  "kolkata",
  "ahmedabad",
  "pune",
  "indore",
  "vijayawada",
  "guntur",
  "tirupati",
  "nagpur",
  "ranchi",
  "gorakhpur",
  "varanasi",
  "kanpur",
  "raipur",
  "bhopal",
  "coimbatore",
  "surat",
  "jaipur",
]);

export async function getCenterCityBreakdownRaw(): Promise<CenterCityMetric[]> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await runReportSafe({
    property: propertyId,
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "city" }],
    metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    limit: 25,
  });

  return (response.rows ?? [])
    .filter((row) => {
      const city = row.dimensionValues?.[0]?.value ?? "";
      return city && city !== "(not set)" && city.toLowerCase() !== "singapore";
    })
    .map((row) => {
      const city = row.dimensionValues?.[0]?.value ?? "";
      const isMajorNifsHub = NIFS_HUB_CITIES.has(city.toLowerCase());
      return {
        city,
        users: Number(row.metricValues?.[0]?.value ?? 0),
        views: Number(row.metricValues?.[1]?.value ?? 0),
        isMajorNifsHub,
      };
    });
}

export const getCenterCityBreakdown = withCache(
  getCenterCityBreakdownRaw,
  FIVE_MINUTES,
);

export type CourseDemandMetric = {
  path: string;
  name: string;
  category: "Diploma" | "Degree" | "PG Diploma" | "Certificate" | "General";
  views: number;
  users: number;
  avgTimeSeconds: number;
  sharePercent: number;
};

function formatCourseName(path: string): {
  name: string;
  category: CourseDemandMetric["category"];
} {
  const clean = path.replace(/^\/courses\/?/, "").replace(/\/$/, "");
  if (!clean) return { name: "All Courses Overview", category: "General" };

  if (
    clean.includes("advanced-diploma-in-industrial-safety") ||
    clean.includes("adis")
  ) {
    return {
      name: "ADIS (Adv. Diploma in Industrial Safety)",
      category: "Diploma",
    };
  }
  if (clean.includes("diploma-in-fire-safety")) {
    return { name: "Diploma in Fire Safety", category: "Diploma" };
  }
  if (clean.includes("b-sc-honours")) {
    return { name: "B.Sc (Hons) Fire & Industrial Safety", category: "Degree" };
  }
  if (clean.includes("b-sc")) {
    return { name: "B.Sc in Fire & Industrial Safety", category: "Degree" };
  }
  if (clean.includes("pg-diploma-in-health") || clean.includes("pg-dhse")) {
    return {
      name: "PG Diploma in Health, Safety & Env (PG-DHSE)",
      category: "PG Diploma",
    };
  }
  if (clean.includes("pg-diploma-in-fire") || clean.includes("pg-dfs")) {
    return {
      name: "PG Diploma in Fire Safety (PG-DFS)",
      category: "PG Diploma",
    };
  }
  if (clean.includes("advanced-diploma-in-fire") || clean.includes("adfs")) {
    return { name: "ADFS (Adv. Diploma in Fire Safety)", category: "Diploma" };
  }
  if (clean.includes("diploma-in-health-safety")) {
    return {
      name: "Diploma in Health Safety Environment (DHSE)",
      category: "Diploma",
    };
  }
  if (clean.includes("diploma-in-industrial-safety") || clean.includes("dis")) {
    return { name: "Diploma in Industrial Safety (DIS)", category: "Diploma" };
  }
  if (clean.includes("certificate-course-in-fire")) {
    return { name: "Certificate in Fire Safety", category: "Certificate" };
  }
  if (clean.includes("certificate-course-in-construction")) {
    return {
      name: "Certificate in Construction Safety",
      category: "Certificate",
    };
  }
  if (clean.includes("online")) {
    return { name: "Online Safety Programs", category: "General" };
  }
  if (clean.includes("sbtet")) {
    return { name: "Industrial Safety Engineer (SBTET)", category: "Diploma" };
  }

  // fallback formatting
  const formatted = clean
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { name: formatted, category: "Diploma" };
}

export async function getCourseDemandMatrixRaw(): Promise<
  CourseDemandMetric[]
> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await runReportSafe({
    property: propertyId,
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: { matchType: "BEGINS_WITH", value: "/courses" },
      },
    },
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 25,
  });

  const totalCourseViews = (response.rows ?? []).reduce(
    (acc, row) => acc + Number(row.metricValues?.[0]?.value ?? 0),
    0,
  );

  return (response.rows ?? []).map((row) => {
    const path = row.dimensionValues?.[0]?.value ?? "";
    const views = Number(row.metricValues?.[0]?.value ?? 0);
    const users = Number(row.metricValues?.[1]?.value ?? 0);
    const avgTimeSeconds = Math.round(
      Number(row.metricValues?.[2]?.value ?? 0),
    );
    const { name, category } = formatCourseName(path);
    const sharePercent =
      totalCourseViews > 0
        ? Number(((views / totalCourseViews) * 100).toFixed(1))
        : 0;

    return {
      path,
      name,
      category,
      views,
      users,
      avgTimeSeconds,
      sharePercent,
    };
  });
}

export const getCourseDemandMatrix = withCache(
  getCourseDemandMatrixRaw,
  FIVE_MINUTES,
);

export type HourlyTrafficMetric = {
  hour: number;
  label: string;
  users: number;
  views: number;
  isPeakWindow: boolean;
};

export async function getHourlyTrafficRaw(): Promise<HourlyTrafficMetric[]> {
  const propertyId = process.env.GA4_PROPERTY_ID!;
  const [response] = await runReportSafe({
    property: propertyId,
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "hour" }],
    metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
    orderBys: [{ dimension: { dimensionName: "hour" }, desc: false }],
    limit: 24,
  });

  const hourMap = new Map<number, { users: number; views: number }>();
  for (let h = 0; h < 24; h++) {
    hourMap.set(h, { users: 0, views: 0 });
  }

  for (const row of response.rows ?? []) {
    const h = parseInt(row.dimensionValues?.[0]?.value ?? "0", 10);
    const users = Number(row.metricValues?.[0]?.value ?? 0);
    const views = Number(row.metricValues?.[1]?.value ?? 0);
    if (!isNaN(h)) {
      hourMap.set(h, { users, views });
    }
  }

  // "Peak" = the 3 hours with the most measured traffic in the actual data,
  // not a fixed assumption — this describes website traffic only, and says
  // nothing about when calls convert best (no lead-outcome data backs that).
  const topHours = [...hourMap.entries()]
    .sort((a, b) => b[1].users - a[1].users)
    .slice(0, 3)
    .map(([h]) => h);
  const peakHourSet = new Set(topHours);

  const result: HourlyTrafficMetric[] = [];
  for (let h = 0; h < 24; h++) {
    const data = hourMap.get(h) ?? { users: 0, views: 0 };
    const period = h < 12 ? "AM" : "PM";
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const label = `${displayHour} ${period}`;

    result.push({
      hour: h,
      label,
      users: data.users,
      views: data.views,
      isPeakWindow: peakHourSet.has(h),
    });
  }

  return result;
}

export const getHourlyTraffic = withCache(getHourlyTrafficRaw, FIVE_MINUTES);
