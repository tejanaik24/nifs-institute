import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name (at least 2 characters)").max(100, "Keep your name under 100 characters"),
  phone: z.string().trim()
    .regex(/^[+\d\s()-]+$/, "Enter a valid mobile number")
    .transform((value) => value.replace(/[\s()-]/g, "").replace(/^(?:\+91|0091|91)(?=\d{10}$)/, "").replace(/^0(?=\d{10}$)/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number; +91 is also accepted")),
  course: z.string().trim().max(200, "Keep the course name under 200 characters").optional(),
});

export type EnquiryValues = z.output<typeof enquirySchema>;

export async function submitEnquiry(values: EnquiryValues): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(values),
    });
    if (!response.ok) throw new Error("Enquiry was not accepted");
  } finally {
    clearTimeout(timeout);
  }
}

type EnquiryEvent = "enquiry_start" | "enquiry_attempt" | "enquiry_error" | "enquiry_accepted" | "enquiry_whatsapp_click";

// Only fixed labels go to analytics. Never send names, numbers or free-text fields.
export function trackEnquiry(event: EnquiryEvent, reason?: "validation" | "delivery") {
  try {
    const analytics = window as Window & { dataLayer?: unknown[] };
    analytics.dataLayer = analytics.dataLayer || [];
    const params = { form_id: "nifs_enquiry", ...(reason ? { error_type: reason } : {}) };
    // gtag consumes an arguments object; queue safely even before its lazy script loads.
    function enqueue(...args: unknown[]) {
      void args;
      // gtag requires this array-like command format, not a normal array.
      // eslint-disable-next-line prefer-rest-params
      analytics.dataLayer!.push(arguments);
    }
    enqueue("event", event, params);
  } catch {
    // Analytics must never interrupt a callback request.
  }
}
