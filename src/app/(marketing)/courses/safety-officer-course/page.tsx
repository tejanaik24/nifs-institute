import { SITE } from "@/lib/data/site-constants";
import { BreadcrumbSchema, CourseSchema, FAQSchema } from "@/lib/seo/schema";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Safety Officer Course: Duration & Eligibility | NIFS" },
  description:
    "Safety officer courses at NIFS take 3 months to 1 year, or 3 years for the B.Sc. Join after 10th, 10+2 or a diploma. NSDC approved. Contact for fees.",
  alternates: { canonical: "/courses/safety-officer-course/" },
  openGraph: {
    title: "Safety Officer Course India 2026 | NIFS",
    description:
      `NSDC-approved safety officer courses. Eligibility 10+2. 65+ centers across India. ${SITE.studentsPlaced} alumni.`,
  },
};

const faqs = [
  {
    question: "What is the eligibility for a Safety Officer course in India?",
    answer:
      "At NIFS, the Diploma in Industrial Safety (DIS) accepts 10th / SSC. ADIS, ADFS, DFS and DHSE accept 10+2 (ITI or a diploma also qualifies for some). The B.Sc in Fire & Industrial Safety needs 10+2, ITI or a diploma.",
  },
  {
    question: "How long does a Safety Officer course take?",
    answer:
      "Certificate courses run 3–6 months. Diploma courses (DIS, DFS) take 1 year. Advanced Diploma (ADIS, ADFS) takes 12 months. B.Sc in Fire & Industrial Safety takes 3 years. NIFS offers flexible classroom and online modes.",
  },
  {
    question:
      "What is the salary of a Safety Officer in India after completing this course?",
    answer:
      "Pay depends on experience, city and industry. Our salary guide lists safety officer and HSE officer pay per month, with every figure linked to its source (AmbitionBox and PayScale).",
  },
  {
    question: "Is NIFS's Safety Officer course recognized by the government?",
    answer:
      "Yes. NIFS courses are NSDC (National Skill Development Corporation) approved, and the certificate for every NIFS course is issued by Acharya Nagarjuna University (ANU), a State Government University in Andhra Pradesh. The institute is ISO 9001:2015 certified and a Skill India approved training partner.",
  },
  {
    question: "What is the fee for a Safety Officer course at NIFS?",
    answer:
      "The fee depends on the course (diploma, advanced diploma or B.Sc), the mode (classroom or online) and the centre. NIFS shares the exact current fee on WhatsApp or phone. Before you pay any institute, check that the fee covers practical training, exams, the certificate and placement support.",
  },
  {
    question: "Which safety officer course should I choose?",
    answer:
      "If you've just passed 10+2, start with DIS (1 year). If you have a degree, ADIS (12 months) gives faster access to supervisory roles. BSc in Fire & Industrial Safety (3 years) is ideal for those wanting a full degree for long-term career growth.",
  },
  {
    question: "Can I do a Safety Officer course online?",
    answer:
      "Yes. NIFS offers online and classroom modes for DIS, ADIS, DHSE, PG DHSE, and certificate courses. Classroom-based programs with practical training are available at 65+ centers across India.",
  },
];

const courses = [
  {
    name: "Diploma in Industrial Safety (DIS)",
    slug: "diploma-in-industrial-safety-dis",
    duration: "12 Months",
    eligibility: "10th / SSC / HSE",
    tier: "Diploma",
    highlight: false,
  },
  {
    name: "Advanced Diploma in Industrial Safety (ADIS)",
    slug: "advanced-diploma-in-industrial-safety-adis",
    duration: "12 Months",
    eligibility: "10+2 / Diploma",
    tier: "Advanced Diploma",
    highlight: true,
  },
  {
    name: "Diploma in Fire & Safety (DFS)",
    slug: "diploma-in-fire-safety",
    duration: "1 Year",
    eligibility: "10+2 / ITI",
    tier: "Diploma",
    highlight: false,
  },
  {
    name: "Advanced Diploma in Fire & Safety (ADFS)",
    slug: "advanced-diploma-in-fire-safety-adfs",
    duration: "12 Months",
    eligibility: "10+2 / Diploma",
    tier: "Advanced Diploma",
    highlight: false,
  },
  {
    name: "B.Sc in Fire & Industrial Safety",
    slug: "b-sc-in-fire-industrial-safety",
    duration: "3 Years",
    eligibility: "10+2 / ITI / Diploma",
    tier: "B.Sc",
    highlight: false,
  },
  {
    name: "Diploma in Health, Safety & Environment (DHSE)",
    slug: "diploma-in-health-safety-environment",
    duration: "1 Year",
    eligibility: "10+2 / ITI",
    tier: "Diploma",
    highlight: false,
  },
];

