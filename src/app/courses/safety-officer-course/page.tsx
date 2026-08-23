import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Award, Users, TrendingUp } from "lucide-react";
import { BreadcrumbSchema, FAQSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Safety Officer Course in India 2026: Eligibility, Fees & Jobs | NIFS",
  description: "Become a certified Safety Officer in India. NSDC-approved courses at NIFS — ADIS, DIS, ADFS, BSc. Eligibility: 10+2. 45,000+ placed. Apply now.",
  alternates: { canonical: "/courses/safety-officer-course/" },
  openGraph: {
    title: "Safety Officer Course India 2026 | NIFS",
    description: "NSDC-approved safety officer courses. Eligibility 10+2. 70+ centers across India. 45,000+ candidates placed.",
  },
};

const faqs = [
  {
    question: "What is the eligibility for a Safety Officer course in India?",
    answer: "Most Safety Officer courses require a minimum of 10+2 (Class 12) qualification. Advanced diploma programs typically require a degree or diploma in any stream. The ADIS and DIS courses at NIFS accept 10+2, ITI, or any stream qualification.",
  },
  {
    question: "How long does a Safety Officer course take?",
    answer: "Certificate courses run 3–6 months. Diploma courses (DIS, DFS) take 1 year. Advanced Diploma (ADIS, ADFS) takes 12 months. B.Sc in Fire & Industrial Safety takes 3 years. NIFS offers flexible classroom and online modes.",
  },
  {
    question: "What is the salary of a Safety Officer in India after completing this course?",
    answer: "Entry-level Safety Officers earn ₹2.5–4 LPA. Mid-level with 3–5 years experience earn ₹5–9 LPA. Senior Safety Officers in oil & gas, construction, and MNCs earn ₹10–15 LPA+. Gulf-based roles typically offer ₹8–18 LPA equivalent.",
  },
  {
    question: "Is NIFS's Safety Officer course recognized by the government?",
    answer: "Yes. NIFS courses are NSDC (National Skill Development Corporation) approved and affiliated with Acharya Nagarjuna University (ANU). The institute is ISO 9001:2015 certified and a Skill India approved training partner.",
  },
  {
    question: "Which Safety Officer course is best — DIS, ADIS, or BSc?",
    answer: "If you've just passed 10+2, start with DIS (1 year). If you have a degree, ADIS (12 months) gives faster access to supervisory roles. BSc in Fire & Industrial Safety (3 years) is ideal for those wanting a full degree for long-term career growth.",
  },
  {
    question: "Can I do a Safety Officer course online?",
    answer: "Yes. NIFS offers online and classroom modes for DIS, ADIS, DHSE, PG DHSE, and certificate courses. Classroom-based programs with practical training are available at 70+ centers across India.",
  },
];

const courses = [
  { name: "Diploma in Industrial Safety (DIS)", slug: "diploma-in-industrial-safety-dis", duration: "12 Months", eligibility: "10th / SSC / HSE", tier: "Diploma", highlight: false },
  { name: "Advanced Diploma in Industrial Safety (ADIS)", slug: "advanced-diploma-in-industrial-safety-adis", duration: "12 Months", eligibility: "10+2 / Diploma", tier: "Advanced Diploma", highlight: true },
  { name: "Diploma in Fire & Safety (DFS)", slug: "diploma-in-fire-safety", duration: "1 Year", eligibility: "10+2 / ITI", tier: "Diploma", highlight: false },
  { name: "Advanced Diploma in Fire & Safety (ADFS)", slug: "advanced-diploma-in-fire-safety-adfs", duration: "12 Months", eligibility: "10+2 / Diploma", tier: "Advanced Diploma", highlight: false },
  { name: "B.Sc in Fire & Industrial Safety", slug: "b-sc-in-fire-industrial-safety", duration: "3 Years", eligibility: "10+2 / ITI / Diploma", tier: "B.Sc", highlight: false },
  { name: "Diploma in Health, Safety & Environment (DHSE)", slug: "diploma-in-health-safety-environment", duration: "1 Year", eligibility: "10+2 / ITI", tier: "Diploma", highlight: false },
];

const outcomes = [
  { title: "Safety Officer", salary: "₹2.5–6 LPA", icon: Shield },
  { title: "EHS Officer", salary: "₹4–9 LPA", icon: Award },
  { title: "Fire Safety Officer", salary: "₹3–8 LPA", icon: Shield },
  { title: "Safety Manager", salary: "₹8–15 LPA", icon: TrendingUp },
  { title: "Gulf Safety Officer", salary: "₹8–18 LPA", icon: TrendingUp },
  { title: "EHS Consultant", salary: "₹10–20 LPA", icon: Award },
];

