import { getAllApplications } from "@/lib/db/jobs";
import { ApplicationsManager } from "@/components/dashboard/applications-manager";

export default async function ApplicationsPage() {
  const applications = await getAllApplications();

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-[var(--dash-text)]">Job Applications</h1>
        <p className="text-sm text-[var(--dash-text-muted)]">
          Review candidates who applied for open positions across all recruitment drives.
        </p>
      </div>

      <ApplicationsManager applications={applications} />
    </div>
  );
}
