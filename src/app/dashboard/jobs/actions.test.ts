import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));
vi.mock("@/lib/auth/session", () => ({ getSession: vi.fn() }));
vi.mock("@/lib/db/jobs", () => ({
  createJob: vi.fn(),
  updateJob: vi.fn(),
  publishJob: vi.fn(),
  closeJob: vi.fn(),
  deleteJob: vi.fn(),
}));
vi.mock("@/lib/db/company-logos", () => ({
  getAllCompanyLogos: vi.fn(),
  createCompanyLogo: vi.fn(),
}));
vi.mock("@/lib/storage/images", () => ({
  uploadJobPoster: vi.fn(),
  uploadCompanyLogo: vi.fn(),
}));
vi.mock("@/lib/seo/notify-search", () => ({
  jobUrl: (slug: string) => `https://nifsindia.net/placements/jobs/${slug}/`,
  notifySearchEngines: vi.fn(),
}));

import { getSession } from "@/lib/auth/session";
import { closeJob, publishJob } from "@/lib/db/jobs";
import { notifySearchEngines } from "@/lib/seo/notify-search";
import {
  addCompanyLogoAction,
  closeJobAction,
  publishJobByIdAction,
  uploadJobPosterAction,
} from "./actions";

const authed = { userId: 1 } as any;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("job dashboard action auth guards", () => {
  it("blocks uploadJobPosterAction without a session", async () => {
    vi.mocked(getSession).mockResolvedValue(null);
    const res = await uploadJobPosterAction(new FormData());
    expect(res.error).toBe("You must be logged in to manage jobs.");
  });

  it("blocks addCompanyLogoAction without a session", async () => {
    vi.mocked(getSession).mockResolvedValue(null);
    const res = await addCompanyLogoAction(new FormData());
    expect(res.error).toBe("You must be logged in to manage jobs.");
  });

  it("redirects to /login on closeJobAction without a session", async () => {
    vi.mocked(getSession).mockResolvedValue(null);
    await expect(closeJobAction(1)).rejects.toThrow("NEXT_REDIRECT");
    expect(closeJob).not.toHaveBeenCalled();
  });

  it("redirects to /login on publishJobByIdAction without a session", async () => {
    vi.mocked(getSession).mockResolvedValue(null);
    await expect(publishJobByIdAction(1)).rejects.toThrow("NEXT_REDIRECT");
    expect(publishJob).not.toHaveBeenCalled();
  });

  it("tells search engines when an admin publishes or closes a job", async () => {
    vi.mocked(getSession).mockResolvedValue({ userId: 1, role: "admin" } as any);
    vi.mocked(publishJob).mockResolvedValue({ slug: "acme-1" } as any);
    vi.mocked(closeJob).mockResolvedValue({ slug: "acme-1" } as any);
    await expect(publishJobByIdAction(1)).rejects.toThrow("NEXT_REDIRECT");
    await expect(closeJobAction(1)).rejects.toThrow("NEXT_REDIRECT");
    expect(notifySearchEngines).toHaveBeenCalledTimes(2);
    expect(notifySearchEngines).toHaveBeenCalledWith(
      "https://nifsindia.net/placements/jobs/acme-1/",
    );
  });

  it("proceeds with an authenticated upload", async () => {
    vi.mocked(getSession).mockResolvedValue(authed);
    const { uploadJobPoster } = await import("@/lib/storage/images");
    vi.mocked(uploadJobPoster).mockResolvedValue("https://cdn/poster.jpg");
    const fd = new FormData();
    fd.append("file", new File(["img"], "poster.jpg", { type: "image/jpeg" }));
    const res = await uploadJobPosterAction(fd);
    expect(res.url).toBe("https://cdn/poster.jpg");
  });
});