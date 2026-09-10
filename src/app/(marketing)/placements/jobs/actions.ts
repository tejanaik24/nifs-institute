"use server";

import { createJobApplication, getJobApplicationsByPhone, getJobById } from "@/lib/db/jobs";
import { uploadApplicantResume } from "@/lib/storage/images";
import { normalizePhone } from "@/lib/phone";

const DUPLICATE_WINDOW_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

export async function submitApplicationAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  try {
    const jobId = Number(formData.get("jobId"));
    if (!jobId) {
      return { error: "Invalid job posting." };
    }

    const job = await getJobById(jobId);
    if (!job || job.status !== "open") {
      return { error: "This job posting is no longer accepting applications." };
    }

    const applicantName = String(formData.get("applicantName") ?? "").trim();
    const applicantPhone = normalizePhone(String(formData.get("applicantPhone") ?? "").trim());
    const rawPosId = formData.get("positionId");
    const positionId = rawPosId ? Number(rawPosId) : null;

    if (!applicantName || !applicantPhone) {
      return { error: "Please provide your Name and Phone Number." };
    }

    const digits = applicantPhone.replace(/\D/g, "");
    if (digits.length < 10) {
      return { error: "Please enter a valid 10-digit mobile number." };
    }
    if (digits.length > 10) {
      return { error: "Please enter a valid 10-digit mobile number." };
    }

    if (positionId && !job.positions.some((p) => p.id === positionId)) {
      return { error: "Please select a valid position for this posting." };
    }

    const phone = applicantPhone.slice(-10);

    const recent = await getJobApplicationsByPhone(
      jobId,
      phone,
      new Date(Date.now() - RATE_LIMIT_WINDOW_MS),
    );
    if (recent.length > 0) {
      return { error: "Your application was already received. Please wait a minute before trying again." };
    }

    const duplicates = await getJobApplicationsByPhone(
      jobId,
      phone,
      new Date(Date.now() - DUPLICATE_WINDOW_MS),
    );
    if (duplicates.length > 0) {
      return { error: "This number has already applied for this job posting." };
    }

    let resumeUrl = "";
    const resumeFile = formData.get("resume") as File | null;
    if (resumeFile && resumeFile.size > 0 && resumeFile.name) {
      try {
        resumeUrl = await uploadApplicantResume(resumeFile);
      } catch (uploadErr) {
        return {
          error: uploadErr instanceof Error ? uploadErr.message : "Failed to upload resume file.",
        };
      }
    }

    await createJobApplication({
      jobId,
      positionId: positionId || (job.positions.length === 1 ? job.positions[0]?.id : null),
      applicantName,
      applicantPhone: phone,
      resumeUrl,
    });

    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Submission failed. Please try again.",
    };
  }
}
