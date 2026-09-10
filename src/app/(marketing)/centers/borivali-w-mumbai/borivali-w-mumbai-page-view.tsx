"use client";

import { TiltWrapper } from "@/components/motion/tilt-wrapper";
import { getCenterGallery } from "@/lib/data/center-gallery";
import type { Course } from "@/lib/data/courses";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Compass,
  Copy,
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

const LOCAL_PHONE = "+91-9702-978-649";
const LOCAL_TEL = "tel:+919702978649";
const WHATSAPP_URL =
  "https://wa.me/918374340999?text=" +
  encodeURIComponent(
    "Hi NIFS, I am interested in Fire and Safety courses at the Borivali-W (Mumbai) center. Please share fee structure and batch details.",
  );
const GOOGLE_MAPS_NAV_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("NIFS Fire and Safety Borivali-W (Mumbai) Star Plaza Tower, 17th Floor, Office No. 1704, Opp. Borivali Station East, Above Burger King, MM Mithaiwala, Borivali East – 400066");
const GOOGLE_REVIEW_URL = "https://g.page/r/nifs-borivali-w-mumbai/review";
const CENTER_ADDRESS = "Star Plaza Tower, 17th Floor, Office No. 1704, Opp. Borivali Station East, Above Burger King, MM Mithaiwala, Borivali East – 400066";

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

const centerGallery = getCenterGallery("borivali-w-mumbai");
const PRACTICAL_YARD_PHOTOS = centerGallery.trainingYardPhotos;

const PLACEMENT_PROOFS = [
  {
    name: centerGallery.placementNames[0],
    company: "Tata Projects Ltd.",
    role: "Safety Officer",
    pkg: "₹7.2 LPA",
    course: "ADIS (1-Year)",
    badge: "MIDC Chemical",
    image:
      centerGallery.placementPhotos[0]?.src ||
      "/images/gallery/campus-drive/campus-drive-1.webp",
  },
  {
    name: centerGallery.placementNames[1],
    company: "Reliance Industries",
    role: "EHS Supervisor",
    pkg: "₹5.6 LPA",
    course: "Diploma in Fire Safety",
    badge: "Mega Infrastructure",
    image:
      centerGallery.placementPhotos[1]?.src ||
      "/images/gallery/campus-drive/campus-drive-8.webp",
  },
  {
    name: centerGallery.placementNames[2],
    company: "Shapoorji Pallonji",
    role: "International HSE Lead",
    pkg: "₹18.0 LPA",
    course: "PG Diploma in HSE",
    badge: "Gulf Placed",
    image:
      centerGallery.placementPhotos[2]?.src ||
      "/images/placement-graduate-worksite.webp",
  },
  {
    name: centerGallery.placementNames[3],
    company: "Godrej Industries",
    role: "Fire Safety Trainee",
    pkg: "₹5.0 LPA",
    course: "DFS 2025 Batch",
    badge: "Manufacturing",
    image:
      centerGallery.placementPhotos[3]?.src ||
      "/images/gallery/campus-drive/campus-drive-4.webp",
  },
];

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
      "Direct Manufacturing & Plant Hiring",
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

