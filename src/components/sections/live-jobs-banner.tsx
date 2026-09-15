import { getOpenJobs } from "@/lib/db/jobs";
import { ArrowRight, Briefcase, MapPin, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function LiveJobsBanner() {
  const openJobs = await getOpenJobs().catch(() => []);

  if (openJobs.length === 0) {
    return (
      <div className="my-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> NIFS Campus Recruitment Cell
            </div>
            <h3 className="font-display text-2xl italic font-bold text-foreground">
              Direct Placement Assistance for 45,000+ Safety Alumni
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading MNCs and EPC giants including Adani, L&amp;T, ITC, GMR,
              and Amazon recruit directly from NIFS centers nationwide. Apply
              for course admissions to access upcoming recruitment drives.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/placements"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:opacity-95 transition-opacity"
            >
              Explore Placement Drives <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live Placement Drives Open Now
          </div>
          <h3 className="font-display mt-2 text-2xl italic font-bold text-foreground">
            Companies Currently Hiring Through NIFS
          </h3>
        </div>
        <Link
          href="/placements"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
        >
          View All {openJobs.length} Active Openings <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {openJobs.slice(0, 3).map((job) => {
          const posSummary =
            job.positions.length === 1
              ? job.positions[0]?.designation
              : `${job.positions.length} positions open`;

          return (
            <Link
              key={job.id}
              href={`/placements/jobs/${job.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-3">
                  {job.clientLogoUrl ? (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                      <Image
                        src={job.clientLogoUrl}
                        alt={job.clientCompany || job.companyName}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Briefcase size={18} />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      {job.companyName}
                    </h4>
                    {job.clientCompany && (
                      <span className="text-[11px] text-muted-foreground">
                        Client: {job.clientCompany}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-3 font-semibold text-xs text-foreground">
                  {posSummary}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-primary" /> {job.location}
                  </span>
                  {(job.totalVacancies ?? 0) > 0 && (
                    <span className="flex items-center gap-1">
                      <Users size={12} className="text-primary" />{" "}
                      {job.totalVacancies} Vacancies
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                <span>Apply with Resume</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl bg-muted/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground text-center sm:text-left">
          <strong>Not yet qualified?</strong> Enroll in NIFS 12-Month Govt/NSDC
          Diploma in Fire &amp; Safety to become eligible for campus recruitment
          drives.
        </span>
        <Link
          href="/courses/diploma-in-fire-safety"
          className="text-primary font-bold hover:underline shrink-0"
        >
          Check Course Eligibility →
        </Link>
      </div>
    </div>
  );
}
