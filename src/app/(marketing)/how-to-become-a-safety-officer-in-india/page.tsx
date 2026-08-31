import { BreadcrumbSchema, FAQSchema } from "@/lib/seo/schema";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "How to Become a Safety Officer in India (2026 Step-by-Step Career Guide) | NIFS India",
  description:
    "Complete 2026 step-by-step guide on how to become a certified Safety Officer in India. Eligibility after 10th/12th/Graduation, top courses (ADIS, DFS, NEBOSH), training duration, salary (₹3L–₹25L/yr), and 100% placement roadmap.",
  alternates: { canonical: "/how-to-become-a-safety-officer-in-india/" },
  openGraph: {
    title: "How to Become a Safety Officer in India (2026 Guide) — NIFS India",
    description:
      "Step-by-step roadmap to become a certified Industrial Safety Officer. Eligibility, top diploma courses, salary brackets, and top recruiter insights.",
    url: "https://nifsindia.net/how-to-become-a-safety-officer-in-india/",
    type: "article",
  },
};

const faqs = [
  {
    question:
      "What is the minimum qualification required to become a Safety Officer in India?",
    answer:
      "The minimum qualification depends on the course tier. You can start after 10th or 12th (any stream) with a Certificate or Diploma in Fire & Safety (DFS). For core Industrial Safety Officer posts in registered factories and oil refineries, an Advanced Diploma in Industrial Safety (ADIS) after a 3-year Polytechnic Diploma or B.Sc/B.Tech degree is legally mandated under the Factories Act, 1948.",
  },
  {
    question:
      "How many months does it take to become a certified Safety Officer?",
    answer:
      "A baseline Diploma in Fire & Safety (DFS) or Advanced Diploma in Industrial Safety (ADIS) takes 12 months (1 year). Short-term international certifications like NEBOSH IGC require 10 to 14 days of modular study, while degree programs like B.Sc in Fire & Industrial Safety take 3 years.",
  },
  {
    question:
      "What is the average starting salary of a Safety Officer in India in 2026?",
    answer:
      "A fresher safety officer in India earns between ₹2,50,000 and ₹4,20,000 per annum (₹20,000 to ₹35,000 per month). With 3 to 5 years of industrial experience and international certifications like NEBOSH IGC, salaries rise to ₹6,00,000 – ₹10,00,000 per annum in India and ₹18,00,000 – ₹35,00,000 per annum in Gulf countries (UAE, Saudi Arabia, Qatar).",
  },
  {
    question: "Is NEBOSH compulsory to become a Safety Officer in India?",
    answer:
      "No, NEBOSH is not legally compulsory for Indian domestic factory jobs where state-approved diplomas (like SBTET ADIS or NSDC-approved DFS) are the statutory requirement. However, NEBOSH IGC is mandatory for lucrative Gulf/Middle East jobs, offshore oil rigs, and Fortune 500 multinationals operating in India.",
  },
  {
    question: "Can Arts and Commerce students become Safety Officers?",
    answer:
      "Yes. Students from Arts and Commerce backgrounds who have completed 10+2 are fully eligible for Diploma in Fire & Safety (DFS) and Certificate Courses. They can build successful careers in construction safety, hospitality safety, facility management, and logistics EHS.",
  },
  {
    question: "Which institute is best for Safety Officer training in India?",
    answer:
      "National Institute of Fire and Safety (NIFS) is India's leading training institution with over 25 years of educational excellence, 70+ centers across 24 states, government approvals (NSDC, Skill India, university affiliations), Asia's dedicated practical training yard, and over 45,000 placed alumni in top recruiters like L&T, Adani, ITC, and Amazon.",
  },
];

export default function HowToBecomeSafetyOfficerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Guides", url: "https://nifsindia.net/courses/" },
          {
            name: "How to Become a Safety Officer in India",
            url: "https://nifsindia.net/how-to-become-a-safety-officer-in-india/",
          },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <article className="pt-32 lg:pt-36 bg-background text-foreground">
        {/* Header / Hero */}
        <header className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-4 w-4" /> 2026 Complete Career Blueprint
          </div>
          <h1 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            How to Become a{" "}
            <span className="text-primary italic">Safety Officer</span> in
            India: Step-by-Step Guide
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            By{" "}
            <strong className="text-foreground">
              National Institute of Fire and Safety (NIFS India)
            </strong>{" "}
            • Updated for 2026 Industry Regulations &amp; Hiring Standards
          </p>

          {/* Quick AI Answer Box */}
          <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> Quick Summary: 5 Steps
              to Become a Safety Officer in India
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  1. Eligibility
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  10th, 12th (Any Stream), Diploma or B.Tech
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  2. Core Course
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  ADIS / DFS / B.Sc Fire &amp; Safety
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  3. Duration
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  1 Year (Diploma) to 3 Years (Degree)
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  4. Starting Salary
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹3.0 Lakh – ₹4.5 Lakh / Year (India)
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <strong>Direct Answer:</strong> To become a Safety Officer in
              India, you must complete 10+2 or a technical diploma/degree,
              enroll in a government-approved Fire &amp; Industrial Safety
              qualification such as the{" "}
              <Link
                href="/courses/advanced-diploma-in-industrial-safety-adis/"
                className="text-primary underline font-medium"
              >
                Advanced Diploma in Industrial Safety (ADIS)
              </Link>{" "}
              or{" "}
              <Link
                href="/courses/diploma-in-fire-safety/"
                className="text-primary underline font-medium"
              >
                Diploma in Fire &amp; Safety (DFS)
              </Link>
              , undergo mandatory hands-on drills at a practical training yard,
              and clear campus recruitment interviews with top manufacturing,
              oil &amp; gas, or construction corporations.
            </p>
          </div>
        </header>

        {/* Content Body */}
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10 space-y-12">
          {/* Section 1: Who is a Safety Officer? */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              What Does a Safety Officer Do in India?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              A <strong>Safety Officer</strong> (also known as an Environmental
              Health &amp; Safety / EHS Officer or HSE Engineer) is a legally
              required professional responsible for preventing workplace
              accidents, managing fire hazards, conducting emergency drills,
              enforcing government safety laws (Factories Act, 1948 and OSH Code
              2026), and ensuring zero-harm environments across hazardous work
              facilities.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              In India, under{" "}
              <strong>Section 40-B of The Factories Act, 1948</strong>, every
              factory employing 1,000 or more workers—or any workplace handling
              hazardous processes with 50+ workers (such as chemical refineries,
              steel mills, pharmaceutical plants, power stations, and
              construction megaprojects)—is <strong>legally mandated</strong> to
              appoint qualified Safety Officers. This statutory legal
              requirement creates a recession-proof, evergreen demand for
              trained safety professionals across India and abroad.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-xl border border-border bg-card">
                <Building2 className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-bold text-base text-foreground">
                  Hazard Control &amp; Audits
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Identifying plant risks, electrical hazards, chemical leaks,
                  and conducting daily toolbox talks.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-bold text-base text-foreground">
                  Statutory Legal Compliance
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Filing safety inspection records, ISO 45001 auditing, and
                  reporting to State Factory Inspectorates.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <Award className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-bold text-base text-foreground">
                  Emergency Response Drills
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Operating industrial fire tenders, breathing apparatus,
                  chemical spill containment, and rescue drills.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Step by Step Roadmap */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Step-by-Step Roadmap: How to Become a Certified Safety Officer in
              2026
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="border-l-4 border-primary pl-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    1
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Step 1: Check Your Academic Eligibility
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Unlike conventional engineering branches that require
                  competitive entrance exams like JEE, the safety management
                  field offers accessible entry pathways for multiple
                  educational backgrounds:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                  <li>
                    <strong>After 10th Standard (SSC):</strong> Eligible for
                    Certificate in Fire &amp; Safety (CCFS) or 1-Year Diploma in
                    Fire &amp; Safety (DFS) to start as a Site Safety Assistant.
                  </li>
                  <li>
                    <strong>
                      After 12th Standard (10+2 Science / Arts / Commerce):
                    </strong>{" "}
                    Eligible for 1-Year Diploma programs (DFS, DHSE) or 3-Year{" "}
                    <Link
                      href="/courses/b-sc-in-fire-industrial-safety/"
                      className="text-primary underline"
                    >
                      B.Sc in Fire &amp; Industrial Safety
                    </Link>
                    .
                  </li>
                  <li>
                    <strong>After Diploma / B.Tech / B.Sc Degree:</strong>{" "}
                    Eligible for the flagship 1-Year{" "}
                    <Link
                      href="/courses/advanced-diploma-in-industrial-safety-adis/"
                      className="text-primary underline"
                    >
                      Advanced Diploma in Industrial Safety (ADIS)
                    </Link>{" "}
                    or Post Graduate Diploma (PG DFS).
                  </li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="border-l-4 border-primary pl-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    2
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Step 2: Choose the Right Government-Approved Course
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Always ensure that your course is affiliated with a recognized
                  board (State Board of Technical Education like SBTET-AP, NSDC
                  / Skill India, or UGC-recognized Universities like Acharya
                  Nagarjuna University). Unrecognized online certificates will
                  NOT be accepted by State Factory Inspectorates.
                </p>
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-sm border-collapse border border-border">
                    <thead className="bg-muted text-foreground">
                      <tr>
                        <th className="p-3 border border-border">
                          Course Name
                        </th>
                        <th className="p-3 border border-border">Duration</th>
                        <th className="p-3 border border-border">
                          Eligibility
                        </th>
                        <th className="p-3 border border-border">
                          Target Career Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground divide-y divide-border">
                      <tr>
                        <td className="p-3 font-medium text-foreground">
                          ADIS (Advanced Diploma in Industrial Safety)
                        </td>
                        <td className="p-3">12 Months</td>
                        <td className="p-3">10+2 / Diploma / Degree</td>
                        <td className="p-3">
                          Industrial Safety Officer, Plant EHS Manager
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">
                          Diploma in Fire &amp; Safety (DFS)
                        </td>
                        <td className="p-3">12 Months</td>
                        <td className="p-3">10+2 (Any Stream) / ITI</td>
                        <td className="p-3">
                          Fire Safety Officer, Site Safety Supervisor
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">
                          B.Sc in Fire &amp; Industrial Safety
                        </td>
                        <td className="p-3">3 Years</td>
                        <td className="p-3">10+2 (Science / MPC / BiPC)</td>
                        <td className="p-3">
                          Senior Safety Engineer, EHS Executive
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">
                          NEBOSH IGC (International General Certificate)
                        </td>
                        <td className="p-3">10–14 Days</td>
                        <td className="p-3">10+2 / Degree / HSE Working</td>
                        <td className="p-3">
                          Gulf Safety Officer, Offshore HSE Specialist
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border-l-4 border-primary pl-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    3
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Step 3: Complete Rigorous Practical Ground Training
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Industrial safety cannot be learned purely inside a classroom.
                  Leading recruiters like Adani, L&amp;T, Reliance, and ITC look
                  for candidates who have physically operated firefighting
                  machinery. At NIFS India, students train at our dedicated{" "}
                  <Link
                    href="/gallery/practical-training-yard/"
                    className="text-primary underline font-medium"
                  >
                    Practical Fire Training Yard
                  </Link>
                  , mastering:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                  <li>
                    Live Class A, B, C, D fire suppression drills with foam,
                    CO₂, and dry chemical powder extinguishers.
                  </li>
                  <li>
                    Breathing Apparatus (SCBA) operation in dense smoke
                    chambers.
                  </li>
                  <li>
                    High-altitude rescue, scaffolding safety, and rope access
                    techniques.
                  </li>
                  <li>
                    Industrial hydrant systems, motorized pump operation, and
                    confined space extrication.
                  </li>
                </ul>
              </div>

              {/* Step 4 */}
              <div className="border-l-4 border-primary pl-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    4
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Step 4: Acquire International Certifications (NEBOSH / IOSH)
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  If your goal is to secure high-paying employment in Dubai,
                  Saudi Arabia (Aramco projects), Qatar, Kuwait, or
                  multinational oil rigs, pairing your Indian statutory diploma
                  with{" "}
                  <Link
                    href="/courses/nebosh-igc/"
                    className="text-primary underline font-medium"
                  >
                    NEBOSH IGC
                  </Link>{" "}
                  multiplies your earning potential. NEBOSH certifies your
                  mastery of UK/international risk assessment standards and is
                  the mandatory recruitment benchmark for global engineering
                  firms.
                </p>
              </div>

              {/* Step 5 */}
              <div className="border-l-4 border-primary pl-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    5
                  </span>
                  <h3 className="text-xl font-bold text-foreground">
                    Step 5: Campus Placement &amp; Industry Internships
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Upon completing your course examinations, participate in
                  direct campus hiring drives. Over 45,000 NIFS alumni are
                  currently employed across India and the Middle East. Initial
                  roles start as Safety Trainee or HSE Assistant, rapidly
                  progressing to full Safety Officer within 12–18 months.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Salary Breakdown */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Safety Officer Salary Structure in India (2026 Benchmark)
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Industrial safety offers one of the steepest salary escalation
              curves among technical vocational careers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="rounded-2xl border border-border bg-card p-6 text-center space-y-2">
                <span className="text-xs font-semibold uppercase text-primary tracking-wider">
                  Entry Level (0–2 Yrs)
                </span>
                <p className="text-3xl font-black text-foreground">
                  ₹2.5L – ₹4.5L
                </p>
                <p className="text-xs text-muted-foreground">
                  Per Annum (₹20,000 – ₹38,000/mo)
                </p>
                <p className="text-xs text-muted-foreground pt-2">
                  Roles: Junior Safety Officer, Site Safety Trainee, Fire
                  Inspector
                </p>
              </div>

              <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6 text-center space-y-2">
                <span className="text-xs font-semibold uppercase text-primary tracking-wider">
                  Mid-Level (3–6 Yrs)
                </span>
                <p className="text-3xl font-black text-primary">
                  ₹5.5L – ₹9.5L
                </p>
                <p className="text-xs text-muted-foreground">
                  Per Annum (₹45,000 – ₹80,000/mo)
                </p>
                <p className="text-xs text-muted-foreground pt-2">
                  Roles: Safety Officer, EHS Coordinator, Fire &amp; Safety
                  Engineer
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 text-center space-y-2">
                <span className="text-xs font-semibold uppercase text-primary tracking-wider">
                  Gulf / Middle East
                </span>
                <p className="text-3xl font-black text-foreground">
                  ₹18L – ₹36L
                </p>
                <p className="text-xs text-muted-foreground">
                  Per Annum (AED 8,000 – 16,000/mo Tax-Free)
                </p>
                <p className="text-xs text-muted-foreground pt-2">
                  Roles: HSE Engineer, Offshore Safety Specialist (NEBOSH)
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Top Recruiting Industries */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Top Industries Hiring Safety Officers in India
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Oil & Gas Refineries",
                  companies: "IOCL, BPCL, HPCL, Reliance, ONGC, Saudi Aramco",
                },
                {
                  name: "Construction & Infrastructure",
                  companies: "L&T, Tata Projects, Shapoorji Pallonji, MEIL",
                },
                {
                  name: "Power Plants & Heavy Industry",
                  companies: "NTPC, Adani Power, Tata Steel, JSW",
                },
                {
                  name: "Manufacturing & Automotive",
                  companies: "Hyundai, Maruti Suzuki, Mahindra, Hero MotoCorp",
                },
                {
                  name: "Chemical & Pharmaceuticals",
                  companies: "Dr. Reddy's, Sun Pharma, Cipla, Divi's Labs",
                },
                {
                  name: "Data Centers & Logistics",
                  companies:
                    "Amazon, Flipkart, CtrlS, AdaniConneX, Adani Ports",
                },
              ].map((ind) => (
                <div
                  key={ind.name}
                  className="p-4 rounded-xl border border-border bg-muted/40"
                >
                  <h3 className="font-bold text-sm text-foreground">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Top Employers:</strong> {ind.companies}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Why Choose NIFS India */}
          <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 sm:p-10 space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Why Study at National Institute of Fire and Safety (NIFS India)?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Established over 25 years ago, NIFS is India&apos;s most trusted
              brand in occupational safety education:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>70+ Centers Nationwide:</strong> Accessible training
                  across 24 states in India.
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>45,000+ Placements:</strong> Largest alumni network
                  working across Fortune 500 companies.
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Government Approvals:</strong> NSDC, Skill India, and
                  State Board affiliations.
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Dedicated Practical Yard:</strong> Real hands-on live
                  firefighting and rescue simulations.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/918374340999?text=Hi%20NIFS%2C%20I%20read%20the%20Safety%20Officer%20career%20guide%20and%20want%20counseling%20on%20how%20to%20enroll."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                </svg>
                <span>Chat with Senior Counselor on WhatsApp</span>
              </a>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-7 py-3.5 text-sm sm:text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all"
              >
                <span>Apply for Admission Online</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Section 6: Frequently Asked Questions */}
          <section className="space-y-6 pt-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" /> Frequently Asked
              Questions (FAQs)
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 space-y-2"
                >
                  <h3 className="font-bold text-base sm:text-lg text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
