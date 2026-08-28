import { desc } from "drizzle-orm";
import { db } from "./client";
import { agentActions } from "./schema";

export async function logAgentAction(entry: {
  toolName: string;
  args: unknown;
  result?: unknown;
  error?: string;
}) {
  await db.insert(agentActions).values({
    toolName: entry.toolName,
    args: entry.args,
    result: entry.result ?? null,
    error: entry.error ?? null,
  });
}

export async function getRecentAgentActions(limit = 50) {
  return db.select().from(agentActions).orderBy(desc(agentActions.createdAt)).limit(limit);
}
