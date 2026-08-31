import { BreadcrumbSchema, FAQSchema } from "@/lib/seo/schema";
import { ArrowRight, Award, Globe, HelpCircle, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Safety Officer Salary in India (2026 Complete Guide: Fresher to EHS Manager) | NIFS India",
  description:
    "Comprehensive 2026 guide to Safety Officer salary in India & Gulf countries. Monthly & annual pay scales for freshers (₹25k–₹35k/mo), experienced EHS managers (₹10L–₹25L/yr), sector-wise pay (Oil & Gas, Construction, Tech), and NEBOSH salary boost.",
  alternates: { canonical: "/safety-officer-salary-in-india/" },
  openGraph: {
    title: "Safety Officer Salary in India (2026 Complete Guide) — NIFS India",
    description:
      "Detailed salary benchmark for Fire & Safety Officers in India. Experience-wise, sector-wise, and qualification-wise pay scales.",
    url: "https://nifsindia.net/safety-officer-salary-in-india/",
    type: "article",
  },
};

const faqs = [
  {
    question:
      "What is the starting salary of a Safety Officer in India in 2026?",
    answer:
      "A fresher Safety Officer in India typically earns between ₹20,000 and ₹35,000 per month (₹2,40,000 to ₹4,20,000 per annum). Freshers holding government-recognized diplomas like ADIS or DFS from reputed institutions like NIFS India with hands-on practical yard training command the higher end of the starting bracket.",
  },
  {
    question:
      "How much does a Safety Officer earn in Gulf countries (Dubai, Saudi Arabia)?",
    answer:
      "In Gulf countries (UAE, Saudi Arabia, Qatar, Kuwait), certified Safety Officers with NEBOSH IGC earn between AED 8,000 and AED 18,000 per month (approx. ₹1,80,000 to ₹4,00,000 per month tax-free), usually accompanied by company-provided accommodation, food allowance, and annual flight tickets.",
  },
  {
    question:
      "Which industry pays the highest salary to Safety Officers in India?",
    answer:
      "The Oil & Gas and Petrochemical sector (Reliance, IOCL, ONGC, BPCL) pays the highest salaries in India, followed closely by Offshore Marine, Renewable Energy, and Hyperscale Data Centers. Senior EHS Managers in these sectors routinely draw ₹18,00,000 to ₹30,00,000+ per annum.",
  },
  {
    question: "Does NEBOSH certification increase a Safety Officer's salary?",
    answer:
      "Yes. Candidates holding a recognized Indian diploma along with NEBOSH IGC command 40% to 70% higher compensation in multinational corporations and are eligible for international roles where packages start above ₹15,00,000 per annum.",
  },
  {
    question:
      "What is the highest salary a Safety Officer can achieve in India?",
    answer:
      "A Corporate Head of EHS / Vice President of Safety in large multinational conglomerates (such as L&T, Tata Projects, or Adani Group) earns between ₹25,00,000 and ₹50,00,000+ per annum with executive benefits and stock options.",
  },
];

export default function SafetyOfficerSalaryInIndiaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Guides", url: "https://nifsindia.net/courses/" },
          {
            name: "Safety Officer Salary in India",
            url: "https://nifsindia.net/safety-officer-salary-in-india/",
          },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <article className="pt-32 lg:pt-36 bg-background text-foreground">
        {/* Header / Hero */}
        <header className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <TrendingUp className="h-4 w-4" /> 2026 Industry Compensation Report
          </div>
          <h1 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Safety Officer Salary in India (2026):{" "}
            <span className="text-primary italic">Fresher to EHS Manager</span>{" "}
            Pay Scale
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            By{" "}
            <strong className="text-foreground">
              National Institute of Fire and Safety (NIFS India)
            </strong>{" "}
            • Based on Real Placement Data Across 45,000+ Alumni
          </p>

          {/* Quick AI Answer Box */}
          <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> 2026 Safety Officer
              Salary Summary in India
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Fresher (0–2 Yrs)
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹2.4L – ₹4.2L / Year (₹20k–₹35k/mo)
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Mid-Level (3–6 Yrs)
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹5.5L – ₹10L / Year (₹45k–₹85k/mo)
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  EHS Manager (8+ Yrs)
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹12L – ₹28L / Year (₹1L–₹2.3L/mo)
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Gulf / Middle East
                </span>
                <p className="text-sm font-bold text-foreground mt-1">
                  ₹18L – ₹40L / Year (Tax-Free)
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <strong>Quick Summary:</strong> In 2026, certified Safety Officers
              in India earn an average starting salary of ₹25,000 to ₹35,000 per
              month. Career progression is exceptionally steep: with 3 to 5
              years of plant experience and an{" "}
              <Link
                href="/courses/advanced-diploma-in-industrial-safety-adis/"
                className="text-primary underline font-medium"
              >
                Advanced Diploma in Industrial Safety (ADIS)
              </Link>{" "}
              or{" "}
              <Link
                href="/courses/nebosh-igc/"
                className="text-primary underline font-medium"
              >
                NEBOSH IGC
              </Link>
              , professionals command ₹6,00,000 to ₹12,00,000 per year
              domestically, while Gulf oil &amp; gas positions reach ₹25,00,000+
              per year.
            </p>
          </div>
        </header>

        {/* Content Body */}
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10 space-y-12">
          {/* Section 1: Experience-Wise Pay Scale */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Experience-Wise Safety Officer Salary in India (2026)
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Safety management is a merit and compliance-driven profession
              where statutory certifications and operational field experience
              directly translate into high earning power:
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-sm border-collapse border border-border">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="p-3 border border-border">
                      Experience Level
                    </th>
                    <th className="p-3 border border-border">
                      Typical Job Title
                    </th>
                    <th className="p-3 border border-border">
                      Monthly Take-Home
                    </th>
                    <th className="p-3 border border-border">
                      Annual CTC (INR)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground divide-y divide-border">
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Fresher (0–1 Year)
                    </td>
                    <td className="p-3">Safety Trainee / Junior HSE Officer</td>
                    <td className="p-3">₹18,000 – ₹28,000</td>
                    <td className="p-3">₹2,20,000 – ₹3,50,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Junior Safety Officer (1–3 Years)
                    </td>
                    <td className="p-3">
                      Site Safety Officer / Fire Inspector
                    </td>
                    <td className="p-3">₹28,000 – ₹42,000</td>
                    <td className="p-3">₹3,50,000 – ₹5,20,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Senior Safety Officer (3–6 Years)
                    </td>
                    <td className="p-3">EHS Engineer / Safety Supervisor</td>
                    <td className="p-3">₹45,000 – ₹80,000</td>
                    <td className="p-3 font-bold text-foreground">
                      ₹5,50,000 – ₹10,00,000
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Assistant EHS Manager (6–9 Years)
                    </td>
                    <td className="p-3">Lead HSE Auditor / EHS Manager</td>
                    <td className="p-3">₹80,000 – ₹1,40,000</td>
                    <td className="p-3 font-bold text-primary">
                      ₹10,00,000 – ₹17,00,000
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Head of Safety / VP (10+ Years)
                    </td>
                    <td className="p-3">Corporate EHS Director / VP Safety</td>
                    <td className="p-3">₹1,50,000 – ₹3,50,000+</td>
                    <td className="p-3 font-black text-primary">
                      ₹20,00,000 – ₹45,00,000+
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: Sector-Wise Breakdown */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Sector-Wise Salary Comparison: Which Industry Pays the Most?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Compensation varies significantly depending on the hazard
              complexity and regulatory scrutiny of the industrial sector:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-foreground">
                    1. Oil &amp; Gas / Petrochemical
                  </h3>
                  <span className="text-xs font-bold bg-primary text-white px-2.5 py-1 rounded-full">
                    Top Paying
                  </span>
                </div>
                <p className="text-2xl font-black text-primary">
                  ₹4.5L – ₹14.0L / Yr
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Key Employers:</strong> Reliance Industries, IOCL,
                  ONGC, HPCL, BPCL, Adani Total Gas.
                </p>
                <p className="text-xs text-muted-foreground">
                  High risk environments involving explosive gases and chemical
                  processes mandate top-tier packages and danger allowances.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-foreground">
                    2. Construction &amp; Infrastructure
                  </h3>
                  <span className="text-xs font-bold bg-muted text-foreground px-2.5 py-1 rounded-full">
                    High Volume
                  </span>
                </div>
                <p className="text-2xl font-black text-foreground">
                  ₹3.5L – ₹10.5L / Yr
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Key Employers:</strong> Larsen &amp; Toubro (L&amp;T),
                  Tata Projects, Shapoorji Pallonji, MEIL.
                </p>
                <p className="text-xs text-muted-foreground">
                  Metro rail, highway, high-rise, and bridge megaprojects hire
                  thousands of safety supervisors annually.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-foreground">
                    3. Manufacturing &amp; Automotive
                  </h3>
                  <span className="text-xs font-bold bg-muted text-foreground px-2.5 py-1 rounded-full">
                    Steady Growth
                  </span>
                </div>
                <p className="text-2xl font-black text-foreground">
                  ₹3.2L – ₹9.0L / Yr
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Key Employers:</strong> Tata Motors, Maruti Suzuki,
                  Mahindra, JSW Steel, ITC Limited.
                </p>
                <p className="text-xs text-muted-foreground">
                  Machinery safeguarding, robotics safety, and ergonomic risk
                  management across automotive assembly lines.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-foreground">
                    4. Hyperscale Data Centers &amp; Logistics
                  </h3>
                  <span className="text-xs font-bold bg-muted text-foreground px-2.5 py-1 rounded-full">
                    Booming Sector
                  </span>
                </div>
                <p className="text-2xl font-black text-foreground">
                  ₹4.0L – ₹11.0L / Yr
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Key Employers:</strong> Amazon, Flipkart, CtrlS,
                  AdaniConneX, NTT Data Centers.
                </p>
                <p className="text-xs text-muted-foreground">
                  High-voltage electrical safety, advanced FM-200 fire
                  suppression, and battery energy storage system safety.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Qualification vs Salary Impact */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              How Your Qualification Directly Impacts Your Pay Package
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Employers in India and overseas categorize pay bands according to
              formal statutory qualifications:
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-sm border-collapse border border-border">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="p-3 border border-border">Qualification</th>
                    <th className="p-3 border border-border">
                      Starting Salary Band
                    </th>
                    <th className="p-3 border border-border">
                      5-Year Growth Potential
                    </th>
                    <th className="p-3 border border-border">
                      Statutory Legality
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground divide-y divide-border">
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Certificate in Fire Safety (CCFS)
                    </td>
                    <td className="p-3">₹1.8L – ₹2.8L</td>
                    <td className="p-3">₹3.8L – ₹5.0L</td>
                    <td className="p-3">Site Assistant / Fire Warden</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Diploma in Fire &amp; Safety (DFS)
                    </td>
                    <td className="p-3">₹2.5L – ₹4.0L</td>
                    <td className="p-3">₹5.5L – ₹8.5L</td>
                    <td className="p-3">State Approved Supervisor</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Advanced Diploma (ADIS)
                    </td>
                    <td className="p-3 font-bold text-foreground">
                      ₹3.5L – ₹5.5L
                    </td>
                    <td className="p-3 font-bold text-primary">
                      ₹7.5L – ₹12.0L
                    </td>
                    <td className="p-3">Mandatory Factory Safety Officer</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      B.Sc in Fire &amp; Industrial Safety
                    </td>
                    <td className="p-3">₹3.2L – ₹4.8L</td>
                    <td className="p-3">₹8.0L – ₹14.0L</td>
                    <td className="p-3">UGC Recognized Degree</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">
                      Diploma + NEBOSH IGC
                    </td>
                    <td className="p-3 font-black text-primary">
                      ₹6.0L – ₹12.0L (India) / ₹20L+ (Gulf)
                    </td>
                    <td className="p-3 font-black text-primary">
                      ₹15.0L – ₹35.0L+
                    </td>
                    <td className="p-3">Global International Benchmark</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Gulf Jobs & Overseas Remuneration */}
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Gulf &amp; Middle East Safety Officer Salaries (UAE, Saudi
                Arabia, Qatar)
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Thousands of NIFS alumni work across the Gulf Cooperation Council
              (GCC) countries. Because workplace safety is aggressively enforced
              by state petroleum bodies like{" "}
              <strong>Saudi Aramco, ADNOC (Abu Dhabi), and QatarEnergy</strong>,
              remuneration packages are among the highest in the world:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-background border border-border text-center">
                <span className="text-xs uppercase text-muted-foreground font-semibold">
                  United Arab Emirates (UAE)
                </span>
                <p className="text-xl font-bold text-foreground mt-1">
                  AED 7,500 – 15,000 / mo
                </p>
                <p className="text-xs text-muted-foreground">
                  (Approx. ₹1.7 Lakh – ₹3.4 Lakh / month)
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border text-center">
                <span className="text-xs uppercase text-muted-foreground font-semibold">
                  Saudi Arabia (KSA)
                </span>
                <p className="text-xl font-bold text-foreground mt-1">
                  SAR 8,000 – 16,500 / mo
                </p>
                <p className="text-xs text-muted-foreground">
                  (Approx. ₹1.8 Lakh – ₹3.7 Lakh / month)
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border text-center">
                <span className="text-xs uppercase text-muted-foreground font-semibold">
                  Qatar &amp; Kuwait
                </span>
                <p className="text-xl font-bold text-foreground mt-1">
                  QAR 7,000 – 14,000 / mo
                </p>
                <p className="text-xs text-muted-foreground">
                  (Approx. ₹1.6 Lakh – ₹3.2 Lakh / month)
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: High Value CTA */}
          <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 sm:p-10 space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Boost Your Earning Potential with NIFS India
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Join India&apos;s leading fire and safety academy. Over 45,000
              candidates placed with guaranteed campus interview support. Talk
              to an admissions counselor on WhatsApp for batch timings and
              course fees:
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/918374340999?text=Hi%20NIFS%2C%20I%20read%20the%20Salary%20Guide%20and%20want%20to%20enroll%20in%20a%20Safety%20Officer%20course."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                </svg>
                <span>Connect with Counselor on WhatsApp</span>
              </a>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-7 py-3.5 text-sm sm:text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all"
              >
                <span>Explore All Certified Courses</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Section 6: FAQs */}
          <section className="space-y-6 pt-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" /> Frequently Asked
              Questions (Salary FAQs)
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
