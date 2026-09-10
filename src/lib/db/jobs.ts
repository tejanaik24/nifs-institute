import { and, asc, desc, eq, gt, isNull } from "drizzle-orm";
import { db } from "./client";
import { jobApplications, jobPositions, jobs, users } from "./schema";

export type JobPositionInput = {
  id?: number;
  designation: string;
  vacancies: number;
  qualification?: string;
  experience?: string;
  salary?: string;
  sortOrder?: number;
};

export type JobInput = {
  companyName: string;
  clientCompany?: string;
  clientLogoUrl?: string;
  location: string;
  languages?: string;
  otherBenefits?: string;
  applyByDate?: Date | null;
  posterImageUrl?: string;
  placementOfficerName?: string;
  officerEmail?: string;
  contactEmail?: string;
  contactPhone?: string;
  additionalNotice?: string;
  status?: "draft" | "open" | "closed";
  createdByUserId?: number | null;
  positions?: JobPositionInput[];
};

export type JobWithPositions = typeof jobs.$inferSelect & {
  positions: (typeof jobPositions.$inferSelect)[];
  totalVacancies?: number;
};

export function jobSlugify(
  company: string,
  clientCompany?: string | null,
  location?: string | null,
  idOrCode?: string | number | null,
): string {
  const parts = [company, clientCompany, location, idOrCode].filter(Boolean);
  return parts
    .join(" ")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getAllJobs(): Promise<JobWithPositions[]> {
  const allJobs = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  if (allJobs.length === 0) return [];

  const allPositions = await db
    .select()
    .from(jobPositions)
    .orderBy(asc(jobPositions.sortOrder), asc(jobPositions.id));

  const positionsByJob = new Map<number, (typeof jobPositions.$inferSelect)[]>();
  for (const pos of allPositions) {
    const list = positionsByJob.get(pos.jobId) ?? [];
    list.push(pos);
    positionsByJob.set(pos.jobId, list);
  }

  return allJobs.map((j) => {
    const posList = positionsByJob.get(j.id) ?? [];
    return {
      ...j,
      positions: posList,
      totalVacancies: posList.reduce((acc, p) => acc + (p.vacancies || 0), 0),
    };
  });
}

export async function getOpenJobs(): Promise<JobWithPositions[]> {
  const openJobsList = await db
    .select()
    .from(jobs)
    .where(eq(jobs.status, "open"))
    .orderBy(desc(jobs.createdAt));
  if (openJobsList.length === 0) return [];

  const allPositions = await db
    .select()
    .from(jobPositions)
    .orderBy(asc(jobPositions.sortOrder), asc(jobPositions.id));

  const positionsByJob = new Map<number, (typeof jobPositions.$inferSelect)[]>();
  for (const pos of allPositions) {
    const list = positionsByJob.get(pos.jobId) ?? [];
    list.push(pos);
    positionsByJob.set(pos.jobId, list);
  }

  return openJobsList.map((j) => {
    const posList = positionsByJob.get(j.id) ?? [];
    return {
      ...j,
      positions: posList,
      totalVacancies: posList.reduce((acc, p) => acc + (p.vacancies || 0), 0),
    };
  });
}

export async function getJobById(id: number): Promise<JobWithPositions | null> {
  const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  if (!job) return null;

  const positions = await db
    .select()
    .from(jobPositions)
    .where(eq(jobPositions.jobId, id))
    .orderBy(asc(jobPositions.sortOrder), asc(jobPositions.id));

  return {
    ...job,
    positions,
    totalVacancies: positions.reduce((acc, p) => acc + (p.vacancies || 0), 0),
  };
}

export async function getJobBySlug(slug: string): Promise<JobWithPositions | null> {
  const [job] = await db.select().from(jobs).where(eq(jobs.slug, slug)).limit(1);
  if (!job) return null;

  const positions = await db
    .select()
    .from(jobPositions)
    .where(eq(jobPositions.jobId, job.id))
    .orderBy(asc(jobPositions.sortOrder), asc(jobPositions.id));

  return {
    ...job,
    positions,
    totalVacancies: positions.reduce((acc, p) => acc + (p.vacancies || 0), 0),
  };
}

export async function createJob(data: JobInput): Promise<JobWithPositions> {
  const initialSlug = jobSlugify(data.companyName, data.clientCompany, data.location, `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);

  const [created] = await db
    .insert(jobs)
    .values({
      companyName: data.companyName,
      clientCompany: data.clientCompany ?? "",
      clientLogoUrl: data.clientLogoUrl ?? "",
      location: data.location,
      slug: initialSlug,
      languages: data.languages ?? "",
      otherBenefits: data.otherBenefits ?? "",
      applyByDate: data.applyByDate,
      posterImageUrl: data.posterImageUrl ?? "",
      placementOfficerName: data.placementOfficerName ?? "",
      officerEmail: data.officerEmail ?? "",
      contactEmail: data.contactEmail ?? "",
      contactPhone: data.contactPhone ?? "",
      additionalNotice: data.additionalNotice ?? "",
      status: data.status ?? "draft",
      publishedAt: data.status === "open" ? new Date() : null,
      createdByUserId: data.createdByUserId,
    })
    .returning();

  const jobCode = `NIFS-${created.id}`;
  const finalSlug = jobSlugify(data.companyName, data.clientCompany, data.location, created.id);

  const [updated] = await db
    .update(jobs)
    .set({ jobCode, slug: finalSlug })
    .where(eq(jobs.id, created.id))
    .returning();

  let createdPositions: (typeof jobPositions.$inferSelect)[] = [];
  if (data.positions && data.positions.length > 0) {
    createdPositions = await db
      .insert(jobPositions)
      .values(
        data.positions.map((p, idx) => ({
          jobId: updated.id,
          designation: p.designation,
          vacancies: Number(p.vacancies) || 1,
          qualification: p.qualification ?? "",
          experience: p.experience ?? "",
          salary: p.salary ?? "",
          sortOrder: p.sortOrder ?? idx,
        })),
      )
      .returning();
  }

  return {
    ...updated,
    positions: createdPositions,
    totalVacancies: createdPositions.reduce(
      (acc, p) => acc + (p.vacancies || 0),
      0,
    ),
  };
}

export async function updateJob(
  id: number,
  data: Partial<JobInput>,
): Promise<JobWithPositions | null> {
  const existing = await getJobById(id);
  if (!existing) return null;

  const companyName = data.companyName ?? existing.companyName;
  const clientCompany = data.clientCompany ?? existing.clientCompany;
  const location = data.location ?? existing.location;
  const slug = jobSlugify(companyName, clientCompany, location, id);

  await db
    .update(jobs)
    .set({
      ...(data.companyName !== undefined && { companyName: data.companyName }),
      ...(data.clientCompany !== undefined && {
        clientCompany: data.clientCompany,
      }),
      ...(data.clientLogoUrl !== undefined && {
        clientLogoUrl: data.clientLogoUrl,
      }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.languages !== undefined && { languages: data.languages }),
      ...(data.otherBenefits !== undefined && {
        otherBenefits: data.otherBenefits,
      }),
      ...(data.applyByDate !== undefined && { applyByDate: data.applyByDate }),
      ...(data.posterImageUrl !== undefined && {
        posterImageUrl: data.posterImageUrl,
      }),
      ...(data.placementOfficerName !== undefined && {
        placementOfficerName: data.placementOfficerName,
      }),
      ...(data.officerEmail !== undefined && { officerEmail: data.officerEmail }),
      ...(data.contactEmail !== undefined && { contactEmail: data.contactEmail }),
      ...(data.contactPhone !== undefined && { contactPhone: data.contactPhone }),
      ...(data.additionalNotice !== undefined && {
        additionalNotice: data.additionalNotice,
      }),
      ...(data.status !== undefined && {
        status: data.status,
        publishedAt:
          data.status === "open" && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
      }),
      slug,
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, id));

  if (data.positions) {
    await db.delete(jobPositions).where(eq(jobPositions.jobId, id));
    if (data.positions.length > 0) {
      await db.insert(jobPositions).values(
        data.positions.map((p, idx) => ({
          jobId: id,
          designation: p.designation,
          vacancies: Number(p.vacancies) || 1,
          qualification: p.qualification ?? "",
          experience: p.experience ?? "",
          salary: p.salary ?? "",
          sortOrder: p.sortOrder ?? idx,
        })),
      );
    }
  }

  return getJobById(id);
}

export async function publishJob(id: number) {
  const rows = await db
    .update(jobs)
    .set({ status: "open", publishedAt: new Date(), updatedAt: new Date() })
    .where(eq(jobs.id, id))
    .returning();
  return rows[0];
}

export async function closeJob(id: number) {
  const rows = await db
    .update(jobs)
    .set({ status: "closed", updatedAt: new Date() })
    .where(eq(jobs.id, id))
    .returning();
  return rows[0];
}

export async function deleteJob(id: number) {
  await db.delete(jobApplications).where(eq(jobApplications.jobId, id));
  await db.delete(jobPositions).where(eq(jobPositions.jobId, id));
  await db.delete(jobs).where(eq(jobs.id, id));
}

export type ApplicationInput = {
  jobId: number;
  positionId?: number | null;
  applicantName: string;
  applicantPhone: string;
  resumeUrl?: string;
};

export async function createJobApplication(data: ApplicationInput) {
  const [app] = await db
    .insert(jobApplications)
    .values({
      jobId: data.jobId,
      positionId: data.positionId ?? null,
      applicantName: data.applicantName,
      applicantPhone: data.applicantPhone,
      resumeUrl: data.resumeUrl ?? "",
    })
    .returning();
  return app;
}

export async function getJobApplicationsByPhone(jobId: number, phone: string, since: Date) {
  return db
    .select({ id: jobApplications.id, createdAt: jobApplications.createdAt })
    .from(jobApplications)
    .where(
      and(
        eq(jobApplications.jobId, jobId),
        eq(jobApplications.applicantPhone, phone),
        gt(jobApplications.createdAt, since),
      ),
    );
}

export async function getAllApplications() {
  const rows = await db
    .select({
      id: jobApplications.id,
      jobId: jobApplications.jobId,
      positionId: jobApplications.positionId,
      applicantName: jobApplications.applicantName,
      applicantPhone: jobApplications.applicantPhone,
      resumeUrl: jobApplications.resumeUrl,
      openedByUserId: jobApplications.openedByUserId,
      openedAt: jobApplications.openedAt,
      createdAt: jobApplications.createdAt,
      jobCode: jobs.jobCode,
      companyName: jobs.companyName,
      clientCompany: jobs.clientCompany,
      jobSlug: jobs.slug,
      positionTitle: jobPositions.designation,
      openedByName: users.name,
      openedByEmail: users.email,
    })
    .from(jobApplications)
    .leftJoin(jobs, eq(jobApplications.jobId, jobs.id))
    .leftJoin(jobPositions, eq(jobApplications.positionId, jobPositions.id))
    .leftJoin(users, eq(jobApplications.openedByUserId, users.id))
    .orderBy(desc(jobApplications.createdAt));

  return rows;
}

export async function getApplicationById(id: number) {
  const [row] = await db
    .select({
      id: jobApplications.id,
      jobId: jobApplications.jobId,
      positionId: jobApplications.positionId,
      applicantName: jobApplications.applicantName,
      applicantPhone: jobApplications.applicantPhone,
      resumeUrl: jobApplications.resumeUrl,
      openedByUserId: jobApplications.openedByUserId,
      openedAt: jobApplications.openedAt,
      createdAt: jobApplications.createdAt,
      jobCode: jobs.jobCode,
      companyName: jobs.companyName,
      clientCompany: jobs.clientCompany,
      jobSlug: jobs.slug,
      positionTitle: jobPositions.designation,
      openedByName: users.name,
      openedByEmail: users.email,
    })
    .from(jobApplications)
    .leftJoin(jobs, eq(jobApplications.jobId, jobs.id))
    .leftJoin(jobPositions, eq(jobApplications.positionId, jobPositions.id))
    .leftJoin(users, eq(jobApplications.openedByUserId, users.id))
    .where(eq(jobApplications.id, id))
    .limit(1);

  return row ?? null;
}

export async function markApplicationOpened(id: number, userId: number) {
  const rows = await db
    .update(jobApplications)
    .set({
      openedByUserId: userId,
      openedAt: new Date(),
    })
    .where(
      and(eq(jobApplications.id, id), isNull(jobApplications.openedByUserId)),
    )
    .returning();

  return rows[0] ?? null;
}
