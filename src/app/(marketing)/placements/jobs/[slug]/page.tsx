import { DeadlineCountdown } from "@/components/sections/deadline-countdown";
import { JobApplyForm } from "@/components/sections/job-apply-form";
import { PageHero } from "@/components/sections/page-hero";
import { getAllJobs, getJobBySlug, getOpenJobs } from "@/lib/db/jobs";
import {
  AlertCircle,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Gift,
  Globe2,
  Hash,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const jobs = await getAllJobs().catch(() => []);
  return jobs
    .filter((j) => j.status !== "draft")
    .map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job || job.status === "draft") return {};

  const isClosed = job.status === "closed";
  const title = `${job.companyName}${job.clientCompany ? ` (${job.clientCompany})` : ""} — ${isClosed ? "Drive Completed" : "Recruitment Drive"} | NIFS India`;
  const desc = isClosed
    ? `Recruitment drive by ${job.companyName} in ${job.location} is completed. View eligibility criteria, salary benchmarks, and upcoming campus drives at NIFS India.`
    : `Recruitment drive by ${job.companyName} in ${job.location}. ${job.positions.length} position(s) open. Total vacancies: ${job.totalVacancies || 1}. Apply now.`;

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
  if (!job || job.status === "draft") notFound();

  const isClosed = job.status === "closed";

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

  const jobPostingSchemas = (
    job.positions.length > 0
      ? job.positions
      : [
          {
            designation: `${job.companyName} Safety Opening`,
            vacancies: job.totalVacancies || 1,
            qualification: "Diploma in Fire & Safety / ADIS",
            salary: undefined,
          },
        ]
  ).map((pos) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${pos.designation} — ${job.companyName}`,
    description: `Immediate recruitment drive for ${pos.designation} at ${job.companyName} in ${job.location}. ${pos.qualification ? `Required Qualification: ${pos.qualification}. ` : ""}${pos.vacancies ? `Total Vacancies: ${pos.vacancies}. ` : ""}Apply online with resume at NIFS India Official Placement Portal.`,
    datePosted: (job.publishedAt ?? job.createdAt).toISOString(),
    validThrough: job.applyByDate
      ? new Date(job.applyByDate).toISOString()
      : new Date(
          new Date(job.publishedAt ?? job.createdAt).getTime() + 60 * 86400000,
        ).toISOString(),
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.clientCompany || job.companyName,
      sameAs: "https://nifsindia.net",
      logo: job.clientLogoUrl || "https://nifsindia.net/images/nifs-crest.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },
    directApply: true,
    url: `https://nifsindia.net/placements/jobs/${job.slug}/`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jobPostingSchemas.length === 1
              ? jobPostingSchemas[0]
              : jobPostingSchemas,
          ),
        }}
      />
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
            {isClosed && (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-amber-900 dark:text-amber-200">
                <AlertCircle
                  className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                  size={20}
                />
                <div>
                  <h4 className="text-sm font-bold">
                    This Campus Recruitment Drive Is Completed
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Applications for {job.companyName} ({job.location}) are
                    currently closed. NIFS students and alumni receive priority
                    access to ongoing and upcoming corporate campus placement
                    drives.
                  </p>
                </div>
              </div>
            )}

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
                        {pos.vacancies}{" "}
                        {pos.vacancies === 1 ? "Vacancy" : "Vacancies"}
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
            {(job.contactEmail ||
              job.contactPhone ||
              job.placementOfficerName) && (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                {(job.contactEmail || job.contactPhone) && (
                  <div className="mb-6 space-y-2 border-b border-border pb-6">
                    <p className="text-sm text-foreground">
                      Interested and eligible candidates may also reach out
                      directly:
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
                          <p className="text-xs text-muted-foreground">
                            {oj.location}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        className="shrink-0 text-primary"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar: Apply Form or Evergreen Drive Completed Card (Right 5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              {isClosed ? (
                <div className="rounded-2xl border border-primary/30 bg-card p-6 sm:p-8 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Drive Completed
                  </span>
                  <h3 className="font-display mt-2 text-2xl italic text-foreground">
                    Qualify for Next Hiring Drive
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Recruiters like {job.companyName}, L&amp;T, and Adani
                    require government-recognized safety certifications (ADIS,
                    DFS, or DHSE). NIFS provides 100% placement assistance to
                    all certified graduates.
                  </p>
                  <div className="mt-6 space-y-3">
                    <a
                      href={`https://wa.me/918374340999?text=${encodeURIComponent(`Hi NIFS, I saw the ${job.companyName} placement drive in ${job.location}. I want to know about course admissions and how to qualify for upcoming campus placement drives.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                    >
                      Chat on WhatsApp — Next Drive Alert
                    </a>
                    <Link
                      href="/courses"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3.5 text-center text-sm font-semibold text-foreground transition hover:border-primary/50"
                    >
                      Explore Safety Diploma Courses
                    </Link>
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-center text-xs text-muted-foreground">
                      Over 45,000+ Alumni Placed Across 70+ Centers Nationwide
                    </p>
                  </div>
                </div>
              ) : (
                <JobApplyForm job={job} />
              )}
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
