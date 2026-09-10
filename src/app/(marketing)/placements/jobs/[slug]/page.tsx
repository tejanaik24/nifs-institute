import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { getJobBySlug, getOpenJobs } from "@/lib/db/jobs";
import { JobApplyForm } from "@/components/sections/job-apply-form";
import { DeadlineCountdown } from "@/components/sections/deadline-countdown";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  IndianRupee,
  Globe2,
  Gift,
  ChevronLeft,
  ChevronRight,
  Hash,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const jobs = await getOpenJobs().catch(() => []);
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job || job.status !== "open") return {};

  const title = `${job.companyName}${job.clientCompany ? ` (${job.clientCompany})` : ""} — Recruitment Drive | NIFS India`;
  const desc = `Recruitment drive by ${job.companyName} in ${job.location}. ${job.positions.length} position(s) open. Total vacancies: ${job.totalVacancies || 1}. Apply now.`;

  return {
    title,
    description: desc,
    alternates: { canonical: `/placements/jobs/${job.slug}/` },
    openGraph: {
      title,
      description: desc,
      images: job.posterImageUrl ? [job.posterImageUrl] : undefined,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job || job.status !== "open") notFound();

  const formattedApplyDate = job.applyByDate
    ? new Date(job.applyByDate).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const alertDate = job.publishedAt ?? job.createdAt;
  const formattedAlertDate = alertDate
    ? new Date(alertDate).toLocaleDateString("en-IN", { dateStyle: "medium" })
    : null;
  const displayJobId = alertDate
    ? `${String(new Date(alertDate).getMonth() + 1).padStart(2, "0")}${new Date(alertDate).getFullYear()}/${job.id}`
    : job.jobCode;

  const requirementLine =
    job.positions.length > 0
      ? `Immediate requirement for ${job.positions.map((p) => p.designation).join(" & ")}.`
      : null;

  const otherJobs = (await getOpenJobs())
    .filter((j) => j.id !== job.id)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Placement Drive"
        title={job.companyName}
        description={`${job.clientCompany ? `Client: ${job.clientCompany} · ` : ""}${job.location}`}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8">
          <Link
            href="/placements"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <ChevronLeft size={14} />
            Back to All Openings
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content (Left 7 cols) */}
          <div className="space-y-10 lg:col-span-7">
            {/* Prominent Poster Flyer Image (if uploaded) */}
            {job.posterImageUrl && (
              <div className="relative overflow-hidden rounded-2xl border border-border bg-black/5 shadow-sm">
                <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                  <Image
                    src={job.posterImageUrl}
                    alt={`${job.companyName} Recruitment Flyer`}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            {/* Overview Header Card */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  {job.clientLogoUrl && (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-white">
                      <Image
                        src={job.clientLogoUrl}
                        alt={`${job.clientCompany || job.companyName} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Recruitment Overview
                    </span>
                    <h2 className="font-display text-2xl italic text-foreground">
                      {job.companyName}
                    </h2>
                  </div>
                </div>
                {displayJobId && (
                  <div className="rounded-md bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
                    JOB ID: {displayJobId}
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <ShieldCheck size={14} />
                Verified by NIFS Placement Cell
              </div>

              {requirementLine && (
                <p className="mt-4 text-sm font-medium text-foreground">
                  {requirementLine}
                </p>
              )}

              {job.additionalNotice && (
                <p className="mt-3 rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary">
                  {job.additionalNotice}
                </p>
              )}

              {job.applyByDate && (
                <div className="mt-3">
                  <DeadlineCountdown applyByDate={job.applyByDate.toString()} />
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {formattedAlertDate && (
                  <DetailItem
                    icon={Hash}
                    label="Job Alert Dated"
                    value={formattedAlertDate}
                  />
                )}
                {job.clientCompany && (
                  <DetailItem
                    icon={Building2}
                    label="Client Company"
                    value={job.clientCompany}
                  />
                )}
                <DetailItem
                  icon={MapPin}
                  label="Job Location"
                  value={job.location}
                />
                {formattedApplyDate && (
                  <DetailItem
                    icon={Calendar}
                    label="Apply By Deadline"
                    value={formattedApplyDate}
                  />
                )}
                {job.languages && (
                  <DetailItem
                    icon={Globe2}
                    label="Languages"
                    value={job.languages}
                  />
                )}
                {job.otherBenefits && (
                  <DetailItem
                    icon={Gift}
                    label="Other Benefits"
                    value={job.otherBenefits}
                  />
                )}
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <iframe
                  title={`Map of ${job.location}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(job.location)}&output=embed`}
                  className="h-48 w-full"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Positions Section */}
            <div>
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Vacancies & Requirements
                </span>
                <h3 className="font-display mt-1 text-2xl italic text-foreground">
                  Open Positions ({job.positions.length})
                </h3>
              </div>

              <div className="space-y-4">
                {job.positions.map((pos, idx) => (
                  <div
                    key={pos.id || idx}
                    className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
                      <div>
                        <span className="font-mono text-xs font-semibold text-primary">
                          Position #{idx + 1}
                        </span>
                        <h4 className="font-display text-xl italic text-foreground">
                          {pos.designation}
                        </h4>
                      </div>
                      <div className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
                        {pos.vacancies} {pos.vacancies === 1 ? "Vacancy" : "Vacancies"}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {pos.salary && (
                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Salary / CTC
                          </dt>
                          <dd className="mt-0.5 text-sm font-medium text-foreground">
                            {pos.salary}
                          </dd>
                        </div>
                      )}
                      {pos.qualification && (
                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Qualification
                          </dt>
                          <dd className="mt-0.5 text-sm text-foreground">
                            {pos.qualification}
                          </dd>
                        </div>
                      )}
                      {pos.experience && (
                        <div className="sm:col-span-2">
                          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Experience Required
                          </dt>
                          <dd className="mt-0.5 text-sm text-foreground">
                            {pos.experience}
                          </dd>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Signature */}
            {(job.contactEmail || job.contactPhone || job.placementOfficerName) && (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                {(job.contactEmail || job.contactPhone) && (
                  <div className="mb-6 space-y-2 border-b border-border pb-6">
                    <p className="text-sm text-foreground">
                      Interested and eligible candidates may also reach out directly:
                    </p>
                    {job.contactPhone && (
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Phone size={14} className="text-primary" />
                        {job.contactPhone}
                      </div>
                    )}
                    {job.contactEmail && (
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Mail size={14} className="text-primary" />
                        {job.contactEmail}
                      </div>
                    )}
                  </div>
                )}

                {job.placementOfficerName && (
                  <div className="text-sm text-muted-foreground">
                    <p>Regards,</p>
                    <p className="mt-1 font-medium text-foreground">
                      {job.placementOfficerName}
                    </p>
                    <p>NIFS – Head Office, Visakhapatnam, Andhra Pradesh</p>
                    {job.officerEmail && <p>Email: {job.officerEmail}</p>}
                  </div>
                )}
              </div>
            )}

            {/* Explore More Jobs */}
            {otherJobs.length > 0 && (
              <div>
                <h3 className="font-display mb-4 text-2xl italic text-foreground">
                  Explore More Jobs
                </h3>
                <div className="space-y-3">
                  {otherJobs.map((oj) => (
                    <Link
                      key={oj.id}
                      href={`/placements/jobs/${oj.slug}/`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40"
                    >
                      <div className="flex items-center gap-3">
                        {oj.clientLogoUrl && (
                          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                            <Image
                              src={oj.clientLogoUrl}
                              alt={oj.clientCompany || oj.companyName}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {oj.clientCompany || oj.companyName}
                          </p>
                          <p className="text-xs text-muted-foreground">{oj.location}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="shrink-0 text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar: Apply Form (Right 5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <JobApplyForm job={job} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={16} />
      </div>
      <div>
        <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}
