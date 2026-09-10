// Short-TTL in-memory cache for analytics API calls. GA4/GSC/Bing data moves
// on a daily/hourly basis — re-fetching it on every dashboard load makes
// Content/Analytics pages wait on 10+ external API round-trips per click, so
// we cache each result for 5 minutes instead. Real-time fetches (e.g. the
// "right now" badge) do NOT use this.
async function cached<T>(cache: Map<string, { expiresAt: number; value: unknown }>, key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && hit.expiresAt > Date.now()) return hit.value as T;
  const value = await fn();
  cache.set(key, { expiresAt: Date.now() + ttlMs, value });
  return value;
}

/** Wraps an async function so repeated calls within `ttlMs` reuse the result.
 * Each wrapped function keeps its own cache, so no-arg calls can never clash
 * across different functions; args are part of the key within that function. */
export function withCache<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  ttlMs: number,
): (...args: TArgs) => Promise<TResult> {
  const cache = new Map<string, { expiresAt: number; value: unknown }>();
  return (...args: TArgs) => cached(cache, JSON.stringify(args), ttlMs, () => fn(...args));
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