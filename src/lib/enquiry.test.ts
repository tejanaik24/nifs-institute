import { afterEach, describe, expect, it, vi } from "vitest";
import { enquirySchema, submitEnquiry, trackEnquiry } from "./enquiry";

const values = { name: "Test Applicant", phone: "9876543210", course: "DFS" };
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("enquiry validation", () => {
  it.each(["9876543210", "+91 98765 43210", "0091-9876543210", "919876543210", "09876543210"])("accepts and normalizes %s", (phone) => {
    expect(enquirySchema.parse({ ...values, phone }).phone).toBe("9876543210");
  });
  it.each(["abcdefghij", "1234567890", "987654321", "98765432100", "9876543210abc", "++919876543210"])("rejects %s", (phone) => {
    expect(enquirySchema.safeParse({ ...values, phone }).success).toBe(false);
  });
  it("rejects whitespace-only names and allows an omitted course", () => {
    expect(enquirySchema.safeParse({ ...values, name: "  " }).success).toBe(false);
    expect(enquirySchema.parse({ name: " Teja ", phone: values.phone }).name).toBe("Teja");
  });
});

describe("delivery acknowledgement", () => {
  it.each([true])("accepts only explicit boolean acknowledgement %s", async (responseData) => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: responseData }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(submitEnquiry(values)).resolves.toBeUndefined();
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject(values);
  });
  it.each(["true", false, "false", undefined, "yes"])("rejects HTTP 200 without a true boolean acknowledgement: %s", async (responseData) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: responseData }), { status: 200 })));
    await expect(submitEnquiry(values)).rejects.toThrow();
  });
  it("rejects HTTP 200 with a malformed or missing body", async () => {
    const mock = vi.fn()
      .mockResolvedValueOnce(new Response("<html>error</html>"))
      .mockResolvedValueOnce(new Response("unavailable", { status: 200 }));
    vi.stubGlobal("fetch", mock);
    for (let i = 0; i < 2; i++) await expect(submitEnquiry(values)).rejects.toThrow();
  });
  it("rejects server errors, invalid JSON and network failures", async () => {
    const mock = vi.fn()
      .mockResolvedValueOnce(new Response("unavailable", { status: 503 }))
      .mockResolvedValueOnce(new Response("<html>error</html>"))
      .mockRejectedValueOnce(new TypeError("Failed to fetch"));
    vi.stubGlobal("fetch", mock);
    for (let i = 0; i < 3; i++) await expect(submitEnquiry(values)).rejects.toThrow();
  });
  it("does not finish while delivery is pending", async () => {
    let finish!: (response: Response) => void;
    vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>((resolve) => { finish = resolve; })));
    let accepted = false;
    const request = submitEnquiry(values).then(() => { accepted = true; });
    await Promise.resolve();
    expect(accepted).toBe(false);
    finish(new Response('{"ok":true}'));
    await request;
    expect(accepted).toBe(true);
  });
  it("aborts a stalled request after 15 seconds", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn((_url, options) => new Promise((_resolve, reject) => {
      options.signal.addEventListener("abort", () => reject(new Error("Timeout")));
    })));
    const request = expect(submitEnquiry(values)).rejects.toThrow("Timeout");
    await vi.advanceTimersByTimeAsync(15000);
    await request;
  });
});

describe("measurement", () => {
  it("queues fixed-label events before analytics loads without personal data", () => {
    const target: { dataLayer?: IArguments[] } = {};
    vi.stubGlobal("window", target);
    trackEnquiry("enquiry_accepted");
    expect(Array.from(target.dataLayer![0])).toEqual(["event", "enquiry_accepted", { form_id: "nifs_enquiry" }]);
    expect(JSON.stringify(target)).not.toContain(values.phone);
  });
  it("does not break enquiries when analytics is unavailable", () => {
    vi.stubGlobal("window", { get dataLayer() { throw new Error("blocked"); } });
    expect(() => trackEnquiry("enquiry_start")).not.toThrow();
  });
});
