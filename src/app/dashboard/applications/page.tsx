import { getAllApplications } from "@/lib/db/jobs";
import { ApplicationsManager } from "@/components/dashboard/applications-manager";
import { ExportButton } from "@/components/dashboard/export-button";

const exportCols = [
  { key: "applicantName", label: "Candidate Name" },
  { key: "applicantPhone", label: "Phone" },
  { key: "jobCode", label: "Job Code" },
  { key: "positionTitle", label: "Position" },
  { key: "companyName", label: "Hiring Company" },
  { key: "clientCompany", label: "Client" },
  { key: "resumeUrl", label: "Resume Link" },
  { key: "reviewStatus", label: "Review Status" },
  { key: "dateApplied", label: "Date Applied" },
];

export default async function ApplicationsPage() {
  const applications = await getAllApplications();

  // Pre-format data server-side — no functions cross the Server→Client boundary
  const exportData = applications.map((a) => ({
    applicantName: a.applicantName ?? "",
    applicantPhone: a.applicantPhone ?? "",
    jobCode: a.jobCode ?? "",
    positionTitle: a.positionTitle ?? "",
    companyName: a.companyName ?? "",
    clientCompany: a.clientCompany ?? "",
    resumeUrl: a.resumeUrl ?? "",
    reviewStatus: a.openedAt ? "Reviewed" : "New",
    dateApplied: a.createdAt
      ? new Date(a.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : "",
  }));

  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--dash-text)]">
            Job Applications
          </h1>
          <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
            {applications.length} candidate applications across all recruitment drives
          </p>
        </div>
        <ExportButton
          data={exportData}
          filename="nifs-job-applications"
          columns={exportCols}
          label="Export to Excel / CSV"
        />
      </div>

      <ApplicationsManager applications={applications} />
    </div>
  );
}