export default function SafetyOfficerCoursePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Courses", url: "https://nifsindia.net/courses/" },
          { name: "Safety Officer Course", url: "https://nifsindia.net/courses/safety-officer-course/" },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <article className="pt-32 lg:pt-36">
        {/* Hero */}
        <div className="bg-primary/5 border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">NSDC Approved · Skill India Partner</span>
            <h1 className="font-display mt-3 max-w-3xl text-4xl italic leading-tight md:text-5xl">
              Safety Officer Course in India — 2026 Guide
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              NIFS offers NSDC-approved Safety Officer courses from Certificate to B.Sc level — classroom and online. 70+ centers across India, 45,000+ candidates placed in top companies.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/admissions" className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground">
                Apply Now
              </Link>
              <a href="https://wa.me/918374340999?text=I want to know more about Safety Officer courses at NIFS" target="_blank" rel="noopener noreferrer" className="border border-border px-7 py-3.5 text-sm font-medium hover:bg-muted">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-14">
            {[
              { label: "Candidates Placed", value: "45,000+" },
              { label: "Training Centers", value: "70+" },
              { label: "Years of Experience", value: "25+" },
              { label: "Course Modes", value: "Online & Classroom" },
            ].map((s) => (
              <div key={s.label} className="border border-border p-4">
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Course list */}
          <h2 className="font-display text-3xl italic">Safety Officer Courses at NIFS</h2>
          <p className="mt-3 text-muted-foreground">Choose the course that matches your qualification and career goal.</p>
          <div className="mt-6 space-y-4">
            {courses.map((c) => (
              <div key={c.slug} className={`border p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${c.highlight ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <div>
                  {c.highlight && <span className="text-xs font-semibold text-primary uppercase tracking-widest">Most Popular</span>}
                  <h3 className="font-medium mt-1">{c.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="text-xs text-muted-foreground">Duration: {c.duration}</span>
                    <span className="text-xs text-muted-foreground">Eligibility: {c.eligibility}</span>
                    <span className="text-xs font-medium text-primary">{c.tier}</span>
                  </div>
                </div>
                <Link href={`/courses/${c.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary shrink-0">
                  View Details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Career outcomes */}
          <h2 className="font-display text-3xl italic mt-16">Career Outcomes & Salary</h2>
          <p className="mt-3 text-muted-foreground">Roles and salary ranges for Safety Officers in India (2026 data).</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.title} className="border border-border p-5">
                <o.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 font-medium text-sm">{o.title}</p>
                <p className="mt-1 text-primary font-bold">{o.salary}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Salary ranges are indicative based on industry data. Actual packages depend on experience, location, and employer.</p>

          {/* Why choose NIFS */}
          <h2 className="font-display text-3xl italic mt-16">Why Choose NIFS for Your Safety Officer Course?</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: "NSDC Approved", desc: "All NIFS courses are National Skill Development Corporation approved and Skill India recognized." },
              { title: "ANU Affiliated", desc: "Diploma and degree programs are affiliated with Acharya Nagarjuna University, a government-recognized university." },
              { title: "Practical Training", desc: "70/30 practical-to-classroom ratio. Hands-on drills with real fire-fighting equipment at NIFS's training yards." },
              { title: "Placement Support", desc: "45,000+ candidates placed in Adani, L&T, GMR, Amazon, ITC, MEIL and 100+ other companies. Active placement cell." },
              { title: "70+ Centers", desc: "Training centers across Visakhapatnam, Hyderabad, Delhi, Mumbai, Chennai, Kolkata, Nagpur, and 60+ more cities." },
              { title: "ISO 9001:2015", desc: "Certified quality management system ensuring consistent training standards across all centers." },
            ].map((w) => (
              <div key={w.title} className="border border-border p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{w.title}</p>
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
            <h2 className="font-display text-2xl italic">Ready to Start Your Safety Officer Career?</h2>
            <p className="mt-3 text-muted-foreground">Talk to our admissions counselors. Call or WhatsApp: +91-8374-340-999</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/admissions" className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground">
                Apply Now
              </Link>
              <Link href="/courses" className="border border-border px-7 py-3.5 text-sm font-medium hover:bg-muted inline-flex items-center gap-2">
                Browse All Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </article>
    </>
  );
}
