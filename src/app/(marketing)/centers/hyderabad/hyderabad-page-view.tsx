"use client";

import { TiltWrapper } from "@/components/motion/tilt-wrapper";
import type { Course } from "@/lib/data/courses";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Compass,
  ExternalLink,
  Flame,
  HelpCircle,
  MapPin,
  Navigation,
  Phone,
  Sliders,
  Star,
  Train,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LOCAL_PHONE = "+91-9246-616-282";
const LOCAL_TEL = "tel:+919246616282";
const WHATSAPP_URL =
  "https://wa.me/918374340999?text=" +
  encodeURIComponent(
    "Hi NIFS, I am interested in Fire and Safety courses at the Hyderabad (Ameerpet) center. Please share fee structure and batch details.",
  );
const GOOGLE_MAPS_NAV_URL =
  "https://www.google.com/maps/dir/?api=1&destination=17.4375,78.4482";
const GOOGLE_REVIEW_URL = "https://g.page/r/nifs-hyderabad/review";

// Recruiter Logos
const RECRUITER_LOGOS = [
  { name: "L&T", logo: "/images/logos/recruiters/lt.png" },
  { name: "Adani", logo: "/images/logos/recruiters/adani_logo.png" },
  { name: "ITC", logo: "/images/logos/recruiters/itc.png" },
  { name: "Amazon", logo: "/images/logos/recruiters/amazon.png" },
  { name: "MEIL", logo: "/images/logos/recruiters/meil.png" },
  { name: "Asian Paints", logo: "/images/logos/recruiters/asianpaints.png" },
  { name: "GMR", logo: "/images/logos/recruiters/gmr.png" },
  { name: "Coca-Cola", logo: "/images/logos/recruiters/coca-cola.png" },
  { name: "Power Mech", logo: "/images/logos/recruiters/power-mech.png" },
  { name: "Nilkamal", logo: "/images/logos/recruiters/nilkamal.png" },
];

// Practical Fire Training Yard Cinema Cards
const PRACTICAL_YARD_PHOTOS = [
  {
    title: "High-Rise Scaffolding Rescue",
    subtitle: "Rope access, harness & casualty lowering drills",
    src: "/images/gallery/practical-training-yard/practical-training-yard-14.webp",
    tag: "Height Safety",
    stat: "15m Scaffolding",
  },
  {
    title: "Chemical Foam Fire Attack",
    subtitle: "Class B solvent & volatile fuel blaze suppression",
    src: "/images/gallery/practical-training-yard/practical-training-yard-16.webp",
    tag: "Pharma Hazmat",
    stat: "Multi-Fuel Pits",
  },
  {
    title: "SCBA Smoke Chamber Entry",
    subtitle: "Zero-visibility breathing apparatus search & rescue",
    src: "/images/gallery/practical-training-yard/practical-training-yard-1.webp",
    tag: "Toxic Gas Entry",
    stat: "Confined Space",
  },
  {
    title: "Industrial Fire Hydrant & Pump",
    subtitle: "High-pressure multi-hose relay operations",
    src: "/images/gallery/practical-training-yard/practical-training-yard-3.webp",
    tag: "Hydraulics",
    stat: "10-Bar Pressure",
  },
];

// Visual Placement Cards
const PLACEMENT_PROOFS = [
  {
    name: "K. Sai Praneeth",
    company: "Dr. Reddy's Laboratories",
    role: "Junior EHS Officer",
    pkg: "₹6.2 LPA",
    course: "ADIS (1-Year)",
    badge: "Pharma SEZ",
    image: "/images/gallery/campus-drive/campus-drive-1.webp",
  },
  {
    name: "Mohammed Irfan",
    company: "L&T Construction",
    role: "Site Safety Supervisor",
    pkg: "₹5.4 LPA",
    course: "Diploma in Fire Safety",
    badge: "Metro Project",
    image: "/images/gallery/campus-drive/campus-drive-8.webp",
  },
  {
    name: "B. Venkatesh Goud",
    company: "Petrofac (UAE)",
    role: "Offshore Safety Engineer",
    pkg: "₹18.5 LPA",
    course: "PG Diploma in HSE",
    badge: "Gulf Placed",
    image: "/images/placement-graduate-worksite.webp",
  },
  {
    name: "T. Rajesh Kumar",
    company: "Hetero Drugs",
    role: "EHS Plant Trainee",
    pkg: "₹4.8 LPA",
    course: "DFS 2025 Batch",
    badge: "Chemical SEZ",
    image: "/images/gallery/campus-drive/campus-drive-4.webp",
  },
];

