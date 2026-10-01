import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { centerApplications } from "@/lib/db/schema";
import { centerApplicationSchema, type CenterApplicationValues } from "@/lib/center-application";

export { centerApplicationSchema, type CenterApplicationValues };

const DIRECTOR_EMAIL = "director@nifsindia.com";
const HEADOFFICE_EMAIL = "headoffice@nifsindia.com";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as unknown;
  const parsed = centerApplicationSchema.safeParse(body);

  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message ?? "Invalid application data";
    return NextResponse.json({ ok: false, error: errorMsg }, { status: 400 });
  }

  const data = parsed.data;

  // Split location into city and state if comma present, otherwise store location in city
  const locParts = data.location.split(",");
  const city = locParts[0]?.trim() || data.location;
  const state = locParts.slice(1).join(",").trim() || "";

  try {
    // 1. Permanently store in PostgreSQL (nifs.center_applications)
    const [inserted] = await db
      .insert(centerApplications)
      .values({
        name: data.name,
        phone: data.phone,
        email: data.email,
        city: city,
        state: state,
        profession: "",
        carpetArea: "",
        investmentCapacity: "",
        timeline: "",
        message: data.message || "",
        status: "new",
      })
      .returning({ id: centerApplications.id, createdAt: centerApplications.createdAt });

    const appId = inserted ? `NIFS-CTR-${String(inserted.id).padStart(5, "0")}` : "NIFS-CTR-PENDING";

    // 2. Dispatch / divert notification to the Director's email (director@nifsindia.com)
    try {
      const emailPayload = {
        _subject: `New Training Center Application: ${data.location} — [${data.name}] (${appId})`,
        _replyto: data.email,
        _cc: HEADOFFICE_EMAIL,
        "Application ID": appId,
        "Applicant Name": data.name,
        "Proposed Location": data.location,
        "Contact Number": data.phone,
        "Email Address": data.email,
        "Additional Details / Message": data.message || "None provided",
        "Submission Timestamp": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        "Directed To": `Office of the Director, NIFS India (${DIRECTOR_EMAIL})`,
      };

      // FormSubmit forwarder to director mail address
      fetch(`https://formsubmit.co/ajax/${DIRECTOR_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(emailPayload),
      }).catch((e) => {
        console.warn("Director mail forward notice:", e);
      });
    } catch (mailErr) {
      console.warn("Mail dispatch error:", mailErr);
    }

    return NextResponse.json({
      ok: true,
      applicationId: appId,
      directorEmail: DIRECTOR_EMAIL,
      message: "Application registered and forwarded to the Director's Office successfully",
    });
  } catch (dbErr) {
    console.error("Failed to store center application:", dbErr);
    return NextResponse.json(
      { ok: false, error: "Failed to record center application. Please retry or contact director@nifsindia.com directly." },
      { status: 500 }
    );
  }
}
