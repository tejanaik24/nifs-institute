import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/sections/page-hero";
import { NewCenterForm } from "@/components/sections/new-center-form";
import {
  Building2,
  ShieldCheck,
  Award,
  GraduationCap,
  Users,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Apply for a New NIFS Training Center | Center Partnership & Franchise",
  description:
    "Partner with NIFS India to launch an authorized Fire and Industrial Safety training center in your city. Turnkey curriculum, UGC/ANU degrees, NSDC approvals, and direct evaluation by the Office of the Director.",
  alternates: { canonical: "/centers/apply/" },
};

const PARTNERSHIP_PILLARS = [
  {
    icon: Award,
    title: "Recognized Academic Degrees",
    desc: "Offer UGC-approved B.Sc Fire & Safety degrees (with Acharya Nagarjuna University), NSDC vocational credentials, and statutory ADIS / Diploma programs.",
    tag: "UGC & NSDC",
    iconBoxClass: "border-amber-500/30 bg-amber-500/15 text-amber-400 shadow-sm shadow-amber-500/15",
    tagClass: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  },
  {
    icon: Building2,
    title: "Turnkey Lab & Yard Blueprints",
    desc: "Complete architectural and equipment blueprints for smoke chambers, fire testing yards, industrial safety simulators, and smart classrooms.",
    tag: "Turnkey Setup",
    iconBoxClass: "border-red-500/30 bg-red-500/15 text-red-400 shadow-sm shadow-red-500/15",
    tagClass: "border-red-500/30 bg-red-500/10 text-red-300",
  },
  {
    icon: GraduationCap,
    title: "Master Faculty Training (TTT)",
    desc: "Continuous Train-the-Trainer (TTT) workshops delivered by seasoned industrial safety directors, compliance officers, and university professors.",
    tag: "Faculty Support",
    iconBoxClass: "border-sky-500/30 bg-sky-500/15 text-sky-400 shadow-sm shadow-sky-500/15",
    tagClass: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  },
  {
    icon: Briefcase,
    title: "Central Placement Network",
    desc: "Your candidates gain direct entry into centralized campus drives with 45,000+ placed alumni across L&T, Adani, Tata Steel, Reliance, and leading EPC contractors.",
    tag: "45k+ Placed",
    iconBoxClass: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400 shadow-sm shadow-emerald-500/15",
    tagClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
];

const REQUIREMENTS = [
  "Commercial premises with 1,500 – 3,500 sq.ft carpet area in an accessible education / commercial zone.",
  "Adequate space or designated open ground for practical fire extinguisher drills and demonstration yards.",
  "Classroom capacity for 30–50 students equipped with audiovisual training projection.",
  "Administrative office, counseling desk, and student record management facilities.",
  "Compliance with local building safety, emergency exit, and fire prevention norms.",
];

export default function ApplyForNewCenterPage() {
  return (
    <>
      <PageHero
        eyebrow="Institutional Expansion"
        title="Apply for a New NIFS Training Center"
        description="Expand statutory Fire, Industrial Safety, and Occupational Health education in your district. Complete proposal review conducted directly by the Office of the Director."
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/centers" className="hover:text-primary transition-colors">
            Centers
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Apply for New Center</span>
        </nav>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* LEFT COLUMN: Overview, Value Props, Requirements & Director Contact (5 cols) */}
          <div className="space-y-8 lg:col-span-5">
            {/* Campus Photo Showcase Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src="/images/centers/new-center-campus.jpg"
                  alt="Authorized NIFS Fire and Industrial Safety Training Center Campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30 pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Authorized Training Campus Blueprint
                  </span>
                  <p className="text-xs text-slate-200 mt-1.5 font-semibold">
                    Turnkey Practical Training Yard &amp; Modern Smart Classrooms
                  </p>
                </div>
              </div>
            </div>

            {/* Why Partner with NIFS India — Luxury Obsidian Master Card */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-[#090D16] p-6 sm:p-8 text-white shadow-2xl shadow-black/80">
              {/* Top Hairline Ambient Accent */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
              {/* Subtle Ambient Radial Lighting */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative z-10">
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-400 mb-4 shadow-xs shadow-red-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <Compass className="h-3.5 w-3.5 text-red-400" />
                  <span>Pan-India Expansion • 21 States</span>
                </div>

                {/* Punchy Sans Heading */}
                <h3 className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-white mb-3 leading-tight">
                  Why Partner with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                    NIFS India?
                  </span>
                </h3>

                {/* Crisp High-Contrast Body */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  With <strong className="text-white font-semibold">70+ verified centers across 21 states</strong>, NIFS is India&apos;s pioneering institutional network for statutory safety education. Launching an authorized center establishes a premier training facility in your district with turnkey curriculum, university degree affiliations, and corporate placement pipelines.
                </p>

                {/* 4 Refined Editorial Micro-Cards */}
                <div className="space-y-3">
                  {PARTNERSHIP_PILLARS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={i}
                        className="group relative flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 sm:p-4 transition-all duration-300 hover:border-red-500/40 hover:bg-white/[0.07]"
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 group-hover:scale-105",
                            p.iconBoxClass
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-sans text-sm font-bold text-white tracking-tight">
                              {p.title}
                            </h4>
                            <span
                              className={cn(
                                "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                p.tagClass
                              )}
                            >
                              {p.tag}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-normal">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Institutional Proof Bar */}
                <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-4 gap-2 text-center">
                  <div className="rounded-xl bg-white/[0.03] border border-white/5 py-2 px-1">
                    <div className="text-base sm:text-lg font-black text-white font-sans">70+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Centers</div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/5 py-2 px-1">
                    <div className="text-base sm:text-lg font-black text-emerald-400 font-sans">21</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">States</div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/5 py-2 px-1">
                    <div className="text-base sm:text-lg font-black text-amber-400 font-sans">45k+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Alumni</div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/5 py-2 px-1">
                    <div className="text-base sm:text-lg font-black text-red-400 font-sans">22+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Years</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Infrastructure Requirements */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 shadow-md">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  <Building2 className="h-4 w-4" />
                  <span>Facility Prerequisites</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">5 Standards</span>
              </div>
              <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white mb-3">
                Center Infrastructure Checklist
              </h3>
              <ul className="space-y-3">
                {REQUIREMENTS.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Directorate Channel */}
            <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-50 to-orange-50/40 dark:from-red-950/20 dark:to-slate-900/60 p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 mb-2">
                <Mail className="h-4 w-4" />
                <span>Directorate Direct Channel</span>
              </div>
              <h3 className="font-sans text-base font-bold text-slate-900 dark:text-white mb-2">
                Office of the Director
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Have questions before submitting the form? Reach out directly to the Director&apos;s office for institutional collaboration inquiries.
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <a
                    href="mailto:director@nifsindia.com"
                    className="font-mono font-semibold text-slate-900 dark:text-white hover:text-red-600 underline"
                  >
                    director@nifsindia.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <a href="tel:+918374340999" className="text-slate-800 dark:text-slate-200 hover:text-red-600 font-medium">
                    +91-8374-340-999 (Executive Directorate Desk)
                  </a>
                </div>
                <div className="flex items-start gap-2.5 pt-1">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    NIFS Corporate HQ: AG Avenue Building, Dwarakanagar, Visakhapatnam (A.P.) – 530016
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Interactive Application Form (7 cols) */}
          <div className="lg:col-span-7">
            <NewCenterForm />
          </div>
        </div>
      </div>
    </>
  );
}

