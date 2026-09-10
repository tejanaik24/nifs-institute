import { beforeAll, describe, expect, it } from "vitest";
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

  it("round-trips user payload with name, role and email", async () => {
    const token = await createSessionToken({
      userId: 1,
      name: "Kusuma",
      email: "vyzmaai@nifsindia.net",
      role: "admin",
    });
    const result = await verifySessionToken(token);
    expect(result?.userId).toBe(1);
    expect(result?.name).toBe("Kusuma");
    expect(result?.email).toBe("vyzmaai@nifsindia.net");
    expect(result?.role).toBe("admin");
  });

  it("rejects a tampered token", async () => {
    const token = await createSessionToken(42);
    const tampered = token.slice(0, -2) + "xx";
    const result = await verifySessionToken(tampered);
    expect(result).toBeNull();
  });
});
