"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  saveJobAction,
  closeJobAction,
  uploadJobPosterAction,
  JobFormData,
} from "@/app/dashboard/jobs/actions";
import { JobPositionInput, JobWithPositions } from "@/lib/db/jobs";
import { Plus, Trash2, Upload, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import { CompanyLogoPicker, CompanyLogo } from "./company-logo-picker";

const FIELD =
  "w-full rounded-md border border-[var(--dash-border)] bg-white px-3 py-2 text-sm text-[var(--dash-text)] outline-none transition-colors placeholder:text-[var(--dash-text-muted)]/50 focus:border-[var(--dash-accent)] focus:ring-2 focus:ring-[var(--dash-accent-soft)]";
const LABEL = "mb-1 block text-xs font-medium text-[var(--dash-text-muted)]";

export function JobForm({
  initialJob,
  companyLogos = [],
}: {
  initialJob?: JobWithPositions | null;
  companyLogos?: CompanyLogo[];
}) {
  const router = useRouter();
  const isEditing = Boolean(initialJob);

  const [companyName, setCompanyName] = useState(initialJob?.companyName ?? "");
  const [clientCompany, setClientCompany] = useState(initialJob?.clientCompany ?? "");
  const [clientLogoUrl, setClientLogoUrl] = useState(initialJob?.clientLogoUrl ?? "");
  const [location, setLocation] = useState(initialJob?.location ?? "");
  const [languages, setLanguages] = useState(initialJob?.languages ?? "");
  const [otherBenefits, setOtherBenefits] = useState(initialJob?.otherBenefits ?? "");
  const [applyByDate, setApplyByDate] = useState(
    initialJob?.applyByDate
      ? new Date(initialJob.applyByDate).toISOString().slice(0, 16)
      : ""
  );
  const [placementOfficerName, setPlacementOfficerName] = useState(
    initialJob?.placementOfficerName ?? ""
  );
  const [officerEmail, setOfficerEmail] = useState(initialJob?.officerEmail ?? "");
  const [contactEmail, setContactEmail] = useState(initialJob?.contactEmail ?? "");
  const [contactPhone, setContactPhone] = useState(initialJob?.contactPhone ?? "");
  const [additionalNotice, setAdditionalNotice] = useState(initialJob?.additionalNotice ?? "");
  const [posterImageUrl, setPosterImageUrl] = useState(initialJob?.posterImageUrl ?? "");

  const [positions, setPositions] = useState<JobPositionInput[]>(
    initialJob?.positions && initialJob.positions.length > 0
      ? initialJob.positions.map((p) => ({
          designation: p.designation,
          vacancies: p.vacancies,
          qualification: p.qualification ?? "",
          experience: p.experience ?? "",
          salary: p.salary ?? "",
        }))
      : [
          {
            designation: "",
            vacancies: 1,
            qualification: "",
            experience: "",
            salary: "",
          },
        ]
  );

  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addPosition() {
    setPositions((prev) => [
      ...prev,
      { designation: "", vacancies: 1, qualification: "", experience: "", salary: "" },
    ]);
  }

  function removePosition(index: number) {
    if (positions.length <= 1) return;
    setPositions((prev) => prev.filter((_, idx) => idx !== index));
  }

  function updatePositionField<K extends keyof JobPositionInput>(
    index: number,
    field: K,
    val: JobPositionInput[K]
  ) {
    setPositions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  }

  async function handlePosterUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploadingPoster(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await uploadJobPosterAction(fd);
    setUploadingPoster(false);

    if (res.error) {
      setError(res.error);
    } else if (res.url) {
      setPosterImageUrl(res.url);
    }
  }

  async function handleSubmit(publish: boolean) {
    setError(null);
    setSubmitting(true);

    const data: JobFormData = {
      companyName,
      clientCompany,
      clientLogoUrl,
      location,
      languages,
      otherBenefits,
      applyByDate: applyByDate ? applyByDate : null,
      posterImageUrl,
      placementOfficerName,
      officerEmail,
      contactEmail,
      contactPhone,
      additionalNotice,
      positions,
    };

    const res = await saveJobAction(initialJob?.id ?? null, data, publish);
    setSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else if (res.redirectUrl) {
      router.push(res.redirectUrl);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Basic Posting Details */}
      <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
        <h2 className="mb-4 text-sm font-semibold text-[var(--dash-text)]">
          1. Recruitment Overview
        </h2>

        {initialJob?.jobCode && (
          <div className="mb-4">
            <label className={LABEL}>Job Code (System Generated)</label>
            <input
              value={initialJob.jobCode}
              disabled
              className="w-full rounded-md border border-[var(--dash-border)] bg-black/5 px-3 py-2 font-mono text-xs text-[var(--dash-text-muted)]"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL}>Posting Company Name *</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              placeholder="e.g. NIFS/IFESM"
              className={FIELD}
            />
          </div>

          <div>
            <label className={LABEL}>Job Location *</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="e.g. Nakkapalli, Andhra Pradesh"
              className={FIELD}
            />
          </div>

          <div>
            <label className={LABEL}>Placement Officer Name & Title</label>
            <input
              value={placementOfficerName}
              onChange={(e) => setPlacementOfficerName(e.target.value)}
              placeholder="e.g. L. Seshagiri Rao, Officer - Placements & HR"
              className={FIELD}
            />
          </div>

          <div>
            <label className={LABEL}>Officer Email (for Regards signature)</label>
            <input
              type="email"
              value={officerEmail}
              onChange={(e) => setOfficerEmail(e.target.value)}
              placeholder="e.g. managerpt@nifsindia.com"
              className={FIELD}
            />
          </div>

          <div>
            <label className={LABEL}>Contact Email (for queries)</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="e.g. recruitments@nifsindia.com"
              className={FIELD}
            />
          </div>

          <div>
            <label className={LABEL}>Contact Phone (for queries)</label>
            <input
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="e.g. 9701318196 / 9949855966"
              className={FIELD}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={LABEL}>Additional Notice (Optional)</label>
            <input
              value={additionalNotice}
              onChange={(e) => setAdditionalNotice(e.target.value)}
              placeholder="e.g. Immediate Joiners Required. Only experienced candidates are eligible."
              className={FIELD}
            />
          </div>

          <div>
            <label className={LABEL}>Languages Required</label>
            <input
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              placeholder="e.g. English, Hindi, Telugu"
              className={FIELD}
            />
          </div>

          <div>
            <label className={LABEL}>Other Benefits</label>
            <input
              value={otherBenefits}
              onChange={(e) => setOtherBenefits(e.target.value)}
              placeholder="e.g. Accommodation Provided, Food Subsidy"
              className={FIELD}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={LABEL}>Apply By Deadline</label>
            <input
              type="datetime-local"
              value={applyByDate}
              onChange={(e) => setApplyByDate(e.target.value)}
              className={FIELD}
            />
            <span className="text-[11px] text-[var(--dash-text-muted)]">
              Displayed as plain text on public page. Postings do not auto-hide after this date.
            </span>
          </div>
        </div>
      </div>

      {/* Client Company Logo Picker */}
      <CompanyLogoPicker
        logos={companyLogos}
        value={clientCompany}
        logoUrl={clientLogoUrl}
        onChange={(name, url) => {
          setClientCompany(name);
          setClientLogoUrl(url);
        }}
      />

      {/* Poster Flyer Upload */}
      <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
        <h2 className="mb-2 text-sm font-semibold text-[var(--dash-text)]">
          2. Recruitment Flyer / Poster (Optional)
        </h2>
        <p className="mb-4 text-xs text-[var(--dash-text-muted)]">
          Upload the official recruitment drive flyer. This is shown prominently at the top of the job page.
        </p>

        {posterImageUrl ? (
          <div className="relative inline-block overflow-hidden rounded-lg border border-[var(--dash-border)]">
            <div className="relative h-48 w-72 bg-black/5">
              <Image
                src={posterImageUrl}
                alt="Job Flyer Poster"
                fill
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setPosterImageUrl("")}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--dash-border)] bg-black/[0.01] p-6 transition-colors hover:border-[var(--dash-accent)]">
            <ImageIcon size={28} className="text-[var(--dash-text-muted)]" />
            <span className="mt-2 text-xs font-medium text-[var(--dash-text)]">
              {uploadingPoster ? "Uploading poster..." : "Click to upload recruitment flyer"}
            </span>
            <span className="mt-1 text-[11px] text-[var(--dash-text-muted)]">
              PNG, JPG, WEBP up to 8MB
            </span>
            <input
              type="file"
              accept="image/*"
              disabled={uploadingPoster}
              onChange={handlePosterUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Dynamic Positions Block */}
      <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[var(--dash-text)]">
              3. Open Positions ({positions.length})
            </h2>
            <p className="text-xs text-[var(--dash-text-muted)]">
              One recruitment drive can have multiple open designations/roles.
            </p>
          </div>
          <button
            type="button"
            onClick={addPosition}
            className="inline-flex items-center gap-1 rounded border border-[var(--dash-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--dash-text)] transition-colors hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)]"
          >
            <Plus size={14} />
            Add Position
          </button>
        </div>

        <div className="space-y-4">
          {positions.map((pos, idx) => (
            <div
              key={idx}
              className="relative rounded-lg border border-[var(--dash-border)] bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between border-b border-[var(--dash-border)] pb-2">
                <span className="font-mono text-xs font-semibold text-[var(--dash-accent)]">
                  Position #{idx + 1}
                </span>
                {positions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePosition(idx)}
                    className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2">
                  <label className={LABEL}>Designation *</label>
                  <input
                    value={pos.designation}
                    onChange={(e) => updatePositionField(idx, "designation", e.target.value)}
                    required
                    placeholder="e.g. Sr. Safety Officer"
                    className={FIELD}
                  />
                </div>

                <div>
                  <label className={LABEL}>Vacancies *</label>
                  <input
                    type="number"
                    min="1"
                    value={pos.vacancies}
                    onChange={(e) =>
                      updatePositionField(idx, "vacancies", parseInt(e.target.value, 10) || 1)
                    }
                    className={FIELD}
                  />
                </div>

                <div>
                  <label className={LABEL}>Salary / CTC</label>
                  <input
                    value={pos.salary}
                    onChange={(e) => updatePositionField(idx, "salary", e.target.value)}
                    placeholder="e.g. ₹43,000 CTC"
                    className={FIELD}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={LABEL}>Qualification</label>
                  <input
                    value={pos.qualification}
                    onChange={(e) => updatePositionField(idx, "qualification", e.target.value)}
                    placeholder="e.g. BE/B.Tech + Safety Cert"
                    className={FIELD}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={LABEL}>Experience</label>
                  <input
                    value={pos.experience}
                    onChange={(e) => updatePositionField(idx, "experience", e.target.value)}
                    placeholder="e.g. 7-8 yrs exp in EPC/Manufacturing"
                    className={FIELD}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSubmit(false)}
            className="rounded-md border border-[var(--dash-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--dash-text)] transition-colors hover:bg-black/5 disabled:opacity-50"
          >
            {submitting ? "Saving..." : isEditing ? "Save as Draft" : "Save Draft"}
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSubmit(true)}
            className="rounded-md bg-[var(--dash-accent)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--dash-accent-hover)] disabled:opacity-50"
          >
            {submitting ? "Publishing..." : isEditing ? "Publish Changes" : "Publish Posting"}
          </button>
        </div>

        {isEditing && initialJob?.status !== "closed" && (
          <form action={closeJobAction.bind(null, initialJob!.id)}>
            <button
              type="submit"
              className="rounded-md border border-red-400/50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/10"
            >
              Close Job
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
