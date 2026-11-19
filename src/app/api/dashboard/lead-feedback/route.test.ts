import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("../../../../lib/auth/session", () => ({
  getSession: vi.fn(),
  verifySessionToken: vi.fn(),
}));

vi.mock("../../../../lib/db/schema", () => ({
  leadFeedback: {},
}));

vi.mock("../../../../lib/db/client", () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn().mockResolvedValue([
          {
            id: 1,
            enquiryId: 101,
            outcome: "Interested",
            reason: null,
            note: "Looking for fire course",
            staffName: "Priya",
            createdAt: new Date(),
          },
        ]),
      })),
    })),
  },
}));

import { getSession } from "../../../../lib/auth/session";
import { POST } from "./route";

describe("POST /api/dashboard/lead-feedback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when no session is present", async () => {
    vi.mocked(getSession).mockResolvedValue(null);
    const req = new NextRequest("http://localhost/api/dashboard/lead-feedback", {
      method: "POST",
      body: JSON.stringify({
        enquiryId: 101,
        outcome: "Interested",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Unauthorized");
  });

  it("returns 400 when outcome is invalid", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: 1,
      name: "Counsellor",
      role: "staff",
    });

    const req = new NextRequest("http://localhost/api/dashboard/lead-feedback", {
      method: "POST",
      body: JSON.stringify({
        enquiryId: 101,
        outcome: "NotAValidOutcome",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid payload");
  });

  it("returns 400 when reason is invalid", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: 1,
      name: "Counsellor",
      role: "staff",
    });

    const req = new NextRequest("http://localhost/api/dashboard/lead-feedback", {
      method: "POST",
      body: JSON.stringify({
        enquiryId: 101,
        outcome: "Not interested",
        reason: "Unknown invalid reason",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when note exceeds 300 characters", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: 1,
      name: "Counsellor",
      role: "staff",
    });

    const req = new NextRequest("http://localhost/api/dashboard/lead-feedback", {
      method: "POST",
      body: JSON.stringify({
        enquiryId: 101,
        outcome: "Interested",
        note: "x".repeat(301),
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 200 with saved feedback on valid payload", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: 1,
      name: "Priya",
      role: "staff",
    });

    const req = new NextRequest("http://localhost/api/dashboard/lead-feedback", {
      method: "POST",
      body: JSON.stringify({
        enquiryId: 101,
        outcome: "Interested",
        note: "Looking for fire course",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.feedback.outcome).toBe("Interested");
    expect(json.feedback.staffName).toBe("Priya");
  });
});
