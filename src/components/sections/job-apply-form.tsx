"use client";

import { useState } from "react";
import { submitApplicationAction } from "@/app/(marketing)/placements/jobs/actions";
import { trackEvent } from "@/lib/enquiry";
import { JobWithPositions } from "@/lib/db/jobs";
import { CheckCircle2, Upload, AlertCircle, Send } from "lucide-react";

export function JobApplyForm({ job }: { job: JobWithPositions }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const hasMultiplePositions = job.positions.length > 1;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    trackEvent("job_apply_start", { job_id: String(job.id) });

    const formData = new FormData(e.currentTarget);
    formData.append("jobId", String(job.id));

    const res = await submitApplicationAction(formData);
    setSubmitting(false);

    if (res.error) {
      setError(res.error);
      trackEvent("job_apply_error", { job_id: String(job.id) });
    } else {
      setSubmitted(true);
      trackEvent("job_apply_submitted", { job_id: String(job.id) });
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="font-display text-2xl italic text-foreground">
          Application Received
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Thank you for applying to {job.companyName}. Our placement cell and HR coordinators will review your details and reach out to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="mb-6 border-b border-border pb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Fast-Track Application
        </span>
        <h3 className="font-display mt-1 text-2xl italic text-foreground">
          Apply for this drive
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Submit your contact details directly to the NIFS Placement Cell.
        </p>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <AlertCircle size={15} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full Name *
          </label>
          <input
            name="applicantName"
            required
            placeholder="Enter your full name"
            className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Mobile Number *
          </label>
          <input
            name="applicantPhone"
            type="tel"
            required
            placeholder="10-digit mobile number or +91"
            className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {hasMultiplePositions && (
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Select Position *
            </label>
            <select
              name="positionId"
              required
              defaultValue={job.positions[0]?.id}
              className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {job.positions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.designation} ({p.vacancies} {p.vacancies === 1 ? "vacancy" : "vacancies"})
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Resume / CV (Optional)
          </label>
          <label className="flex cursor-pointer items-center justify-between rounded-md border border-dashed border-border bg-muted/20 px-4 py-3 text-xs transition-colors hover:border-primary hover:bg-muted/40">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Upload size={16} className="text-primary" />
              <span>{fileName || "Upload Resume (PDF, DOCX, JPG — Max 10MB)"}</span>
            </div>
            <span className="rounded bg-primary/10 px-2 py-0.5 font-medium text-primary text-[11px]">
              Browse
            </span>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setFileName(f ? f.name : null);
              }}
              className="hidden"
            />
          </label>
        </div>

        <p className="pt-1 text-[11px] text-muted-foreground">
          By applying, you confirm that the details provided are true and allow NIFS Placement Cell to share your profile with {job.companyName}.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Send size={15} />
          {submitting ? "Submitting application..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
