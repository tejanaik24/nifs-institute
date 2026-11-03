import { unstable_cache } from "next/cache";

// Cache for analytics API calls. GA4/GSC/Bing data moves on a daily/hourly
// basis — re-fetching it on every dashboard load makes pages wait on 10+
// external API round-trips (~2s cold). Uses Next's data cache, not process
// memory: on Vercel every new/cold server instance used to start with an empty
// in-memory cache, so the dashboard was randomly slow. After `ttlMs` the stale
// value is still served instantly while a fresh one is fetched in the
// background. Real-time fetches (e.g. the "right now" badge) do NOT use this.

/** Wraps an async function so calls within `ttlMs` reuse the result. `key`
 * must be unique per wrapped function; args are part of the key. Results must
 * be JSON-serializable (no Map/Date). */
export function withCache<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  ttlMs: number,
  key: string,
): (...args: TArgs) => Promise<TResult> {
  return unstable_cache(fn, ["analytics", key], { revalidate: Math.round(ttlMs / 1000) });
}

export const FIVE_MINUTES = 5 * 60 * 1000;

/** Bounds an async call so a hung upstream (GA4/GSC/Bing API) can never stall
 * a dashboard render. On timeout the promise rejects but the underlying call
 * keeps running — with withCache it will simply populate the cache, so the
 * next request gets fresh data instead of throwing again. */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Timed out after ${ms}ms`)),
      ms,
    );
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}