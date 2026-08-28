import fs from "node:fs";
import path from "node:path";
import { db } from "@/lib/db/client";
import { posts } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import robots from "@/app/robots";

export type HealthCheck = { label: string; pass: boolean; detail: string };

/** Real, verifiable AEO/GEO/AI-readiness checks — no invented "score". Each
 * item is either true or false against something actually on disk or in the
 * database, so this can never drift into a fabricated number. */
export async function getAeoGeoHealth(): Promise<HealthCheck[]> {
  const publicDir = path.join(process.cwd(), "public");
  const llmsTxtExists = fs.existsSync(path.join(publicDir, "llms.txt"));

  const [faqStats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      withFaqs: sql<number>`count(*) filter (where jsonb_array_length(faqs) > 0)::int`,
    })
    .from(posts);

  const faqCoveragePct = faqStats.total > 0 ? Math.round((faqStats.withFaqs / faqStats.total) * 100) : 0;

  const robotsRules = robots().rules;
  const rulesArray = Array.isArray(robotsRules) ? robotsRules : [robotsRules];
  const expectedBots = ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot"];
  const allowedBots = rulesArray.flatMap((rule) =>
    Array.isArray(rule.userAgent) ? rule.userAgent : rule.userAgent ? [rule.userAgent] : []
  );
  const aiBotsAllowed = expectedBots.every((bot) => allowedBots.includes(bot));

  return [
    {
      label: "llms.txt present",
      pass: llmsTxtExists,
      detail: llmsTxtExists ? "Generated at build time (scripts/generate-llms-full.js)" : "Missing",
    },
    {
      label: "FAQ schema coverage",
      pass: faqCoveragePct >= 50,
      detail: `${faqStats.withFaqs} of ${faqStats.total} posts (${faqCoveragePct}%) have FAQ schema for Google's PAA/rich snippets`,
    },
    {
      label: "AI crawlers explicitly allowed",
      pass: aiBotsAllowed,
      detail: aiBotsAllowed
        ? "robots.txt allows GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot"
        : "One or more AI crawlers missing from robots.txt allow list",
    },
  ];
}
