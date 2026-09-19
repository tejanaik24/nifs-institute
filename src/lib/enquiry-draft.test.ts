import { describe, expect, it } from "vitest";
import { isDraftWorthy } from "./enquiry-draft";

describe("isDraftWorthy", () => {
  it.each([
    ["Teja", "9876543210"],
    ["Jo", "+91 98765 43210"],
    ["A Very Long Name Here", "09876543210"],
  ])("accepts name=%s phone=%s", (name, phone) => {
    expect(isDraftWorthy(name, phone)).toBe(true);
  });

  it.each([
    ["", "9876543210"],
    ["T", "9876543210"],
    ["Teja", ""],
    ["Teja", "98765"],
    ["Teja", "abcdefghij"],
  ])("rejects name=%s phone=%s", (name, phone) => {
    expect(isDraftWorthy(name, phone)).toBe(false);
  });
});
