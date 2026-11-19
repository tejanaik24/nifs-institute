import { NextRequest, NextResponse } from "next/server";
import { getSession, verifySessionToken } from "../../../../lib/auth/session";
import { db } from "../../../../lib/db/client";
import { leadFeedback } from "../../../../lib/db/schema";
import { leadFeedbackInputSchema } from "../../../../lib/lead-feedback";

export async function POST(request: NextRequest) {
  // Check session via getSession helper, with fallback to request cookie for test/edge environments
  let session = await getSession();
  if (!session) {
    const token = request.cookies.get("nifs_session")?.value;
    if (token) {
      session = await verifySessionToken(token);
    }
  }

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = leadFeedbackInputSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.issues },
      { status: 400 },
    );
  }

  const { enquiryId, outcome, reason, note } = parsed.data;
  const staffName = session.name?.trim() || session.email || "Staff";

  try {
    const [inserted] = await db
      .insert(leadFeedback)
      .values({
        enquiryId,
        outcome,
        reason: reason || null,
        note: note ? note.trim() : null,
        staffName,
      })
      .returning();

    return NextResponse.json({ ok: true, feedback: inserted });
  } catch (error) {
    console.error("Failed to save lead feedback:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 },
    );
  }
}
