import { describe, expect, it } from "vitest";
import { getRequestLocation } from "./geo";

describe("getRequestLocation", () => {
  it("decodes well-formed city and state headers", () => {
    const mockRequest = {
      headers: {
        get: (name: string) => {
          if (name === "x-vercel-ip-city") return "San%20Francisco";
          if (name === "x-vercel-ip-country-region") return "CA";
          return null;
        },
      },
    };
    const result = getRequestLocation(mockRequest as any);
    expect(result).toEqual({ city: "San Francisco", state: "CA" });
  });

  it("returns empty strings when both headers are absent", () => {
    const mockRequest = {
      headers: {
        get: () => null,
      },
    };
    const result = getRequestLocation(mockRequest as any);
    expect(result).toEqual({ city: "", state: "" });
  });

  it("falls back to raw city value on malformed percent sequence without throwing", () => {
    const mockRequest = {
      headers: {
        get: (name: string) => {
          if (name === "x-vercel-ip-city") return "%";
          if (name === "x-vercel-ip-country-region") return "XX";
          return null;
        },
      },
    };
    const result = getRequestLocation(mockRequest as any);
    expect(result).toEqual({ city: "%", state: "XX" });
  });

  it("falls back to raw city value on malformed hex sequence without throwing", () => {
    const mockRequest = {
      headers: {
        get: (name: string) => {
          if (name === "x-vercel-ip-city") return "%zz";
          if (name === "x-vercel-ip-country-region") return "";
          return null;
        },
      },
    };
    const result = getRequestLocation(mockRequest as any);
    expect(result).toEqual({ city: "%zz", state: "" });
  });
});
