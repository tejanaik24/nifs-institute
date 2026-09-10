import { describe, expect, it } from "vitest";
import { uploadApplicantResume } from "./images";

describe("uploadApplicantResume file validation", () => {
  it("rejects a disallowed file type before any upload", async () => {
    const file = new File(["x"], "cv.txt", { type: "text/plain" });
    await expect(uploadApplicantResume(file)).rejects.toThrow(
      /Only PDF, DOC, DOCX, JPG, or PNG/,
    );
  });

  it("rejects an oversized resume before any upload", async () => {
    const file = new File([new ArrayBuffer(11 * 1024 * 1024)], "cv.pdf", {
      type: "application/pdf",
    });
    await expect(uploadApplicantResume(file)).rejects.toThrow(/too large/);
  });

  it("passes validation and reaches the storage client (unconfigured here)", async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    const file = new File(["x"], "cv.pdf", { type: "application/pdf" });
    await expect(uploadApplicantResume(file)).rejects.toThrow(
      /SUPABASE_URL \/ SUPABASE_SERVICE_ROLE_KEY/,
    );
  });
});