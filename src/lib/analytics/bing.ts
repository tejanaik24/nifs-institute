import { withCache, withTimeout, FIVE_MINUTES } from "./cache";

const API_BASE = "https://ssl.bing.com/webmaster/api.svc/json";
const BING_TIMEOUT_MS = 10_000;

type BingTrafficDay = {
  Date: string;
  Clicks: number;
  Impressions: number;
};

export async function getBingTrafficSummaryRaw() {
  const apiKey = process.env.BING_API_KEY!;
  const siteUrl = process.env.BING_SITE_URL!;
  const url = `${API_BASE}/GetRankAndTrafficStats?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;

  const res = await withTimeout(fetch(url), BING_TIMEOUT_MS);
  if (!res.ok) {
    throw new Error(`Bing Webmaster API error: ${res.status}`);
  }
  // Bing wraps every response in an ASP.NET-style { d: [...] } envelope.
  const body = (await res.json()) as { d: BingTrafficDay[] };
  const data = body.d ?? [];

  const last28 = data.slice(-28);
  const totalClicks = last28.reduce((sum, d) => sum + (d.Clicks ?? 0), 0);
  const totalImpressions = last28.reduce((sum, d) => sum + (d.Impressions ?? 0), 0);

  return { totalClicks, totalImpressions, days: last28 };
}

export const getBingTrafficSummary = withCache(getBingTrafficSummaryRaw, FIVE_MINUTES);