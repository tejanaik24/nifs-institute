import { gte, sql } from "drizzle-orm";
import { db } from "./client";
import { botHits } from "./schema";

export async function getBotHitSummary(days = 28) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const rows = await db
    .select({
      botName: botHits.botName,
      count: sql<number>`count(*)::int`,
    })
    .from(botHits)
    .where(gte(botHits.createdAt, since))
    .groupBy(botHits.botName)
    .orderBy(sql`count(*) desc`);

  return rows;
}
