import { BreadcrumbSchema, FAQSchema } from "@/lib/seo/schema";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Safety Officer Course After 12th (2026 Eligibility, Fees, Duration & Placement) | NIFS India",
  description:
    "Explore top Safety Officer courses after 12th (Science, Commerce, Arts). 1-year Diplomas (DFS, ADIS) & 3-year B.Sc degrees. Fees, syllabus, government approvals (NSDC, SBTET), and 100% placement support.",
  alternates: { canonical: "/safety-officer-course-after-12th/" },
  openGraph: {
    title: "Safety Officer Course After 12th (2026 Guide) — NIFS India",
    description:
      "Complete guide to Fire & Safety courses after 12th standard. Course options, stream eligibility, fee breakdown, and starting salaries.",
    url: "https://nifsindia.net/safety-officer-course-after-12th/",
    type: "article",
  },
};

const faqs = [
  {
    question: "Can I do a Safety Officer course after 12th Arts or Commerce?",
    answer:
      "Yes, absolutely. Students who completed 12th in Arts or Commerce streams are eligible for the 1-Year Diploma in Fire & Safety (DFS) and Diploma in Health, Safety & Environment (DHSE). These programs prepare students for high-demand safety supervisor roles in construction, warehousing, airports, and commercial facilities.",
  },
  {
    question: "Which Safety Officer course is best after 12th Science?",
    answer:
      "For 12th Science (MPC / PCM / BiPC) students, the 3-Year B.Sc in Fire & Industrial Safety or the 1-Year Advanced Diploma in Industrial Safety (ADIS) is ideal. Science graduates qualify for technical safety officer roles in high-paying sectors like petrochemical refineries, power plants, and chemical manufacturing.",
  },
  {
    question:
      "What is the fee for a Safety Officer course after 12th in India?",
    answer:
      "A 1-year Diploma in Fire & Safety generally ranges from ₹35,000 to ₹65,000, depending on the training mode and practical drill sessions. A 3-year B.Sc degree ranges between ₹45,000 and ₹85,000 per year. NIFS India provides transparent fee structures with easy installment options.",
  },
  {
    question:
      "What is the starting salary after completing a Safety Officer course post 12th?",
    answer:
      "Freshers completing a 1-year diploma start with salaries between ₹2,40,000 and ₹3,80,000 per annum (₹20,000 to ₹32,000/month). After 2 to 3 years of field experience, salaries typically double to ₹5,00,000 – ₹7,50,000 per annum.",
  },
  {
    question: "Are NIFS Safety Officer courses government approved?",
    answer:
      "Yes. NIFS courses are approved by the National Skill Development Corporation (NSDC), Skill India, and affiliated with state technical boards (SBTET) and UGC-recognized universities (Acharya Nagarjuna University). NIFS is an ISO 9001:2015 certified institution.",
  },
];

