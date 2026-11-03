import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Lazily initialized so importing this module (e.g. from a page that hasn't
// been reached yet) never crashes the whole app just because DATABASE_URL
// isn't set yet — only the first real query throws, with a clear message.
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDb() {
  if (_db) return _db;
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set — connect a database before using this feature.");
  }
  // The DB host (VPS) sometimes silently drops a new TCP connection (~1 in 12
  // measured 2026-11-03). With no connect timeout one dropped connect hung a
  // whole dashboard page 21s+ (the OS limit). Fail fast and retry instead —
  // safe for writes too, since a connect timeout means nothing was sent.
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 4000,
    idleTimeoutMillis: 60_000, // keep warm connections → fewer new connects
    keepAlive: true,
  });
  const query = pool.query.bind(pool) as (...args: unknown[]) => Promise<unknown>;
  pool.query = (async (...args: unknown[]) => {
    for (let attempt = 1; ; attempt++) {
      try {
        return await query(...args);
      } catch (e) {
        if (attempt >= 3 || !/timeout exceeded when trying to connect|connection timeout/i.test(String((e as Error)?.message))) throw e;
      }
    }
  }) as typeof pool.query;
  _db = drizzle(pool, { schema });
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle<typeof schema>>];
  },
});
