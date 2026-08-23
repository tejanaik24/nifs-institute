import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Flame } from "lucide-react";
import { BreadcrumbSchema, FAQSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Fire and Safety Course in India 2026: All Options, Fees & Careers | NIFS",
  description: "Fire and safety courses in India 2026 — Certificate to B.Sc. NSDC approved. Eligibility from 10+2. 70+ centers. 45,000+ placed. Get details from NIFS.",
  alternates: { canonical: "/fire-and-safety-course/" },
  openGraph: {
    title: "Fire and Safety Course India 2026 | NIFS",
    description: "Complete guide to fire and safety courses in India. NSDC-approved programs from NIFS covering DFS, ADFS, BSc, DIS, ADIS and more.",
  },
};

const faqs = [
  {
    question: "What is a fire and safety course?",
    answer: "A fire and safety course trains students in fire prevention, firefighting techniques, industrial safety protocols, emergency response planning, and workplace hazard management. Courses range from short certificates (3–6 months) to full degree programs (B.Sc — 3 years).",
  },
  {
    question: "What are the best fire and safety courses in India in 2026?",
    answer: "Top fire and safety courses include: DFS (Diploma in Fire & Safety, 1 year), ADFS (Advanced Diploma in Fire & Safety, 12 months), DIS (Diploma in Industrial Safety, 12 months), ADIS (Advanced Diploma in Industrial Safety), and B.Sc in Fire & Industrial Safety (3 years). NIFS offers all these with NSDC approval.",
  },
  {
    question: "What is the eligibility for fire and safety courses in India?",
    answer: "Certificate-level courses require 10th pass. Diploma courses (DFS, DIS) require 10+2 or ITI qualification. Advanced Diploma (ADFS, ADIS) requires 10+2 or a diploma. PG programs require a bachelor's degree. B.Sc programs require 10+2 with any stream.",
  },
  {
    question: "What is the fee for fire and safety courses at NIFS?",
    answer: "Fees vary by course level and center. Contact NIFS directly at +91-8374-340-999 or visit /admissions for current fees. NIFS does not publish one fixed national fee as costs differ by center and intake.",
  },
  {
    question: "What jobs can I get after a fire and safety course?",
    answer: "Graduates work as Fire Safety Officer, Industrial Safety Officer, EHS Officer, Safety Supervisor, Emergency Response Coordinator, Safety Auditor, and in Gulf-based safety roles. Employers include Adani, L&T, ITC, GMR, Amazon, MEIL, and government PSUs.",
  },
  {
    question: "Are fire and safety courses from NIFS recognized by the government?",
    answer: "Yes. NIFS courses are NSDC-approved and Skill India certified. Programs are affiliated with Acharya Nagarjuna University (ANU), a government-recognized institution. NIFS is ISO 9001:2015 certified.",
  },
];

export default function FireAndSafetyCoursePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Fire and Safety Course", url: "https://nifsindia.net/fire-and-safety-course/" },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <article className="pt-32 lg:pt-36">
        <div className="bg-primary/5 border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">NSDC Approved · Skill India Certified</span>
            <h1 className="font-display mt-3 max-w-3xl text-4xl italic leading-tight md:text-5xl">
              Fire and Safety Courses in India — Complete 2026 Guide
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              NIFS India offers government-recognized fire and safety courses — from 3-month certificates to 3-year B.Sc programs. 70+ centers across India, 45,000+ candidates placed.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/admissions" className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground">
                Get Course Details
              </Link>
              <a href="https://wa.me/918374340999?text=I want details about fire and safety courses at NIFS" target="_blank" rel="noopener noreferrer" className="border border-border px-7 py-3.5 text-sm font-medium hover:bg-muted">
                WhatsApp: +91-8374-340-999
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">

          {/* Course overview table */}
          <h2 className="font-display text-3xl italic">All Fire & Safety Courses at NIFS (2026)</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Course</th>
                  <th className="text-left p-3 font-medium">Level</th>
                  <th className="text-left p-3 font-medium">Duration</th>
                  <th className="text-left p-3 font-medium">Eligibility</th>
                  <th className="text-left p-3 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Certificate Course in Fire & Safety (CCFS)", slug: "certificate-course-in-fire-safety", level: "Certificate", duration: "3–6 Months", eligibility: "10th Pass" },
                  { name: "Diploma in Fire & Safety (DFS)", slug: "diploma-in-fire-safety", level: "Diploma", duration: "1 Year", eligibility: "10+2 / ITI" },
                  { name: "Advanced Diploma in Fire & Safety (ADFS)", slug: "advanced-diploma-in-fire-safety-adfs", level: "Advanced Diploma", duration: "12 Months", eligibility: "10+2 / Diploma" },
                  { name: "PG Diploma in Fire & Safety (PG DFS)", slug: "pg-diploma-in-fire-safety-pg-dfs", level: "PG Diploma", duration: "1 Year", eligibility: "Any Graduate" },
                  { name: "B.Sc in Fire & Industrial Safety", slug: "b-sc-in-fire-industrial-safety", level: "B.Sc Degree", duration: "3 Years", eligibility: "10+2 / ITI / Diploma" },
                  { name: "Diploma in Industrial Safety (DIS)", slug: "diploma-in-industrial-safety-dis", level: "Diploma", duration: "12 Months", eligibility: "10th / SSC / HSE" },
                  { name: "Advanced Diploma in Industrial Safety (ADIS)", slug: "advanced-diploma-in-industrial-safety-adis", level: "Advanced Diploma", duration: "12 Months", eligibility: "10+2 / Diploma" },
                ].map((c, i) => (
                  <tr key={c.slug} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                    <td className="p-3 font-medium">{c.name}</td>
                    <td className="p-3 text-muted-foreground">{c.level}</td>
                    <td className="p-3 text-muted-foreground">{c.duration}</td>
                    <td className="p-3 text-muted-foreground">{c.eligibility}</td>
                    <td className="p-3"><Link href={`/courses/${c.slug}`} className="text-primary inline-flex items-center gap-1 font-medium">View <ArrowRight className="h-3 w-3" /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Why fire and safety */}
          <h2 className="font-display text-3xl italic mt-16">Why Study Fire & Safety in India?</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[
              { point: "Mandatory statutory requirement", desc: "The Factories Act, 1948 and National Building Code mandate certified fire safety officers in industrial and commercial facilities." },
              { point: "Shortage of qualified professionals", desc: "India has a significant shortage of certified fire and safety officers, creating strong demand and job security for qualified graduates." },
              { point: "Gulf & international opportunities", desc: "Indian fire and safety qualifications are recognized by Gulf employers. Experienced safety officers earn ₹8–18 LPA in UAE, Saudi Arabia, Qatar." },
              { point: "Government and PSU hiring", desc: "Government factories, PSUs, and defense establishments actively hire from government-recognized fire safety programs." },
            ].map((w) => (
              <div key={w.point} className="border border-border p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{w.point}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="font-display text-3xl italic mt-16">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-6">
            {faqs.map((f) => (
              <div key={f.question} className="border-b border-border pb-6">
                <h3 className="font-medium">{f.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 border border-primary/30 bg-primary/5 p-8 text-center">
            <Flame className="mx-auto h-8 w-8 text-primary" />
            <h2 className="font-display text-2xl italic mt-4">Start Your Fire & Safety Career</h2>
            <p className="mt-3 text-muted-foreground">Call or WhatsApp our admissions team: <strong>+91-8374-340-999</strong></p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/admissions" className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground">Apply Now</Link>
              <Link href="/courses" className="border border-border px-7 py-3.5 text-sm font-medium hover:bg-muted inline-flex items-center gap-2">All Courses <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
