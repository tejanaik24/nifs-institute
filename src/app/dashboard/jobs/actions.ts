"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import {
  createJob,
  updateJob,
  publishJob,
  closeJob,
  deleteJob,
  JobPositionInput,
} from "@/lib/db/jobs";
import { uploadJobPoster, uploadCompanyLogo } from "@/lib/storage/images";
import { getAllCompanyLogos, createCompanyLogo } from "@/lib/db/company-logos";

export async function uploadJobPosterAction(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { error: "You must be logged in to manage jobs." };
  }
  try {
    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
      return { error: "No file selected." };
    }
    const url = await uploadJobPoster(file);
    return { url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed." };
  }
}

export async function getCompanyLogosAction() {
  return getAllCompanyLogos();
}

export async function addCompanyLogoAction(
  formData: FormData
): Promise<{ name?: string; url?: string; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { error: "You must be logged in to manage jobs." };
  }
  try {
    const name = String(formData.get("name") ?? "").trim();
    const file = formData.get("file") as File;
    if (!name) return { error: "Company name is required." };
    if (!file || file.size === 0) return { error: "No logo file selected." };

    const url = await uploadCompanyLogo(file);
    const saved = await createCompanyLogo(name, url);
    return { name: saved.name, url: saved.logoUrl };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to save logo." };
  }
}

export type JobFormData = {
  companyName: string;
  clientCompany?: string;
  clientLogoUrl?: string;
  location: string;
  languages?: string;
  otherBenefits?: string;
  applyByDate?: string | null;
  posterImageUrl?: string;
  placementOfficerName?: string;
  officerEmail?: string;
  contactEmail?: string;
  contactPhone?: string;
  additionalNotice?: string;
  positions: JobPositionInput[];
};

export async function saveJobAction(
  id: number | null,
  data: JobFormData,
  publish: boolean = false
): Promise<{ error?: string; success?: boolean; id?: number; redirectUrl?: string }> {
  const session = await getSession();
  if (!session) {
    return { error: "You must be logged in to manage jobs." };
  }

  if (!data.companyName.trim() || !data.location.trim()) {
    return { error: "Company name and Location are required." };
  }

  const cleanPositions: JobPositionInput[] = (data.positions || []).map((p, idx) => ({
    designation: (p.designation || "").trim(),
    vacancies: Number(p.vacancies) || 1,
    qualification: (p.qualification || "").trim(),
    experience: (p.experience || "").trim(),
    salary: (p.salary || "").trim(),
    sortOrder: idx,
  }));

  if (publish) {
    if (session.role !== "admin") {
      return { error: "Unauthorized: Only administrators can publish job postings." };
    }
    if (cleanPositions.length === 0) {
      return { error: "At least one position is required to publish a job posting." };
    }
    const invalid = cleanPositions.some((p) => !p.designation);
    if (invalid) {
      return { error: "Every position must have a designation." };
    }
  }

  const applyBy = data.applyByDate ? new Date(data.applyByDate) : null;

  if (id) {
    const updated = await updateJob(id, {
      companyName: data.companyName.trim(),
      clientCompany: (data.clientCompany || "").trim(),
      clientLogoUrl: data.clientLogoUrl || "",
      location: data.location.trim(),
      languages: (data.languages || "").trim(),
      otherBenefits: (data.otherBenefits || "").trim(),
      applyByDate: applyBy,
      posterImageUrl: data.posterImageUrl || "",
      placementOfficerName: (data.placementOfficerName || "").trim(),
      officerEmail: (data.officerEmail || "").trim(),
      contactEmail: (data.contactEmail || "").trim(),
      contactPhone: (data.contactPhone || "").trim(),
      additionalNotice: (data.additionalNotice || "").trim(),
      status: publish ? "open" : undefined,
      positions: cleanPositions,
    });
    revalidatePath("/placements");
    revalidatePath("/dashboard/jobs");
    if (updated) {
      revalidatePath(`/placements/jobs/${updated.slug}`);
    }
    return { success: true, id, redirectUrl: "/dashboard/jobs" };
  } else {
    const created = await createJob({
      companyName: data.companyName.trim(),
      clientCompany: (data.clientCompany || "").trim(),
      clientLogoUrl: data.clientLogoUrl || "",
      location: data.location.trim(),
      languages: (data.languages || "").trim(),
      otherBenefits: (data.otherBenefits || "").trim(),
      applyByDate: applyBy,
      posterImageUrl: data.posterImageUrl || "",
      placementOfficerName: (data.placementOfficerName || session.name || "").trim(),
      officerEmail: (data.officerEmail || "").trim(),
      contactEmail: (data.contactEmail || "").trim(),
      contactPhone: (data.contactPhone || "").trim(),
      additionalNotice: (data.additionalNotice || "").trim(),
      status: publish ? "open" : "draft",
      createdByUserId: session.userId,
      positions: cleanPositions,
    });
    revalidatePath("/placements");
    revalidatePath("/dashboard/jobs");
    return { success: true, id: created.id, redirectUrl: "/dashboard/jobs" };
  }
}

export async function closeJobAction(id: number) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.role !== "admin") {
    throw new Error("Unauthorized: Only administrators can close job postings.");
  }
  await closeJob(id);
  revalidatePath("/placements");
  revalidatePath("/dashboard/jobs");
  redirect("/dashboard/jobs");
}

export async function publishJobByIdAction(id: number) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.role !== "admin") {
    throw new Error("Unauthorized: Only administrators can publish job postings.");
  }
  await publishJob(id);
  revalidatePath("/placements");
  revalidatePath("/dashboard/jobs");
  redirect("/dashboard/jobs");
}

export async function deleteJobAction(id: number) {
  const session = await getSession();
  if (session?.role !== "admin") {
    throw new Error("Unauthorized: Only administrators can delete job postings.");
  }
  await deleteJob(id);
  revalidatePath("/placements");
  revalidatePath("/dashboard/jobs");
  redirect("/dashboard/jobs");
}
