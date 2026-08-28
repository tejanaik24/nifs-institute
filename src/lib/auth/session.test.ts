import { describe, it, expect, beforeAll } from "vitest";
import { createSessionToken, verifySessionToken } from "./session";

beforeAll(() => {
  process.env.SESSION_SECRET = "test-secret-at-least-32-bytes-long-xxxx";
});

describe("session tokens", () => {
  it("round-trips a userId through a signed token", async () => {
    const token = await createSessionToken(42);
    const result = await verifySessionToken(token);
    expect(result?.userId).toBe(42);
  });

  it("rejects a tampered token", async () => {
    const token = await createSessionToken(42);
    const tampered = token.slice(0, -2) + "xx";
    const result = await verifySessionToken(tampered);
    expect(result).toBeNull();
  });
});
