import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { placementLeads } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/enquiry";

const schema = z.object({
  name: enquirySchema.shape.name,
  phone: enquirySchema.shape.phone,
  email: z.string().trim().toLowerCase().max(200, "Email is too long").pipe(z.email("Enter a valid email address")),
  location: z.string().trim().min(2, "Enter your city or location").max(120, "Keep the location under 120 characters"),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter your date of birth")
    .refine((v) => {
      const t = Date.parse(v);
      return t < Date.now() && t > Date.parse("1940-01-01");
    }, "Enter a valid date of birth"),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid details" }, { status: 400 });
  try {
    // Same person submitting twice just refreshes their details.
    await db
      .insert(placementLeads)
      .values(parsed.data)
      .onConflictDoUpdate({ target: [placementLeads.phone, placementLeads.email], set: { name: parsed.data.name, dob: parsed.data.dob, location: parsed.data.location } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save right now. Please try again." }, { status: 500 });
  }
}