const durationTable = [
  ["Certificate Course in Fire & Safety (CCFS)", "3-6 months", "10th pass / 10+2"],
  ["Diploma in Industrial Safety (DIS)", "12 months", "10th / SSC / HSE"],
  ["Diploma in Fire & Safety (DFS)", "1 year", "10+2 / ITI / any stream"],
  ["Diploma in Health, Safety & Environment (DHSE)", "1 year", "10+2 / ITI / any stream"],
  ["Advanced Diploma in Industrial Safety (ADIS)", "12 months", "10+2 / diploma (any stream)"],
  ["Advanced Diploma in Fire & Safety (ADFS)", "12 months", "10+2 / diploma (any stream)"],
  ["PG Diploma in Fire & Safety (PG DFS)", "1 year", "Any graduate"],
  ["PG Diploma in Health, Safety & Environment (PG DHSE)", "1 year", "Any graduate"],
  ["B.Sc in Fire & Industrial Safety", "3 years (6 semesters)", "10+2 / diploma (3 yrs)"],
];

export default function SafetyOfficerCoursePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Courses", url: "https://nifsindia.net/courses/" },
          {
            name: "Safety Officer Course",
            url: "https://nifsindia.net/courses/safety-officer-course/",
          },
        ]}
      />
      <CourseSchema
        name="Safety Officer Course in India"
        description="Government recognized and NSDC-approved Safety Officer courses from Diploma (DFS, DIS, ADIS) to B.Sc Degree level with practical fire training yard drills and dedicated placement assistance."
        url="https://nifsindia.net/courses/safety-officer-course/"
        duration="1 Year - 3 Years"
        tier="Diploma / Degree"
      />
      <FAQSchema faqs={faqs} />

      <article className="pt-32 lg:pt-36">
        {/* Hero */}
        <div className="bg-primary/5 border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              NSDC Approved · Skill India Partner
            </span>
            <h1 className="font-display mt-3 max-w-3xl text-4xl italic leading-tight md:text-5xl">
              Safety Officer Course in India — 2026 Guide
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              A safety officer course trains you to prevent accidents and fires
              at work. At NIFS it takes 3-6 months (Certificate Course in Fire
              &amp; Safety), 12 months (DIS, DFS, DHSE, ADIS, ADFS) or 3 years
              (B.Sc in Fire &amp; Industrial Safety). You can join after 10th,
              10+2 or a diploma, and all paid courses carry an Acharya
              Nagarjuna University certificate.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/admissions"
                className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
              >
                Apply Now
              </Link>
              <a
                href="https://wa.me/918374340999?text=I want to know more about Safety Officer courses at NIFS"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-7 py-3.5 text-sm font-medium hover:bg-muted"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-14">
            {[
              { label: "Alumni", value: SITE.studentsPlaced },
              { label: "Training Centers", value: "65+" },
              { label: "Established", value: "2004" },
              { label: "Course Modes", value: "Online & Classroom" },
            ].map((s) => (
              <div key={s.label} className="border border-border p-4">
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Duration / eligibility table */}
          <h2 className="font-display text-3xl italic">
            How long is a safety officer course, and who can join?
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border border-border text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 font-medium">Course</th>
                  <th className="p-3 font-medium">Duration</th>
                  <th className="p-3 font-medium">Eligibility</th>
                  <th className="p-3 font-medium">Fees</th>
                </tr>
              </thead>
              <tbody>
                {durationTable.map((r) => (
                  <tr key={r[0]} className="border-t border-border">
                    <td className="p-3 font-medium">{r[0]}</td>
                    <td className="p-3">{r[1]}</td>
                    <td className="p-3">{r[2]}</td>
                    <td className="p-3">Contact for fees</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Course list */}
          <h2 className="font-display text-3xl italic">
            Safety Officer Courses at NIFS
          </h2>
          <p className="mt-3 text-muted-foreground">
            Choose the course that matches your qualification and career goal.
          </p>
          <div className="mt-6 space-y-4">
            {courses.map((c) => (
              <div
                key={c.slug}
                className={`border p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${c.highlight ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <div>
                  {c.highlight && (
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-medium mt-1">{c.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="text-xs text-muted-foreground">
                      Duration: {c.duration}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Eligibility: {c.eligibility}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Certificate: Acharya Nagarjuna University
                    </span>
                    <span className="text-xs font-medium text-primary">
                      {c.tier}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/courses/${c.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary shrink-0"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Fees */}
          <h2 className="font-display text-3xl italic mt-16">
            Safety Officer Course Fees
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            The fee depends on three things: the course (diploma, advanced
            diploma or B.Sc), the mode (classroom or online) and the centre you
            choose. NIFS shares the exact current fee for your course and centre
            on WhatsApp or phone. Whichever institute you choose, check that the
            fee covers practical training, exams, the certificate and placement
            support — see{" "}
            <Link
              href="/blog/safety-officer-course-fees-in-india-what-the-fee-should-cover/"
              className="text-primary underline underline-offset-4"
            >
              what a safety officer course fee should cover
            </Link>
            .
          </p>
          <a
            href="https://wa.me/918374340999?text=Please share the fee for the Safety Officer course at NIFS"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Get the fee on WhatsApp <ArrowRight className="h-4 w-4" />
          </a>

          {/* Career outcomes */}
          <h2 className="font-display text-3xl italic mt-16">
            Career Outcomes & Salary
          </h2>
          <p className="mt-3 text-muted-foreground">
            Safety officer, EHS officer and fire safety officer are common
            roles after these courses. Pay depends on experience, city and
            industry.
          </p>
          <p className="mt-4">
            <Link
              href="/blog/safety-officer-salary-in-india-2026-complete-guide/"
              className="text-primary underline underline-offset-4"
            >
              See safety officer salary per month in India, with sources
            </Link>
          </p>

          {/* Why choose NIFS */}
          <h2 className="font-display text-3xl italic mt-16">
            Why Choose NIFS for Your Safety Officer Course?
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                title: "NSDC Approved",
                desc: "All NIFS courses are National Skill Development Corporation approved and Skill India recognized.",
              },
              {
                title: "ANU Affiliated",
                desc: "Diploma and degree programs are affiliated with Acharya Nagarjuna University, a government-recognized university.",
              },
              {
                title: "Practical Training",
                desc: "70/30 practical-to-classroom ratio. Hands-on drills with real fire-fighting equipment at NIFS's training yards.",
              },
              {
                title: "Placement Support",
                desc: `${SITE.studentsPlaced} alumni. Active placement cell.`,
              },
              {
                title: `${SITE.centerCount} Centers`,
                desc: "Training centers across Visakhapatnam, Hyderabad, Delhi, Mumbai, Chennai, Kolkata, Nagpur, and 60+ more cities.",
              },
              {
                title: "ISO 9001:2015",
                desc: "Certified quality management system ensuring consistent training standards across all centers.",
              },
            ].map((w) => (
              <div key={w.title} className="border border-border p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{w.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {w.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="font-display text-3xl italic mt-16">
            Frequently Asked Questions
          </h2>
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
            <h2 className="font-display text-2xl italic">
              Ready to Start Your Safety Officer Career?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Talk to our admissions counselors. Call or WhatsApp:
              +91-8374-340-999
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/admissions"
                className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
              >
                Apply Now
              </Link>
              <Link
                href="/courses"
                className="border border-border px-7 py-3.5 text-sm font-medium hover:bg-muted inline-flex items-center gap-2"
              >
                Browse All Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
