import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  Mail,
  Sparkles,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { SITE } from "@/lib/data/site-constants";

export function ApplyNewCenterBanner() {
  const mailtoDirector = `mailto:director@nifsindia.com?subject=${encodeURIComponent(
    "Inquiry: Establishing New NIFS Training Center"
  )}&body=${encodeURIComponent(
    "Respected Director,\n\nWe are interested in exploring the opportunity to launch an authorized NIFS Fire and Industrial Safety Training Center in our district.\n\nProposed Location:\nOrganization / Applicant Name:\nContact Number:\nExisting Infrastructure:\n\nLooking forward to your guidance.\n\nSincerely,"
  )}`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 p-6 sm:p-10 lg:p-12 text-white shadow-2xl">
      {/* Top Hairline Ambient Accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      {/* Decorative ambient radial gradients */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Copy & Actions (7 cols) */}
        <div className="space-y-5 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <Building2 className="h-3.5 w-3.5" />
            <span>Institutional Expansion • Pan-India Partnership</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-[1.15]">
            Apply to Launch a NIFS Training Center in Your City
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Partner with India&apos;s pioneering Fire &amp; Industrial Safety Institute. If you have educational infrastructure, commercial training space, or industry expertise, expand statutory safety education in your district with turnkey curriculum, university degree affiliations, and corporate placement pipelines.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>ANU University &amp; NSDC Recognized Programs</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Turnkey Lab &amp; Training Yard Blueprints</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{SITE.studentsPlaced} Alumni Network &amp; Placement Tie-ups</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Direct Review by Directorate (<span className="text-red-300 font-mono text-xs">director@nifsindia.com</span>)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
            <Link
              href="/centers/apply"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-700/35 hover:from-red-500 hover:to-red-600 transition-all cursor-pointer text-center group"
            >
              <span>Apply for New Center (Online Form)</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={mailtoDirector}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all text-center"
            >
              <Mail className="h-4 w-4 text-red-400" />
              <span>Email Director Directly</span>
            </a>

            <a
              href="https://wa.me/918374340999?text=Hi%20NIFS%20Directorate%2C%20I%20am%20interested%20in%20applying%20to%20open%20a%20new%20NIFS%20Training%20Center%20in%20my%20city."
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs text-slate-400 hover:text-emerald-300 transition-colors sm:ml-2"
            >
              WhatsApp: <span className="font-semibold text-slate-200">+91-8374-340-999</span>
            </a>
          </div>
        </div>

        {/* Right Column: Framed Photography Showcase Card (5 cols) */}
        <div className="relative lg:col-span-5">
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-slate-900/60 shadow-2xl shadow-black/80 backdrop-blur-sm">
            <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/centers/new-center-campus.jpg"
                alt="Authorized NIFS Fire and Industrial Safety Training Center Campus"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={95}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Floating Top Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-white tracking-wide">
                Authorized Training Campus
              </span>
            </div>

            {/* Floating Bottom Pill */}
            <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-10 flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-zinc-950/85 px-3.5 py-2 backdrop-blur-md text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Compass className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-semibold text-white">{SITE.centerCount} Centers Nationwide</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                Turnkey Setup
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
