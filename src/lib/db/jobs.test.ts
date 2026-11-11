import { describe, it, expect } from "vitest";
import { isJobClosed, jobSlugify, parseIstDateTime } from "./jobs";

describe("jobSlugify", () => {
  it("formats standard company, location, and id into slug", () => {
    const slug = jobSlugify("NIFS/IFESM", "AMNS", "Nakkapalli, Andhra Pradesh", 42);
    expect(slug).toBe("nifs-ifesm-amns-nakkapalli-andhra-pradesh-42");
  });

  it("handles missing client company gracefully", () => {
    const slug = jobSlugify("Adani Safety", "", "Visakhapatnam", 101);
    expect(slug).toBe("adani-safety-visakhapatnam-101");
  });

  it("trims and strips non-alphanumeric characters", () => {
    const slug = jobSlugify("L&T Construction (EPC)", undefined, "Chennai - Port", "NIFS-5");
    expect(slug).toBe("l-t-construction-epc-chennai-port-nifs-5");
  });
});

describe("job deadlines", () => {
  it("reads dashboard datetime-local values as IST", () => {
    expect(parseIstDateTime("2026-11-11T14:00").toISOString()).toBe("2026-11-11T08:30:00.000Z");
    expect(parseIstDateTime("2026-11-11T14:00:00Z").toISOString()).toBe("2026-11-11T14:00:00.000Z");
  });

  it("treats a passed deadline as closed even when status is open", () => {
    expect(isJobClosed({ status: "open", applyByDate: new Date(Date.now() - 1000) })).toBe(true);
    expect(isJobClosed({ status: "open", applyByDate: new Date(Date.now() + 60000) })).toBe(false);
    expect(isJobClosed({ status: "open", applyByDate: null })).toBe(false);
    expect(isJobClosed({ status: "closed", applyByDate: null })).toBe(true);
  });
});
