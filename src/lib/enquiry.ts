import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name (at least 2 characters)").max(100, "Keep your name under 100 characters"),
  phone: z.string().trim()
    .regex(/^[+\d\s()-]+$/, "Enter a valid mobile number")
    .transform((value) => value.replace(/[\s()-]/g, "").replace(/^(?:\+91|0091|91)(?=\d{10}$)/, "").replace(/^0(?=\d{10}$)/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number; +91 is also accepted")),
  course: z.string().trim().max(200, "Keep the course name under 200 characters").optional(),
  pagePath: z.string().trim().max(500, "Keep page path under 500 characters").optional(),
});

export type EnquiryValues = z.output<typeof enquirySchema>;

export async function submitEnquiry(values: EnquiryValues, draftId?: number, draftToken?: string, pagePath?: string): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const resolvedPagePath = pagePath ?? values.pagePath ?? (typeof window !== "undefined" ? window.location.pathname : undefined);
  try {
    const payload = {
      ...values,
      ...(resolvedPagePath ? { pagePath: resolvedPagePath } : {}),
      ...(draftId && draftToken ? { draftId, draftToken } : {}),
    };
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`http_${response.status}`);
    const ack = (await response.json().catch(() => null)) as { ok?: unknown } | null;
    if (!ack || ack.ok !== true) throw new Error("Enquiry was not accepted");
  } finally {
    clearTimeout(timeout);
  }
}

type EnquiryEvent = "enquiry_start" | "enquiry_attempt" | "enquiry_error" | "enquiry_accepted" | "enquiry_whatsapp_click" | "enquiry_phone_click";

// Only fixed labels go to analytics. Never send names, numbers or free-text fields.
export function trackEnquiry(event: EnquiryEvent, reason?: "validation" | "delivery") {
  trackEvent(event, { form_id: "nifs_enquiry", ...(reason ? { error_type: reason } : {}) });
}

/** Records WHY a submit failed in our own DB (migrations/enquiry-errors.sql),
 * because GA4's error_type needs a registered custom dimension to be readable.
 * Fire-and-forget; `detail` must be field names or a short failure code, never
 * what the visitor typed. */
export function logEnquiryFailure(reason: "validation" | "delivery", detail: string) {
  try {
    void fetch("/api/track/enquiry-error/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, detail, pagePath: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Logging must never interrupt the real action.
  }
}

/** Short failure code for a thrown submit error: timeout, network or the HTTP status. */
export function describeSubmitError(error: unknown): string {
  if (error instanceof DOMException && error.name === "AbortError") return "timeout";
  if (error instanceof TypeError) return "network";
  return error instanceof Error ? error.message.slice(0, 60) : "unknown";
}

/** Pushes a GA4 event into the dataLayer. Fixed labels only — callers must
 * never pass user-entered free text (names, numbers, resumes). */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  try {
    const analytics = window as Window & { dataLayer?: unknown[] };
    analytics.dataLayer = analytics.dataLayer || [];
    // gtag consumes an arguments object; queue safely even before its lazy script loads.
    function enqueue(...args: unknown[]) {
      void args;
      // gtag requires this array-like command format, not a normal array.
      // eslint-disable-next-line prefer-rest-params
      analytics.dataLayer!.push(arguments);
    }
    enqueue("event", event, params);
  } catch {
    // Analytics must never interrupt the real action.
  }
}
