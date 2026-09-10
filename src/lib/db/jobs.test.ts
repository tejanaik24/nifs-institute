import { describe, it, expect } from "vitest";
import { jobSlugify } from "./jobs";

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