export default function SafetyOfficerCourseAfter12thPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Courses", url: "https://nifsindia.net/courses/" },
          {
            name: "Safety Officer Course After 12th",
            url: "https://nifsindia.net/safety-officer-course-after-12th/",
          },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <article className="pt-32 lg:pt-36 bg-background text-foreground">
        {/* Header / Hero */}
        <header className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <GraduationCap className="h-4 w-4" /> 10+2 Career Pathways
          </div>
          <h1 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Safety Officer Course{" "}
            <span className="text-primary italic">After 12th</span>:
            Eligibility, Fees, Duration &amp; Jobs (2026)
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            By{" "}
            <strong className="text-foreground">
              National Institute of Fire and Safety (NIFS India)
            </strong>{" "}
            • 25+ Years of Academic Excellence • 45,000+ Placements
          </p>

          {/* Quick AI Answer Box */}
          <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> Key Takeaways: Safety
              Officer Courses After 12th Standard
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Eligible Streams
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  Science (PCM/PCB), Commerce &amp; Arts
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Top Course Options
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  1-Yr Diploma (DFS), 3-Yr B.Sc Degree
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Course Fees
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹35,000 – ₹75,000 (Installments available)
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Placement Average
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹2.8L – ₹4.5L / Yr (Adani, L&amp;T, ITC)
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <strong>Overview:</strong> Students completing 10+2 in any stream
              (Science, Commerce, or Arts) can enter the booming industrial
              safety sector immediately without waiting for traditional 4-year
              engineering degrees. With a 1-year{" "}
              <Link
                href="/courses/diploma-in-fire-safety/"
                className="text-primary underline font-medium"
              >
                Diploma in Fire &amp; Safety (DFS)
              </Link>{" "}
              or a 3-year{" "}
              <Link
                href="/courses/b-sc-in-fire-industrial-safety/"
                className="text-primary underline font-medium"
              >
                B.Sc in Fire &amp; Industrial Safety
              </Link>
              , candidates gain statutory qualifications required across
              factories, airports, ports, oil refineries, and construction
              companies worldwide.
            </p>
          </div>
        </header>

        {/* Content Body */}
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10 space-y-12">
          {/* Section 1: Stream-Wise Eligibility */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Stream-Wise Eligibility for 12th Pass Students
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Whether you studied Science with Mathematics, Biology, Commerce
              with Accountancy, or Humanities/Arts, there is a certified safety
              pathway tailored for you:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold">
                  12th
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  Science (PCM / PCB)
                </h3>
                <p className="text-xs text-muted-foreground">
                  <strong>Eligible Courses:</strong> B.Sc Fire &amp; Industrial
                  Safety, ADIS, Diploma DFS, DHSE.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Best Suited For:</strong> Heavy chemical
                  manufacturing, oil &amp; gas refineries, nuclear power, and
                  hazardous industrial plants.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-600 font-bold">
                  12th
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  Commerce Stream
                </h3>
                <p className="text-xs text-muted-foreground">
                  <strong>Eligible Courses:</strong> Diploma in Fire &amp;
                  Safety (DFS), Diploma in HSE (DHSE).
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Best Suited For:</strong> Warehousing &amp; logistics
                  (Amazon/Flipkart), corporate facility EHS, commercial real
                  estate, and hospitality fire safety.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 font-bold">
                  12th
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  Arts / Humanities
                </h3>
                <p className="text-xs text-muted-foreground">
                  <strong>Eligible Courses:</strong> Diploma in Fire &amp;
                  Safety (DFS), Certificate CCFS.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Best Suited For:</strong> Construction site safety
                  supervision, high-rise building safety, emergency evacuation
                  management, and airport ground safety.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Best Course Options After 12th */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Best Safety Officer Courses After 12th in India
            </h2>

            <div className="space-y-6">
              {/* Course 1: DFS */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      1-Year Diploma Program
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                      Diploma in Fire &amp; Safety (DFS)
                    </h3>
                  </div>
                  <Link
                    href="/courses/diploma-in-fire-safety/"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    View Full Syllabus <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The most popular course for students right after 12th
                  standard. Teaches fire engineering, hazard identification,
                  fire prevention equipment operation, and practical rescue
                  tactics.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <strong>Duration:</strong> 12 Months
                  </div>
                  <div>
                    <strong>Eligibility:</strong> 10+2 (Any Stream)
                  </div>
                  <div>
                    <strong>Mode:</strong> Classroom + Yard Drills
                  </div>
                  <div>
                    <strong>Affiliation:</strong> NSDC / University
                  </div>
                </div>
              </div>

              {/* Course 2: ADIS */}
              <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Flagship Industrial Qualification
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                      Advanced Diploma in Industrial Safety (ADIS)
                    </h3>
                  </div>
                  <Link
                    href="/courses/advanced-diploma-in-industrial-safety-adis/"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    View Full Syllabus <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Comprehensive plant-floor safety management curriculum
                  covering machine safeguarding, hazardous zone classification
                  (HT/LT), industrial hygiene, and statutory safety auditing
                  under the Factories Act.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <strong>Duration:</strong> 12 Months
                  </div>
                  <div>
                    <strong>Eligibility:</strong> 10+2 / Polytechnic / Degree
                  </div>
                  <div>
                    <strong>Mode:</strong> Classroom + Field Work
                  </div>
                  <div>
                    <strong>Affiliation:</strong> State Technical Board / NSDC
                  </div>
                </div>
              </div>

              {/* Course 3: B.Sc Degree */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      3-Year Full Degree
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                      B.Sc in Fire &amp; Industrial Safety
                    </h3>
                  </div>
                  <Link
                    href="/courses/b-sc-in-fire-industrial-safety/"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    View Full Syllabus <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A comprehensive UGC-recognized 3-year bachelor degree program
                  combining deep engineering physics, chemistry of combustion,
                  environmental management, safety legislation, and management
                  leadership.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <strong>Duration:</strong> 3 Years (6 Semesters)
                  </div>
                  <div>
                    <strong>Eligibility:</strong> 10+2 (Science Stream)
                  </div>
                  <div>
                    <strong>Mode:</strong> Regular Campus Program
                  </div>
                  <div>
                    <strong>Affiliation:</strong> Acharya Nagarjuna University
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Fees & Return on Investment */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Course Fees &amp; Return on Investment (ROI)
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Compared to 4-year B.Tech degrees costing ₹4 Lakhs to ₹10 Lakhs
              with uncertain placement records, a 1-year Fire &amp; Safety
              diploma offers immediate employment with a 100% return on your
              educational investment within just 3 to 4 months of your first
              job:
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-sm border-collapse border border-border">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="p-3 border border-border">Course</th>
                    <th className="p-3 border border-border">
                      Approx Fee Range
                    </th>
                    <th className="p-3 border border-border">
                      Starting Monthly Salary
                    </th>
                    <th className="p-3 border border-border">
                      Time to Recover Investment
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground divide-y divide-border">
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Diploma in Fire &amp; Safety (DFS)
                    </td>
                    <td className="p-3">₹35,000 – ₹55,000</td>
                    <td className="p-3">₹20,000 – ₹28,000/mo</td>
                    <td className="p-3 text-primary font-bold">2.5 Months</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Advanced Diploma (ADIS)
                    </td>
                    <td className="p-3">₹45,000 – ₹70,000</td>
                    <td className="p-3">₹25,000 – ₹38,000/mo</td>
                    <td className="p-3 text-primary font-bold">
                      2 to 3 Months
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      B.Sc in Fire &amp; Industrial Safety
                    </td>
                    <td className="p-3">₹45,000 – ₹80,000 / yr</td>
                    <td className="p-3">₹30,000 – ₹45,000/mo</td>
                    <td className="p-3 text-primary font-bold">
                      4 to 6 Months
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Hands-On Ground Drills */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Why Practical Yard Drills Matter for 12th Pass Students
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Employers hiring safety personnel prioritize candidate confidence
              in real emergency situations. At NIFS&apos;s dedicated practical
              training yard, 12th pass students undergo comprehensive physical
              drills:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    Live Fire Extinguisher Training
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Handling gas cartridges, stored pressure, CO₂, foam, and ABC
                    powder against real fires.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    SCBA Smoke Chamber Drills
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Operating Self-Contained Breathing Apparatus in
                    zero-visibility toxic smoke environments.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    High-Rise Rope Rescue Drills
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Harness inspection, knotted rope climbing, stretcher
                    evacuation, and descender techniques.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    First Aid &amp; CPR Certification
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Trauma triage, burn dressings, splinting fractures, and
                    automated external defibrillator (AED) usage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Admission Support CTA */}
          <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 sm:p-10 space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Ready to Start Your Safety Career After 12th?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Admissions for the 2026 academic batch are now open across our 70+
              centers nationwide. Connect with an admissions counselor today for
              free career guidance:
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/918374340999?text=Hi%20NIFS%2C%20I%20passed%2012th%20and%20want%20to%20know%20about%20Safety%20Officer%20course%20admissions%20and%20fees."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                </svg>
                <span>Chat on WhatsApp (Instant Guidance)</span>
              </a>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-7 py-3.5 text-sm sm:text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all"
              >
                <span>Online Admission Form</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Section 6: FAQs */}
          <section className="space-y-6 pt-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" /> Frequently Asked
              Questions
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
