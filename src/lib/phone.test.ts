import { describe, expect, it } from "vitest";
import { normalizePhone } from "./phone";

describe("normalizePhone", () => {
  it("keeps a plain 10-digit number", () => {
    expect(normalizePhone("9876543210")).toBe("9876543210");
  });
  it("strips +91 and 0091 prefixes", () => {
    expect(normalizePhone("+91 98765 43210")).toBe("9876543210");
    expect(normalizePhone("0091-9876543210")).toBe("9876543210");
    expect(normalizePhone("919876543210")).toBe("9876543210");
  });
  it("strips a leading 0 for 11-digit Indian numbers", () => {
    expect(normalizePhone("09876543210")).toBe("9876543210");
  });
  it("leaves short and non-Indian numbers as their raw digit run", () => {
    expect(normalizePhone("123")).toBe("123");
    expect(normalizePhone("+1 (202) 555-0100")).toBe("12025550100");
  });
});