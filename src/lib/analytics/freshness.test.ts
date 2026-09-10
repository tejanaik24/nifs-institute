import { describe, expect, it } from "vitest";
import { classifyFreshness, unavailableFreshness } from "./freshness";

const now = Date.now();

describe("classifyFreshness", () => {
  it("labels freshly-fetched realtime data as live", () => {
    expect(
      classifyFreshness("realtime", new Date(now - 60_000), {
        source: "ga4-realtime",
        metricPeriod: "last 60 min",
      }).state,
    ).toBe("live");
  });

  it("labels a stale nearlive snapshot as recent", () => {
    expect(
      classifyFreshness("nearlive", new Date(now - 10 * 60_000), {
        source: "supabase",
        metricPeriod: "last 7 days",
      }).state,
    ).toBe("recent");
  });

  it("never labels provider-delayed data as live", () => {
    expect(
      classifyFreshness("delayed", new Date(now - 5_000), {
        source: "ga4-standard",
        metricPeriod: "yesterday",
      }).state,
    ).toBe("delayed");
  });

  it("marks erroring fetches as unavailable and keeps the error message", () => {
    const freshness = classifyFreshness("realtime", new Date(now - 5_000), {
      source: "ga4-realtime",
      metricPeriod: "last 60 min",
      error: "quota exceeded",
    });
    expect(freshness.state).toBe("unavailable");
    expect(freshness.error).toBe("quota exceeded");
  });
});

describe("unavailableFreshness", () => {
  it("normalizes an unknown error into a stable message", () => {
    const freshness = unavailableFreshness("bing", "last 28 days", { weird: true });
    expect(freshness.state).toBe("unavailable");
    expect(freshness.error).toBe("No data available.");
  });
});