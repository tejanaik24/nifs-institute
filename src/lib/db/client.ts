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
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  _db = drizzle(pool, { schema });
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle<typeof schema>>];
  },
});