export function BorivaliWMumbaiPageView({
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
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CENTER_ADDRESS);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const matched =
    QUALIFICATIONS.find((q) => q.id === selectedQualification) ||
    QUALIFICATIONS[0];

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
      {/* 1. BESPOKE REGIONAL COMMAND HERO */}
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,16,46,0.06),transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                <span>45,000+ Safety Officers Placed Since 2004</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Borivali&apos;s Most Trusted{" "}
                <span className="font-serif italic font-normal text-primary">
                  Fire &amp; Industrial Safety
                </span>{" "}
                Course
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
                Government-approved NSDC safety certifications with Asia&apos;s
                dedicated practical fire training yard drills and 100% placement
                track record in Maharashtra.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>Borivali-W (Mumbai) Campus</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>Top Industrial Belt Hiring</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>Practical Yard Drills</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-3 border-y border-slate-200 py-5 max-w-xl">
                <div>
                  <p className="font-display text-3xl sm:text-4xl font-black text-slate-900">
                    45K+
                  </p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    Graduates Placed
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl sm:text-4xl font-black text-primary">
                    100%
                  </p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    Placement Support
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl sm:text-4xl font-black text-slate-900">
                    4.9★
                  </p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    Google Verified
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] px-7 py-4 text-sm font-bold text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  <span>Connect with Borivali-W (Mumbai) Desk</span>
                </a>
                <a
                  href={LOCAL_TEL}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 bg-white hover:bg-slate-50 px-7 py-4 text-sm font-bold text-slate-900 transition-all hover:scale-105 shadow-sm"
                >
                  <span>Call {LOCAL_PHONE}</span>
                </a>
              </div>
            </div>

            {/* HERO RIGHT: QUICK APPLY CARD */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    <Flame className="h-3.5 w-3.5" />
                    <span>2026 Admissions Open in Borivali-W (Mumbai)</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Book Free Counseling Session
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Get full fee breakdown, government approval certificates,
                    and previous batch placement record.
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">
                      Next Batch Start:
                    </span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>Upcoming Monday</span>
                    </span>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">
                      Eligible Streams:
                    </span>
                    <span className="font-bold text-slate-900">
                      10th, 12th, Any Graduate, ITI/Diploma
                    </span>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">
                      Mode:
                    </span>
                    <span className="font-bold text-primary">
                      Regular + Practical Training Ground
                    </span>
                  </div>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-4 text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105"
                >
                  <span>Apply Online via WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
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
            Top Hiring Partners for Borivali-W (Mumbai) Safety Officers
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

      {/* 3. PRACTICAL TRAINING YARD CINEMA REEL */}
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

      {/* 4. PLACEMENT PROOF CARDS */}
      <section className="border-t border-slate-200/80 bg-slate-50/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
              <Award className="h-4 w-4" />
              <span>Placement Outcomes</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Recent Placements from NIFS Borivali-W (Mumbai)
            </h2>
            <p className="text-sm text-slate-600">
              Verified campus selections across Fortune 500 manufacturing,
              core infrastructure plants, and Gulf projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLACEMENT_PROOFS.map((proof, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-md hover:shadow-2xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
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

      {/* 5. DYNAMIC INTERACTIVE SALARY ROI SLIDER */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-red-50/20 p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
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
                  projections in Borivali-W (Mumbai) vs. Gulf countries.
                </p>
              </div>

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

            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Borivali-W (Mumbai) Package (INR)
                  </span>
                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    Maharashtra MIDC & Infrastructure
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

      {/* 6. BENTO COURSE MATCHER */}
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

      {/* 7. GOOGLE MY BUSINESS & MAP */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
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
                    428+ Verified Alumni Ratings on Google
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">
                      Suresh Reddy (ADIS)
                    </span>
                    <span className="text-amber-500">5.0 ★</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    &ldquo;Best practical training in Borivali-W (Mumbai). Live fire drills gave huge confidence. Selected as Safety Officer.&rdquo;
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">K. Ramesh (DFS)</span>
                    <span className="text-amber-500">5.0 ★</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    &ldquo;Top faculty with deep industry experience. Live practical yard sessions were outstanding.&rdquo;
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
              <span>Message Borivali-W (Mumbai) Counseling Desk</span>
            </a>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                  <MapPin className="h-4 w-4" />
                  <span>Borivali-W (Mumbai) Regional Campus</span>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  Mon – Sat: 9 AM – 7 PM
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <Train className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-slate-900">
                    Nearest Suburban Station / Metro
                  </span>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold border border-primary/20 shrink-0">
                  10 Min Drive
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 relative bg-slate-100 flex items-center justify-center text-center p-6">
                <div className="space-y-2">
                  <MapPin className="h-8 w-8 text-primary mx-auto animate-bounce" />
                  <p className="font-bold text-slate-900 text-sm">
                    NIFS Borivali-W (Mumbai) Regional Campus
                  </p>
                  <p className="text-xs text-slate-500 max-w-md">
                    {CENTER_ADDRESS}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                      Full Campus Address
                    </p>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {CENTER_ADDRESS}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="cursor-pointer shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-sm transition-all active:scale-95"
                    aria-label="Copy full campus address"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#25D366]" />
                        <span className="text-[#25D366]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-500" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
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

      {/* 8. KNOWLEDGE BASE ACCORDIONS */}
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
                      className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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

      {/* 9. STICKY / BOTTOM CTA */}
      <section className="border-t border-slate-200 bg-slate-900 text-white py-16">
        <div className="mx-auto max-w-5xl px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <span>Direct Campus Desk</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Start Your Safety Career in Borivali-W (Mumbai) Today
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get government-recognized certifications with dedicated practical fire
            ground drills and 100% placement track record.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] px-8 py-4 text-sm font-bold text-white shadow-xl transition-all hover:scale-105"
            >
              <span>Chat with Borivali-W (Mumbai) Counselor</span>
            </a>
            <a
              href={LOCAL_TEL}
              className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              <span>Call {LOCAL_PHONE}</span>
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
