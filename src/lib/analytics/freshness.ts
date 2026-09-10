// Freshness metadata for every number shown on the dashboard.
//
// A value is only as good as its recency. Every provider (Realtime GA4,
// Supabase, standard GA4 reports, GSC, Bing) has a different data latency, so
// the dashboard must never present a delayed number as "live".
//
//   live        - provider data is real-time/near-live AND was fetched in time
//   recent      - data exists but the fetched copy is a few minutes old
//   delayed     - provider has inherent lag (standard GA4, GSC, Bing). Never
//                 labelled live, even when just fetched.
//   unavailable - fetch failed, provider is unconfigured, or returned no data.

export type ProviderKind =
  | { kind: "realtime" } // GA4 Realtime API, ~1-5 min latency
  | { kind: "nearlive" } // Supabase enquiry/application counts, near-instant
  | { kind: "delayed" }; // standard GA4 / GSC / Bing reports (hours to days)

export type FreshnessState = "live" | "recent" | "delayed" | "unavailable";

export type DataFreshness = {
  state: FreshnessState;
  source: string;
  metricPeriod: string;
  dataAvailableThrough?: string;
  fetchedAt?: string;
  error?: string;
};

const MAX_LIVE_AGE_MS: Record<"realtime" | "nearlive", number> = {
  realtime: 5 * 60 * 1000, // GA4 realtime fetched <= 5 min ago is still live
  nearlive: 2 * 60 * 1000, // Supabase snapshot <= 2 min old is near-live
};

export function classifyFreshness(
  kind: ProviderKind["kind"],
  fetchedAt: Date,
  opts: { error?: string; source: string; metricPeriod: string; dataAvailableThrough?: string },
): DataFreshness {
  if (opts.error) {
    return {
      state: "unavailable",
      source: opts.source,
      metricPeriod: opts.metricPeriod,
      error: opts.error,
    };
  }
  const base = {
    source: opts.source,
    metricPeriod: opts.metricPeriod,
    dataAvailableThrough: opts.dataAvailableThrough,
    fetchedAt: fetchedAt.toISOString(),
  };
  if (kind === "delayed") {
    return { ...base, state: "delayed" };
  }
  const maxAge = MAX_LIVE_AGE_MS[kind];
  const stale = Date.now() - fetchedAt.getTime() > maxAge;
  return { ...base, state: stale ? "recent" : "live" };
}

// Convenience wrapper: classify a fetch that already failed by throwing.
export function unavailableFreshness(
  source: string,
  metricPeriod: string,
  error: unknown,
): DataFreshness {
  return {
    state: "unavailable",
    source,
    metricPeriod,
    error: error instanceof Error ? error.message : "No data available.",
  };
}