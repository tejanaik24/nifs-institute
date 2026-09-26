import { AnalyticsDashboardView } from "@/components/dashboard/analytics-view";
import { getBingTrafficSummary } from "@/lib/analytics/bing";
import {
  getAgeBreakdown,
  getBrowserBreakdown,
  getCenterCityBreakdown,
  getCountries,
  getCourseDemandMatrix,
  getDailySummary,
  getDailyTimeSeries,
  getDeviceBreakdown,
  getHourlyTraffic,
  getIntentBreakdown,
  getRegions,
  getTrafficSources,
} from "@/lib/analytics/ga4";
import { getKeywordGaps, getSiteTotals, getTopQueries } from "@/lib/analytics/gsc";
import { getAeoGeoHealth } from "@/lib/analytics/health";
import { NIFS_TARGET_KEYWORDS } from "@/lib/analytics/target-keywords";
import { getBotHitSummary } from "@/lib/db/bot-hits";
import { db } from "@/lib/db/client";
import { enquiries, whatsappClicks } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export const revalidate = 3600; // daily-granularity data — refresh hourly, not per-request

async function safe<T>(
  promise: Promise<T>,
): Promise<{ ok: boolean; data?: T; error?: string }> {
  try {
    return { ok: true, data: await promise };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unavailable" };
  }
}

export default async function AnalyticsPage() {
  const [
    summary,
    queries,
    siteTotals,
    keywordGaps,
    bing,
    botHits,
    health,
    trafficSources,
    countries,
    regions,
    devices,
    browsers,
    ageBrackets,
    intent,
    timeSeries,
    centerCities,
    courseMatrix,
    hourlyTraffic,
    enquiryCount,
    whatsappClickCount,
  ] = await Promise.all([
    safe(getDailySummary()),
    safe(getTopQueries()),
    safe(getSiteTotals()),
    safe(getKeywordGaps(NIFS_TARGET_KEYWORDS)),
    safe(getBingTrafficSummary()),
    safe(getBotHitSummary()),
    safe(getAeoGeoHealth()),
    safe(getTrafficSources()),
    safe(getCountries()),
    safe(getRegions()),
    safe(getDeviceBreakdown()),
    safe(getBrowserBreakdown()),
    safe(getAgeBreakdown()),
    safe(getIntentBreakdown()),
    safe(getDailyTimeSeries()),
    safe(getCenterCityBreakdown()),
    safe(getCourseDemandMatrix()),
    safe(getHourlyTraffic()),
    safe(
      db
        .select({
          n: sql<number>`(count(distinct phone) filter (where status = 'submitted'))::int`,
        })
        .from(enquiries)
        .then((r) => r[0]?.n ?? 0),
    ),
    safe(
      db
        .select({ n: sql<number>`count(*)::int` })
        .from(whatsappClicks)
        .then((r) => r[0]?.n ?? 0),
    ),
  ]);
  const fetchedAt = new Date().toISOString();

  return (
    <AnalyticsDashboardView
      fetchedAt={fetchedAt}
      enquiryCount={enquiryCount.ok ? enquiryCount.data : undefined}
      whatsappClickCount={whatsappClickCount.ok ? whatsappClickCount.data : undefined}
      summary={summary}
      queries={queries}
      siteTotals={siteTotals}
      keywordGaps={keywordGaps}
      bing={bing}
      botHits={botHits}
      health={health}
      trafficSources={trafficSources}
      countries={countries}
      regions={regions}
      devices={devices}
      browsers={browsers}
      ageBrackets={ageBrackets}
      intent={intent}
      timeSeries={timeSeries}
      centerCities={centerCities}
      courseMatrix={courseMatrix}
      hourlyTraffic={hourlyTraffic}
    />
  );
}
