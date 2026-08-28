import { describe, it, expect } from "vitest";
import { slugify } from "./posts";

describe("slugify", () => {
  it("lowercases and hyphenates a title", () => {
    expect(slugify("Top 10 Fire Safety Courses!")).toBe("top-10-fire-safety-courses");
  });

  it("strips repeated and trailing hyphens", () => {
    expect(slugify("  Safety --- Officer  ")).toBe("safety-officer");
  });
});
