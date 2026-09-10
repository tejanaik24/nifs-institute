import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/jobs", () => ({
  getJobById: vi.fn(),
  getJobApplicationsByPhone: vi.fn(),
  createJobApplication: vi.fn(),
}));

vi.mock("@/lib/storage/images", () => ({
  uploadApplicantResume: vi.fn(),
}));

vi.mock("@/lib/phone", () => ({
  normalizePhone: (v: string) =>
    v
      .replace(/\D/g, "")
      .replace(/^(?:0091|91|0)(?=\d{10}$)/, ""),
}));

import type { JobWithPositions } from "@/lib/db/jobs";
import {
  createJobApplication,
  getJobApplicationsByPhone,
  getJobById,
} from "@/lib/db/jobs";
import { uploadApplicantResume } from "@/lib/storage/images";
import { submitApplicationAction } from "./actions";

const openJob = {
  id: 1,
  slug: "fire-officer-drive",
  status: "open",
  companyName: "SafeCorp",
  positions: [{ id: 5, designation: "Fire Officer", vacancies: 2 }],
} as unknown as JobWithPositions;

function form(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  fd.append("jobId", "1");
  fd.append("applicantName", "Ravi Kumar");
  fd.append("applicantPhone", "+91 98480 12345");
  for (const [k, v] of Object.entries(overrides)) {
    if (v === null) fd.delete(k);
    else fd.set(k, v);
  }
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getJobById).mockResolvedValue(openJob);
  vi.mocked(getJobApplicationsByPhone).mockResolvedValue([]);
  vi.mocked(uploadApplicantResume).mockResolvedValue(
    "https://cdn/secure/resume.pdf",
  );
});

describe("submitApplicationAction", () => {
  it("rejects when the job does not exist", async () => {
    vi.mocked(getJobById).mockResolvedValue(null);
    const res = await submitApplicationAction(form());
    expect(res.error).toMatch(/no longer accepting/i);
  });

  it("rejects applications for a closed job", async () => {
    vi.mocked(getJobById).mockResolvedValue({
      ...openJob,
      status: "closed",
    });
    const res = await submitApplicationAction(form());
    expect(res.error).toMatch(/no longer accepting/i);
  });

  it("rejects a phone number with fewer than 10 digits", async () => {
    const res = await submitApplicationAction(
      form({ applicantPhone: "+91 98480" }),
    );
    expect(res.error).toMatch(/10-digit/);
  });

  it("rejects a position that does not belong to the job", async () => {
    const res = await submitApplicationAction(form({ positionId: "999" }));
    expect(res.error).toMatch(/valid position/i);
    expect(createJobApplication).not.toHaveBeenCalled();
  });

  it("rate-limits a repeated submit from the same number within a minute", async () => {
    vi.mocked(getJobApplicationsByPhone)
      .mockResolvedValueOnce([{ id: 9 }] as never[])
      .mockResolvedValueOnce([]);
    const res = await submitApplicationAction(form({ positionId: "5" }));
    expect(res.error).toMatch(/wait a minute/i);
    expect(createJobApplication).not.toHaveBeenCalled();
  });

  it("rejects a duplicate application within 30 days", async () => {
    vi.mocked(getJobApplicationsByPhone).mockResolvedValue([
      { id: 9 },
    ] as never[]);
    const res = await submitApplicationAction(form({ positionId: "5" }));
    expect(res.error).toMatch(/already applied/i);
    expect(createJobApplication).not.toHaveBeenCalled();
  });

  it("propagates resume file validation errors", async () => {
    vi.mocked(uploadApplicantResume).mockRejectedValue(
      new Error("Only PDF, DOC, DOCX, JPG, or PNG files are allowed for resumes."),
    );
    const fd = form({ positionId: "5" });
    fd.append("resume", new File(["x"], "cv.txt", { type: "text/plain" }));
    const res = await submitApplicationAction(fd);
    expect(res.error).toMatch(/Only PDF/);
    expect(createJobApplication).not.toHaveBeenCalled();
  });

  it("stores the normalized last-10 digits and succeeds", async () => {
    const fd = form({ positionId: "5", applicantPhone: "0091 98480 12345" });
    const res = await submitApplicationAction(fd);
    expect(res.success).toBe(true);
    expect(createJobApplication).toHaveBeenCalledWith(
      expect.objectContaining({
        jobId: 1,
        positionId: 5,
        applicantName: "Ravi Kumar",
        applicantPhone: "9848012345",
      }),
    );
    expect(uploadApplicantResume).not.toHaveBeenCalled();
  });
});