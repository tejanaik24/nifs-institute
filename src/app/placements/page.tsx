import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import Image from "next/image";
import { recruiters } from "@/lib/data/centers";

export const metadata: Metadata = {
  title: "Placements — Our Graduates at Adani, L&T, ITC & More | NIFS India",
  description:
    "NIFS placement outcomes: graduates working as safety officers and EHS professionals at Adani, L&T, MEIL, GMR, ITC, Amazon and more.",
};

export default function PlacementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Placements"
        title="Where our graduates work"
        description="Our placement cell partners directly with recruiters across construction, EPC, manufacturing, and FMCG to place every graduating batch into real industrial safety roles."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
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

        <div data-path-target="true" className="mt-20">
          <h2 className="font-display text-2xl italic">Our Top Recruiters</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {recruiters.map((r) => (
              <div
                key={r}
                className="flex items-center justify-center border border-border p-6 text-center text-sm font-medium text-foreground/80"
              >
                {r}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