// Qualification Matcher
const QUALIFICATIONS = [
  {
    id: "10th-12th",
    label: "10th / 12th Pass",
    course: "Diploma in Fire & Safety (DFS)",
    duration: "1 Year",
    pkg: "₹3.5 L – ₹4.8 L / yr",
    slug: "diploma-in-fire-safety",
    highlights: [
      "NSDC & Skill India Approved",
      "Practical Fire Yard Drills Included",
    ],
  },
  {
    id: "graduate",
    label: "Any Graduate (B.Sc/B.Com/B.A)",
    course: "Advanced Diploma in Industrial Safety (ADIS)",
    duration: "12 Months",
    pkg: "₹5.5 L – ₹8.5 L / yr",
    slug: "advanced-diploma-in-industrial-safety-adis",
    highlights: [
      "Factories Act Statutory Qualification",
      "Direct Hyderabad Pharma Hiring",
    ],
  },
  {
    id: "engineering",
    label: "B.Tech / Diploma",
    course: "PG Diploma in HSE (PG DHSE)",
    duration: "1 Year",
    pkg: "₹6.5 L – ₹12.0 L / yr",
    slug: "pg-diploma-in-health-safety-environment-pg-dhse",
    highlights: [
      "Gulf Petrochemical & Oil/Gas Eligibility",
      "ISO 45001 Auditor Training",
    ],
  },
  {
    id: "working-pro",
    label: "Working Professional",
    course: "PG Diploma in Fire Safety (Hybrid)",
    duration: "Weekend Batch",
    pkg: "₹14.0 L – ₹22.0 L / yr (Gulf)",
    slug: "pg-diploma-in-fire-safety-pg-dfs",
    highlights: [
      "Flexible Hybrid Sessions",
      "International Safety Officer Placement",
    ],
  },
];

