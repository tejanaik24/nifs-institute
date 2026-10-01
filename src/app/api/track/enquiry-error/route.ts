import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiryErrors } from "@/lib/db/schema";

const REASONS = new Set(["validation", "delivery"]);

// Fire-and-forget target for the enquiry form — records why a submit failed
// (field names for validation errors, timeout/network/http status for
// delivery errors). Never stores names or numbers, and a failure here must
// never surface to the visitor.
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { reason?: unknown; detail?: unknown; pagePath?: unknown }
    | null;
  const reason = typeof body?.reason === "string" ? body.reason : "";
  if (!REASONS.has(reason)) {
    return NextResponse.json({ error: "invalid reason" }, { status: 400 });
  }
  const detail = typeof body?.detail === "string" ? body.detail.slice(0, 200) : "";
  const pagePath = typeof body?.pagePath === "string" ? body.pagePath.slice(0, 300) : "";
  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 200);
  try {
    await db.insert(enquiryErrors).values({ reason, detail, pagePath, userAgent });
  } catch {
    // Trigger-enforced rate limit (see migrations/enquiry-errors.sql) — a
    // clean 429 instead of an unhandled 500; the client ignores non-2xx.
    return NextResponse.json({ error: "rate limit reached" }, { status: 429 });
  }
  return NextResponse.json({ ok: true });
}
