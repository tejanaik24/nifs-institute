import { JobForm } from "@/components/dashboard/job-form";
import { getAllCompanyLogos } from "@/lib/db/company-logos";
import { getSession } from "@/lib/auth/session";

export default async function NewJobPage() {
  const [logos, session] = await Promise.all([getAllCompanyLogos(), getSession()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-[var(--dash-text)]">New Job Posting</h1>
        <p className="text-sm text-[var(--dash-text-muted)]">
          Create a new corporate recruitment posting with flyer and positions.
        </p>
      </div>

      <JobForm companyLogos={logos} isAdmin={session?.role === "admin"} />
    </div>
  );
}
