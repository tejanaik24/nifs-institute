import { notFound } from "next/navigation";
import { getJobById } from "@/lib/db/jobs";
import { JobForm } from "@/components/dashboard/job-form";
import { getAllCompanyLogos } from "@/lib/db/company-logos";
import { getSession } from "@/lib/auth/session";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(Number(id));
  if (!job) notFound();

  const [logos, session] = await Promise.all([getAllCompanyLogos(), getSession()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-[var(--dash-text)]">
          Edit Job Posting: {job.companyName}
        </h1>
        <p className="text-sm text-[var(--dash-text-muted)]">
          Job Code: <span className="font-mono font-semibold text-[var(--dash-accent)]">{job.jobCode || `NIFS-${job.id}`}</span>
        </p>
      </div>

      <JobForm initialJob={job} companyLogos={logos} isAdmin={session?.role === "admin"} />
    </div>
  );
}
