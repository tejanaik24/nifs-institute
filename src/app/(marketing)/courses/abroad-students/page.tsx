import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, Globe2, GraduationCap, Award, FileCheck2, Compass } from "lucide-react";
import { AbroadStudentsForm } from "@/components/sections/abroad-students-form";

export const metadata: Metadata = {
  title: "Abroad Students — Study in India Portal | NIFS India",
  description:
    "Admissions for abroad and international students at NIFS India. Ministry of Education Study in India partner for Advance Diploma in Industrial Safety and B.Sc. (Honors).",
  alternates: { canonical: "/courses/abroad-students/" },
};

export default function AbroadStudentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Clean, Elevated Campus Photographic Hero Section */}
      <section className="relative overflow-hidden border-b border-border/80 pt-32 sm:pt-40 md:pt-44 pb-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Navigation Breadcrumb */}
          <div className="mb-6 flex justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-md hover:border-primary/50 hover:text-primary transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to All Courses
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-xs">
              <Globe2 className="h-4 w-4" /> Ministry of Education (GOI) · Study in India
            </div>

            <h1 className="font-display mt-5 text-3xl sm:text-5xl md:text-6xl italic leading-tight text-foreground">
              International &amp; Abroad Student Admissions
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
              Welcome to NIFS India. International students can enroll in our flagship safety engineering programs officially sanctioned under the Government of India&apos;s <em>Study in India</em> initiative.
            </p>

            {/* Quick Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3.5 py-1.5 shadow-xs">
                <Building2 className="h-3.5 w-3.5 text-primary" /> Acharya Nagarjuna University (ANU) Affiliated
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3.5 py-1.5 shadow-xs">
                <GraduationCap className="h-3.5 w-3.5 text-primary" /> 2 Sanctioned International Programs
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3.5 py-1.5 shadow-xs">
                <Award className="h-3.5 w-3.5 text-primary" /> Global Placement Assistance
              </span>
            </div>
          </div>

          {/* Dedicated High-Clarity Showcase Photo Card (Zero blur, full sharpness) */}
          <div className="mt-10 mx-auto max-w-5xl">
            <div className="group relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-border/80 shadow-2xl bg-muted">
              <Image
                src="/images/courses/abroad-hero-campus.jpg"
                alt="International students at prestigious Indian safety engineering university campus"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 1100px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Subtle bottom vignette only so text badge is readable, leaving 85% of photo 100% crisp */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm">
                    NIFS India International Training Campus · Recognized Safety Leaders
                  </span>
                </div>
                <span className="hidden sm:inline-block rounded-md bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                  Study in India Partner
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Form Area */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">
        <AbroadStudentsForm />
      </section>

      {/* Course Details Deep Dive Section with Realistic Imagery */}
      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6 lg:px-8 border-t border-border/80 pt-20">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Sanctioned Curriculums
          </span>
          <h2 className="font-display mt-2 text-3xl italic sm:text-4xl">
            Two Premier International Programs
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Specially structured for international students desiring recognized qualifications built around Indian statutory safety requirements.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Card 1: ADIS with Industrial Safety Inspection Image */}
          <div className="group overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-xl flex flex-col justify-between">
            <div>
              {/* Realistic Course Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-muted">
                <Image
                  src="/images/courses/abroad-adis-inspection.jpg"
                  alt="Industrial safety engineer inspecting hazard control equipment"
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="rounded-lg bg-primary/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md backdrop-blur-md">
                    1 Year Program
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-semibold text-foreground/90 bg-background/90 px-2.5 py-1 rounded-md backdrop-blur-md shadow-xs">
                    Technical Advanced Diploma
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7">
                <h3 className="font-display text-2xl italic leading-tight text-foreground">
                  Diploma - Advance Diploma in Industrial Safety
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  The premier statutory credential for safety officers across manufacturing, oil &amp; gas, infrastructure, and heavy engineering plants. Covers hazard identification, risk assessment (HIRA), chemical safety, and industrial hygiene.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-foreground/90">
                  <li className="flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Recognized under statutory Factory Acts &amp; HSE regulations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Intensive hands-on emergency evacuation &amp; firefighting drills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Ideal for foreign engineering graduates and safety professionals</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-7 pt-0 border-t border-border/60 mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Official Code on SII Portal</span>
                <span className="font-semibold text-primary">Sanctioned</span>
              </div>
            </div>
          </div>

          {/* Card 2: B.Sc. Honors with Fire Command Vehicle & Tower Image */}
          <div className="group overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-xl flex flex-col justify-between">
            <div>
              {/* Realistic Course Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-muted">
                <Image
                  src="/images/courses/abroad-bsc-fire-safety.jpg"
                  alt="Fire safety officer with mobile command vehicle and training tower"
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="rounded-lg bg-primary/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md backdrop-blur-md">
                    4 Years Degree
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-semibold text-foreground/90 bg-background/90 px-2.5 py-1 rounded-md backdrop-blur-md shadow-xs">
                    Undergraduate Honours Degree
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7">
                <h3 className="font-display text-2xl italic leading-tight text-foreground">
                  B.Sc. - Honors (Fire and Industrial Safety)
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  A full 4-year university honours degree affiliated with Acharya Nagarjuna University. Combines rigorous science education with real-world fire engineering, disaster management, structural safety, and occupational health administration.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-foreground/90">
                  <li className="flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-primary shrink-0" />
                    <span>UGC Recognized full university degree with global academic equivalence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Eligible for Master&apos;s degrees globally and overseas corporate safety posts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Comprehensive 4-year curriculum with internship placements</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-7 pt-0 border-t border-border/60 mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Official Code on SII Portal</span>
                <span className="font-semibold text-primary">Sanctioned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the Process Works */}
      <section className="mx-auto mt-28 max-w-5xl px-6 lg:px-10">
        <div className="rounded-3xl border border-border bg-muted/40 p-8 sm:p-12 shadow-sm">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Compass className="h-3.5 w-3.5" /> 3-Step Enrollment Guide
            </span>
            <h2 className="font-display mt-2 text-2xl italic sm:text-3xl text-foreground">
              How International Admission Works
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm italic text-primary font-bold">
                1
              </span>
              <h4 className="mt-4 font-semibold text-sm">Register Profile</h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Enter your name, international contact number, email, country, and state in the form above.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm italic text-primary font-bold">
                2
              </span>
              <h4 className="mt-4 font-semibold text-sm">Study in India Portal</h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                You will be diverted directly to the Government of India portal to inspect course details and university sanction.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm italic text-primary font-bold">
                3
              </span>
              <h4 className="mt-4 font-semibold text-sm">Visa &amp; Enrollment</h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                NIFS International Desk issues your provisional admission letter to facilitate Indian Student Visa processing.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center text-xs text-muted-foreground">
            Need immediate international admission counseling? Contact our dedicated desk via WhatsApp at{" "}
            <a
              href="https://wa.me/918374340999?text=Hi%20NIFS%2C%20I%20am%20an%20international%20student%20inquiring%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary underline hover:text-primary/80 transition-colors"
            >
              +91 8374 340 999
            </a>{" "}
            or email{" "}
            <a href="mailto:headoffice@nifsindia.com" className="font-bold text-primary underline hover:text-primary/80 transition-colors">
              headoffice@nifsindia.com
            </a>
            .
          </div>
        </div>
      </section>
    </div>
  );
}
