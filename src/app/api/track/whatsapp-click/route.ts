import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { whatsappClicks } from "@/lib/db/schema";

// Fire-and-forget target for WhatsAppClickTracker — logs a click on any
// wa.me link anywhere on the site. Never blocks the WhatsApp link itself
// from opening, so a failure here must never surface to the visitor.
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { pagePath?: unknown; linkLabel?: unknown }
    | null;
  const pagePath = typeof body?.pagePath === "string" ? body.pagePath : "";
  if (!pagePath) {
    return NextResponse.json({ error: "pagePath is required" }, { status: 400 });
  }
  const linkLabel = typeof body?.linkLabel === "string" ? body.linkLabel.slice(0, 200) : "";
  await db.insert(whatsappClicks).values({ pagePath: pagePath.slice(0, 500), linkLabel });
  return NextResponse.json({ ok: true });
}
