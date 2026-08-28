import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { botHits } from "@/lib/db/schema";
import { AI_BOTS, INTERNAL_HEADER } from "@/lib/internal-secret";

// Called (fire-and-forget) by middleware.ts whenever a known AI-crawler
// user-agent hits a public page — middleware runs on the Edge runtime, which
// can't talk to Postgres directly, so it posts here instead (a normal Node
// route handler) to do the actual write. Gated by a shared secret so the
// public internet can't inject fake rows into this table directly.
export async function POST(request: NextRequest) {
  if (request.headers.get(INTERNAL_HEADER) !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const { botName, path } = await request.json();
  if (typeof path !== "string" || !AI_BOTS.includes(botName)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  await db.insert(botHits).values({ botName, path });
  return NextResponse.json({ ok: true });
}
