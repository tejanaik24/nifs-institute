import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, GraduationCap, Sparkles } from "lucide-react";

export function AbroadStudentsBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-primary/25 bg-card shadow-xl transition-all duration-300 hover:border-primary/50 group">
      <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
        {/* Left Column: Typography, Badges, and Action CTA (7 cols on desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Eyebrow badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-xs">
                <Globe className="h-3.5 w-3.5" /> Study in India · Govt. of India Portal
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/80 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> ANU University Affiliated
              </span>
            </div>

            <h2 className="font-display mt-4 text-3xl italic leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Admissions for <span className="text-primary font-bold">Abroad &amp; International</span> Students
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              NIFS India welcomes international candidates seeking global careers in safety engineering. Under the Government of India’s <em>Study in India</em> initiative, we offer two sanctioned programs with complete visa clearance and university certification.
            </p>

            {/* Program Pills */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background px-3 py-2 text-foreground shadow-2xs">
                <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                <span>Diploma - Advance Diploma in Industrial Safety</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background px-3 py-2 text-foreground shadow-2xs">
                <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                <span>B.Sc. - Honors (Fire and Industrial Safety)</span>
              </span>
            </div>
          </div>

          {/* Action Button & Disclaimer */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/courses/abroad-students/"
              className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/95 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              <span>Abroad Students Portal</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>

            <span className="text-xs text-muted-foreground">
              Takes 30 seconds · Direct diversion to Study in India Portal
            </span>
          </div>
        </div>

        {/* Right Column: Dedicated Crystal-Clear Framed Image (5 cols on desktop, top/full on mobile) */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/80 shadow-md">
            <Image
              src="/images/courses/abroad-students-banner.jpg"
              alt="International safety engineering students in training uniform reviewing blueprint at campus"
              fill
              quality={95}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
            {/* Subtle corner badge on photo */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-[11px] font-semibold text-white shadow-md backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>International Safety Cadre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
