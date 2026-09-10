import { PageHero } from "@/components/sections/page-hero";
import { recruiterLogos } from "@/lib/data/centers";
import { getOpenJobs } from "@/lib/db/jobs";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, ChevronRight } from "lucide-react";
import { RecruiterLogoShowcase } from "@/components/sections/recruiter-logo-showcase";
import HomeOutcomes from "@/components/sections/home/home-outcomes";
import HomePlacements from "@/components/sections/home/home-placements";
import { PlacementsDualCta } from "@/components/sections/placements-dual-cta";

export const metadata: Metadata = {
  title: "Placements — Graduates at Adani, L&T, ITC | NIFS India",
  description:
    "NIFS placement outcomes: graduates working as safety officers and EHS professionals at Adani, L&T, MEIL, GMR, ITC, Amazon and more.",
  alternates: { canonical: "/placements/" },
};

export default async function PlacementsPage() {
  const openJobs = await getOpenJobs().catch(() => []);
  const now = Date.now();

  return (
    <>
      <PageHero
        eyebrow="Placements"
        title="Built for real industrial safety careers"
        description="Our placement cell partners directly with recruiters across construction, EPC, manufacturing, and FMCG to place every graduating batch into real industrial safety roles."
      />

      <HomeOutcomes />
      <HomePlacements />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div
            data-path-target="true"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
          >
            <Image
              src="/images/placement-success-story.jpg"
              alt="NIFS graduate, now a corporate safety officer"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Career Outcomes
            </span>
            <h2 className="font-display mt-2 text-3xl italic leading-tight">
              From certificate to corporate safety officer
            </h2>
            <p className="mt-4 text-muted-foreground">
              NIFS graduates go on to roles including Fire Safety Officer,
              Industrial Safety Supervisor, HSE Manager, Emergency Response
              Coordinator, and Risk Analyst — across construction, EPC,
              manufacturing, and logistics.
            </p>
          </div>
        </div>

        <div data-path-target="true" className="mt-20 text-center">
          <h2 className="font-display text-2xl italic">
            Trusted by {recruiterLogos.length}+ MNC &amp; Govt Partners
          </h2>
          <RecruiterLogoShowcase
            logos={recruiterLogos.map((r) => ({ name: r.name, logo: r.logo! }))}
          />
        </div>

        {openJobs.length > 0 && (
          <div id="current-openings" data-path-target="true" className="mt-20 scroll-mt-28">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Current Openings
            </span>
            <h2 className="font-display mt-2 text-2xl italic">
              Join our alumni network
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {openJobs.map((job) => {
                const posCount = job.positions.length;
                const posSummary =
                  posCount === 1
                    ? job.positions[0]?.designation
                    : posCount > 1
                      ? `${posCount} positions open`
                      : "Immediate opening";
                const totalVacancies = job.totalVacancies ?? 0;
                const isNew =
                  job.publishedAt &&
                  now - new Date(job.publishedAt).getTime() < 48 * 3600 * 1000;

                return (
                  <Link
                    key={job.id}
                    href={`/placements/jobs/${job.slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {job.clientLogoUrl ? (
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-white">
                            <Image
                              src={job.clientLogoUrl}
                              alt={job.clientCompany || job.companyName}
                              fill
                              className="object-contain p-1.5"
                            />
                          </div>
                        ) : (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Users size={18} />
                          </div>
                        )}
                        <div>
                          <h3 className="font-display text-lg italic leading-tight text-foreground">
                            {job.companyName}
                          </h3>
                          {job.clientCompany && (
                            <span className="mt-0.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                              {job.clientCompany}
                            </span>
                          )}
                        </div>
                      </div>
                      {isNew && (
                        <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase text-primary-foreground">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-sm font-medium text-foreground/90">
                      {posSummary}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-primary" />
                        {job.location}
                      </span>
                      {totalVacancies > 0 && (
                        <span className="flex items-center gap-1">
                          <Users size={13} className="text-primary" />
                          {totalVacancies}{" "}
                          {totalVacancies === 1 ? "vacancy" : "vacancies"}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      {job.jobCode && (
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {job.jobCode}
                        </span>
                      )}
                      <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary">
                        View Details
                        <ChevronRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <PlacementsDualCta />
    </>
  );
}