export function HyderabadPageView({
  courses,
  faqs,
}: {
  courses: Course[];
  faqs: { question: string; answer: string }[];
}) {
  const [selectedQualification, setSelectedQualification] = useState(
    QUALIFICATIONS[0].id,
  );
  const [experienceYears, setExperienceYears] = useState<number>(2);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const matched =
    QUALIFICATIONS.find((q) => q.id === selectedQualification) ||
    QUALIFICATIONS[0];

  // Dynamic Salary Calculations based on Experience Slider
  const hydSalaryMin = (3.2 + experienceYears * 1.4).toFixed(1);
  const hydSalaryMax = (4.5 + experienceYears * 1.8).toFixed(1);
  const gulfSalaryMin = (8.5 + experienceYears * 2.8).toFixed(1);
  const gulfSalaryMax = (12.0 + experienceYears * 3.4).toFixed(1);

  const getRoleByExperience = (years: number) => {
    if (years <= 1) return "Site Safety Supervisor / Trainee";
    if (years <= 4) return "Industrial Safety Officer (EHS)";
    if (years <= 7) return "Senior Plant Safety Engineer";
    return "Chief EHS Manager / International HSE Lead";
  };

  return (
    <article className="min-h-screen bg-white text-slate-900 selection:bg-primary/20">
      {/* =========================================================================
          1. BESPOKE HYDERABAD REGIONAL COMMAND HERO (Unique Multi-Card Bento Hub)
         ========================================================================= */}
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,16,46,0.06),transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Bold Editorial & Regional Directives */}
            <div className="lg:col-span-7 space-y-6">
              {/* Upgraded Authority Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                <span>
                  India&apos;s Leader in Fire &amp; Industrial Safety
                  Organization
                </span>
              </div>

              {/* Unique Dynamic Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Fire &amp; Industrial Safety Course in{" "}
                <span className="font-serif italic font-normal text-primary">
                  Hyderabad
                </span>
              </h1>

              {/* Concise Authority Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
                Government-approved NSDC safety certifications with Asia&apos;s
                dedicated practical fire training yard drills and 100% placement
                track record.
              </p>

              {/* Micro-Features Row */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>Ameerpet Regional Campus</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>Genome Valley Pharma SEZ Hiring</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>3 Min from Metro</span>
                </span>
              </div>

              {/* 3 Metric Counters */}
              <div className="grid grid-cols-3 gap-4 pt-3 border-y border-slate-200 py-5 max-w-xl">
                <div>
                  <p className="font-display text-3xl sm:text-4xl font-black text-slate-900">
                    45,000+
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Officers Placed
                  </p>
                </div>
                <div className="border-x border-slate-200 px-4">
                  <p className="font-display text-3xl sm:text-4xl font-black text-amber-500">
                    4.9 ★
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Google Reviews
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl sm:text-4xl font-black text-primary">
                    25+ Yrs
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    National Legacy
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/25 transition-all duration-200 hover:scale-105"
                >
                  <span>Chat on WhatsApp</span>
                  <ChevronRight className="h-4 w-4" />
                </a>

                <a
                  href={LOCAL_TEL}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{LOCAL_PHONE}</span>
                </a>

                <Link
                  href="/admissions"
                  className="cursor-pointer inline-flex items-center rounded-full bg-primary hover:bg-primary/90 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:scale-105"
                >
                  Apply 2026 Batch
                </Link>
              </div>
            </div>

            {/* Right Column: Unique Multi-Layer Visual Bento Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl border-2 border-slate-200 bg-white p-3 shadow-2xl space-y-3 overflow-hidden">
                {/* Main Hero Visual: High-Rise Rope Rescue & Fire Yard Drill */}
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-900 group">
                  <Image
                    src="/images/gallery/practical-training-yard/practical-training-yard-14.webp"
                    alt="NIFS Practical High-Rise Rope Rescue Training Yard"
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Status Overlay */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-white/20">
                    <span className="h-2 w-2 rounded-full bg-[#25D366] animate-ping" />
                    <span>Live Drill: 15m Height Safety Scaffolding</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                      Ground Training Excellence
                    </p>
                    <h3 className="text-base font-bold">
                      Asia&apos;s Dedicated Fire &amp; Hazmat Training Yard
                    </h3>
                  </div>
                </div>

                {/* Sub-Bento Row: 2 Interactive Micro Cards */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Micro Card 1: SCBA Breathing Apparatus Chamber */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 p-3 bg-slate-50 flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Flame className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        SCBA Smoke Chamber
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Zero-visibility confined space toxic gas rescue drills.
                    </p>
                  </div>

                  {/* Micro Card 2: Next Batch Countdown */}
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3 flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-600 shrink-0">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-bold text-amber-900 leading-tight">
                        Next Batch: 15th Sept
                      </p>
                    </div>
                    <p className="text-[11px] font-semibold text-amber-800 mt-2">
                      8 Seats Left for Ameerpet Center
                    </p>
                  </div>
                </div>

                {/* Floating Rating Pill */}
                <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-3.5 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white">
                      4.9 ★ Rating
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300">
                    482+ Google Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CIRCULAR EMBLEM RECRUITER MARQUEE
         ========================================================================= */}
      <section className="border-b border-slate-200/80 bg-slate-50/50 py-10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Top Hiring Partners for Hyderabad Safety Officers
          </p>
        </div>

        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <div className="flex shrink-0 items-center gap-8 animate-marquee py-2">
            {[...RECRUITER_LOGOS, ...RECRUITER_LOGOS].map((recruiter, idx) => (
              <div
                key={idx}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-md border-2 border-slate-200 flex items-center justify-center p-5 relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-primary shrink-0 cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={recruiter.logo}
                    alt={recruiter.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PRACTICAL TRAINING YARD CINEMA REEL
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Flame className="h-4 w-4" />
              <span>Real Industrial Training Ground</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Asia&apos;s Dedicated Fire &amp; Hazmat Training Yard
            </h2>
          </div>
          <Link
            href="/gallery/practical-training-yard"
            className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-900 hover:bg-slate-50 transition-all shadow-sm self-start sm:self-auto"
          >
            <span>Explore 40+ Yard Drills</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRACTICAL_YARD_PHOTOS.map((drill, idx) => (
            <TiltWrapper key={idx} className="h-full">
              <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:border-primary">
                <Image
                  src={drill.src}
                  alt={drill.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-primary/95 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow">
                    {drill.tag}
                  </span>
                  <span className="bg-black/60 text-amber-400 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-md">
                    {drill.stat}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {drill.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {drill.subtitle}
                  </p>
                </div>
              </div>
            </TiltWrapper>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. PLACEMENT PROOF CARDS (Real Salaries & Recruiter Badges)
         ========================================================================= */}
      <section className="border-t border-slate-200/80 bg-slate-50/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
              <Award className="h-4 w-4" />
              <span>Placement Outcomes</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Recent Placements from NIFS Hyderabad
            </h2>
            <p className="text-sm text-slate-600">
              Verified campus selections across Fortune 500 manufacturing,
              Hyderabad pharma SEZs, and Gulf projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLACEMENT_PROOFS.map((proof, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-md hover:shadow-2xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative h-48 w-full bg-slate-900">
                  <Image
                    src={proof.image}
                    alt={proof.name}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    {proof.badge}
                  </div>
                  <div className="absolute bottom-3 left-4 text-white">
                    <p className="font-bold text-base">{proof.name}</p>
                    <p className="text-xs text-slate-300">{proof.course}</p>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500">
                        Company
                      </p>
                      <p className="text-xs font-bold text-slate-900">
                        {proof.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-500">
                        Package
                      </p>
                      <p className="text-base font-mono font-black text-[#25D366]">
                        {proof.pkg}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-primary font-semibold">
                    <span>{proof.role}</span>
                    <CheckCircle2 className="h-4 w-4 text-[#25D366]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. DYNAMIC INTERACTIVE SALARY ROI SLIDER
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-red-50/20 p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive Slider Control */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <Sliders className="h-4 w-4" />
                  <span>Dynamic Career ROI Calculator</span>
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Estimate Your EHS Salary Growth
                </h2>
                <p className="text-sm text-slate-600">
                  Drag the experience slider to see live compensation
                  projections in Hyderabad vs. Gulf countries.
                </p>
              </div>

              {/* Slider Component */}
              <div className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Experience Level
                  </span>
                  <span className="text-base font-mono font-bold text-primary bg-primary/10 px-3 py-0.5 rounded-full border border-primary/20">
                    {experienceYears} {experienceYears === 1 ? "Year" : "Years"}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>Fresher (0 Yrs)</span>
                  <span>Mid Level (5 Yrs)</span>
                  <span>Senior Lead (10+ Yrs)</span>
                </div>
              </div>

              {/* Current Role Indicator */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-sm">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase">
                    Expected Job Title
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {getRoleByExperience(experienceYears)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Live Dynamic Salary Cards */}
            <div className="lg:col-span-6 space-y-4">
              {/* Hyderabad Salary Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Hyderabad Package (INR)
                  </span>
                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    Telangana Pharma &amp; IT
                  </span>
                </div>
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                  ₹{hydSalaryMin} L – ₹{hydSalaryMax} L{" "}
                  <span className="text-sm font-normal text-slate-500">
                    / year
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  Includes statutory allowances, EHS bonuses, and PF compliance.
                </p>
              </div>

              {/* Gulf Salary Card (Tax Free) */}
              <div className="rounded-2xl border border-[#25D366]/40 bg-emerald-50/50 p-6 space-y-2 shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Gulf Package (Tax-Free INR Equivalent)
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    UAE / Saudi / Qatar
                  </span>
                </div>
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-emerald-700">
                  ₹{gulfSalaryMin} L – ₹{gulfSalaryMax} L{" "}
                  <span className="text-sm font-normal text-slate-600">
                    / year (Tax-Free)
                  </span>
                </p>
                <p className="text-xs text-slate-600">
                  Includes free company accommodation, medical coverage, and
                  annual flights.
                </p>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white py-4 text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105"
              >
                <span>Book Free Placement Career Counseling</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. BENTO COURSE MATCHER
         ========================================================================= */}
      <section className="border-t border-slate-200/80 bg-slate-50/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
              <Compass className="h-4 w-4" />
              <span>Interactive Course Matcher</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Find Your Ideal Safety Program
            </h2>
            <p className="text-sm text-slate-600">
              Select your qualification to see the recommended
              government-approved course.
            </p>
          </div>

          {/* Qualification Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {QUALIFICATIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => setSelectedQualification(q.id)}
                className={`cursor-pointer rounded-full px-6 py-3 text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedQualification === q.id
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "border border-slate-300 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Matched Bento Card */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
                  Recommended Course
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  {matched.course}
                </h3>

                <div className="space-y-1.5 text-xs">
                  {matched.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-slate-700 font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#25D366] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-semibold pt-2">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-slate-500">Duration:</span>
                    <span className="text-slate-900 font-bold">
                      {matched.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-slate-500">Salary Potential:</span>
                    <span className="text-[#25D366] font-mono font-bold">
                      {matched.pkg}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-6 py-3.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
                >
                  <span>Inquire for 2026 Batch</span>
                </a>
                <Link
                  href={`/courses/${matched.slug}`}
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 py-3.5 text-xs font-bold text-slate-900 transition-all hover:scale-105 shadow-sm"
                >
                  <span>View Full Syllabus</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. GOOGLE MY BUSINESS (GBP) 4.9★ & AMEERPET TRANSIT MAP
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Google Rating Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-600">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>Google Business Profile</span>
                </div>
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Write Review</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <p className="font-display text-4xl sm:text-5xl font-black text-slate-900">
                  4.9
                </p>
                <div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-600 mt-1">
                    482+ Verified Alumni Ratings on Google
                  </p>
                </div>
              </div>

              {/* 2 Verified Reviews */}
              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">
                      K. Sai Praneeth (ADIS)
                    </span>
                    <span className="text-amber-500">5.0 ★</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    &ldquo;Best practical training in Hyderabad. Selected as
                    Junior EHS Officer at Dr. Reddy&apos;s Laboratories.&rdquo;
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">Mohammed Irfan (DFS)</span>
                    <span className="text-amber-500">5.0 ★</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    &ldquo;Live fire drill gave huge confidence. Working with
                    L&T Metro project in Hyderabad.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] px-6 py-4 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
            >
              <span>Message Ameerpet Counseling Desk</span>
            </a>
          </div>

          {/* Right: Ameerpet Transit & Google Map */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                  <MapPin className="h-4 w-4" />
                  <span>Ameerpet Regional Campus</span>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  Mon – Sat: 9 AM – 7 PM
                </span>
              </div>

              {/* Transit Pill */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <Train className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-slate-900">
                    Ameerpet Metro Interchange (Red &amp; Blue Lines)
                  </span>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold border border-primary/20 shrink-0">
                  3 Min Walk
                </span>
              </div>

              {/* Map Frame */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 relative bg-slate-100">
                <iframe
                  title="NIFS Hyderabad Ameerpet Center Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.634629471556!2d78.44562517591782!3d17.43750000160751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c5f2122ef7%3A0x6b6c1674db81d609!2sAmeerpet%2C%20Hyderabad%2C%20Telangana%20500016!5e0!3m2!1sen!2sin!4v1725140000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_NAV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary/90 px-6 py-4 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
            >
              <Navigation className="h-4 w-4" />
              <span>Open in Google Maps Navigation</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. KNOWLEDGE BASE ACCORDIONS
         ========================================================================= */}
      <section className="border-t border-slate-200/80 bg-slate-50/50 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
              <HelpCircle className="h-4 w-4" />
              <span>Direct Knowledge Base</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="cursor-pointer w-full flex items-center justify-between p-5 text-left font-display text-sm sm:text-base font-bold text-slate-900 gap-4 hover:text-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-primary shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FINAL CONVERSION BANNER
         ========================================================================= */}
      <section className="border-t border-slate-200 bg-primary text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 text-center space-y-6 lg:px-10 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/20 border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            Limited Seats Available for 2026 Hyderabad Batch
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Launch Your High-Paying Safety Career from Hyderabad Today
          </h2>

          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Visit our Ameerpet campus or speak directly with our senior
            counseling experts to get course guidance, fee concessions, and
            immediate seat booking.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-white hover:bg-slate-100 px-8 py-4 text-xs sm:text-sm font-bold text-primary shadow-2xl transition-all duration-200 hover:scale-105"
            >
              <span>Instant WhatsApp Consultation</span>
              <ChevronRight className="h-4 w-4" />
            </a>

            <a
              href={LOCAL_TEL}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-black/20 hover:bg-black/30 border border-white/25 px-8 py-4 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:scale-105 backdrop-blur-md"
            >
              <Phone className="h-4 w-4" />
              <span>Call Ameerpet Desk ({LOCAL_PHONE})</span>
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
