import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { abroadEnquiries } from "@/lib/db/schema";
import { getRequestLocation } from "@/lib/geo";

export const ALLOWED_ABROAD_COURSES = [
  "Diploma - Advance Diploma in Industrial Safety",
  "B.Sc. - Honors (Fire and Industrial Safety)",
] as const;

export const abroadEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name (at least 2 characters)")
    .max(100, "Keep your name under 100 characters"),
  contactNo: z
    .string()
    .trim()
    .min(7, "Enter a valid international contact number")
    .max(35, "Contact number is too long")
    .regex(/^[+\d\s().-]+$/, "Enter a valid contact number with country code"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(200, "Email is too long")
    .pipe(z.email("Enter a valid email address")),
  country: z
    .string()
    .trim()
    .min(2, "Enter your country of residence")
    .max(100, "Keep country name under 100 characters"),
  state: z
    .string()
    .trim()
    .min(2, "Enter your state or province")
    .max(100, "Keep state name under 100 characters"),
  city: z
    .string()
    .trim()
    .max(100, "Keep city name under 100 characters")
    .optional(),
  course: z.enum(ALLOWED_ABROAD_COURSES, {
    error: "Select one of the two sanctioned courses",
  }),
});

export type AbroadEnquiryValues = z.infer<typeof abroadEnquirySchema>;

const SII_PORTAL_URL = "https://studyinindia.gov.in/Courses/ViewCoursesDetails";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as unknown;
  const parsed = abroadEnquirySchema.safeParse(body);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid submission data";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { name, contactNo, email, country, state, city, course } = parsed.data;
  const edgeGeo = getRequestLocation(request);
  const locationCombined = [city, state, country].filter(Boolean).join(", ");

  try {
    await db.insert(abroadEnquiries).values({
      name,
      phone: contactNo,
      email,
      country,
      state,
      city: city || edgeGeo.city || "",
      location: locationCombined,
      course,
    });
  } catch (err: unknown) {
    try {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS nifs.abroad_enquiries (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          phone VARCHAR(35) NOT NULL,
          email TEXT NOT NULL,
          country TEXT NOT NULL DEFAULT '',
          state TEXT NOT NULL DEFAULT '',
          city TEXT DEFAULT '',
          location TEXT DEFAULT '',
          course TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `);

      await db.execute(sql`
        ALTER TABLE nifs.abroad_enquiries ADD COLUMN IF NOT EXISTS country TEXT DEFAULT '';
        ALTER TABLE nifs.abroad_enquiries ADD COLUMN IF NOT EXISTS state TEXT DEFAULT '';
        ALTER TABLE nifs.abroad_enquiries ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '';
      `);

      await db.insert(abroadEnquiries).values({
        name,
        phone: contactNo,
        email,
        country,
        state,
        city: city || edgeGeo.city || "",
        location: locationCombined,
        course,
      });
    } catch (fallbackErr) {
      console.error("[abroad-enquiry] Failed to persist to database:", fallbackErr || err);
    }
  }

  return NextResponse.json({
    ok: true,
    redirectUrl: SII_PORTAL_URL,
  });
}

