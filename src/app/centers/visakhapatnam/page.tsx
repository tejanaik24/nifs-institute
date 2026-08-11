import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { courses } from "@/lib/data/courses";
import {
  LocalBusinessSchema,
  CourseSchema,
  FAQSchema,
  BreadcrumbSchema,
} from "@/lib/seo/schema";

const PAGE_URL = "https://nifsindia.net/centers/visakhapatnam/";
const PHONE_DISPLAY = "+91-8374-340-999";
const PHONE_TEL = "tel:+918374340999";

// Top 3 courses for Visakhapatnam search intent: DFS covers the entry-level
// "fire safety training" search itself, ADFS/ADIS map directly to the two
// largest local employer categories (fire risk + industrial plant safety).
const FEATURED_SLUGS = [
  "diploma-in-fire-safety",
  "advanced-diploma-in-fire-safety-adfs",
  "advanced-diploma-in-industrial-safety-adis",
];
const featuredCourses = FEATURED_SLUGS.map(
  (slug) => courses.find((c) => c.slug === slug)!
);

const industries = [
  {
    name: "Visakhapatnam Steel Plant (RINL)",
    detail: "~7.3 MTPA liquid steel capacity, ~28,000 employees at the Gajuwaka works.",
  },
  {
    name: "HPCL Visakhapatnam Refinery",
    detail: "The first oil refinery on India's east coast — hydrocarbon processing with zero-margin fire response times.",
  },
  {
    name: "Visakhapatnam Port",
    detail: "Major cargo port with strict onboard and yard fire-safety protocols.",
  },
  {
    name: "Hindustan Shipyard Limited",
    detail: "Shipbuilding and Eastern Naval Command dockyard operations.",
  },
  {
    name: "Jawaharlal Nehru Pharma City (JNPC)",
    detail: "Dedicated pharma SEZ near Parawada with multiple manufacturing units.",
  },
];

const faqs = [
  {
    question: "Where is NIFS located in Visakhapatnam?",
    answer:
      "NIFS's headquarters is at Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd Floor, Visakhapatnam (A.P.) – 530016.",
  },
  {
    question: "Which fire safety course should I start with in Visakhapatnam?",
    answer:
      "If you're starting fresh after 10th or 12th, the Diploma in Fire & Safety (DFS) is the standard entry point. If you already have a diploma and want a supervisory or industrial-safety track, the Advanced Diploma in Fire & Safety (ADFS) or Advanced Diploma in Industrial Safety (ADIS) is the next step.",
  },
  {
    question: "Do NIFS Visakhapatnam courses include practical training?",
    answer:
      "Yes — NIFS runs a dedicated practical training yard for live equipment handling, drill scenarios, and hazard simulations rather than classroom theory alone.",
  },
  {
    question: "Is NIFS Visakhapatnam government recognized?",
    answer:
      "Yes. NIFS is NSDC and Skill India approved, ISO 9001:2015 certified, with SBTET Andhra Pradesh recognition for diploma-level courses and degree affiliation through Acharya Nagarjuna University and Annamalai University.",
  },
  {
    question: "Which industries in Visakhapatnam hire NIFS graduates?",
    answer:
      "Steel (Visakhapatnam Steel Plant / RINL), petroleum refining (HPCL Visakhapatnam Refinery), port and shipping operations, and pharmaceutical manufacturing (JNPC) are the largest local employers of certified fire and safety officers.",
  },
];

export const metadata: Metadata = {
  title: "Fire Safety Training in Visakhapatnam | NIFS Institute",
  description:
    "NIFS's Visakhapatnam headquarters offers fire & industrial safety courses built around the city's steel, petroleum, port and pharma industries. Call +91-8374-340-999 or apply online.",
  alternates: { canonical: "/centers/visakhapatnam/" },
};

export default function VisakhapatnamCenterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Centers", url: "https://nifsindia.net/centers/" },
          { name: "Visakhapatnam", url: PAGE_URL },
        ]}
      />
      <LocalBusinessSchema url={PAGE_URL} />
      {featuredCourses.map((course) => (
        <CourseSchema
          key={course.slug}
          name={course.name}
          description={course.summary}
          url={`https://nifsindia.net/courses/${course.slug}/`}
          duration={course.duration}
          tier={course.tier}
        />
      ))}
      <FAQSchema faqs={faqs} />

      <PageHero
        eyebrow="Visakhapatnam Headquarters"
        title="Fire Safety Training in Visakhapatnam | NIFS Institute"
        description="Certificate to B.Sc programs, run from NIFS's own HQ in Dwarakanagar — built around the industries that actually hire in this city."
      />

      {/* Phone + Apply CTA strip */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-6 py-6 sm:flex-row lg:px-10">
          <a
            href={PHONE_TEL}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            {PHONE_DISPLAY}
          </a>
          <Link
            href="/admissions"
            className="bg-primary px-7 py-3 text-sm font-medium text-primary-foreground"
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* Local industries */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <h2 className="font-display text-2xl italic">
          Built for Visakhapatnam&rsquo;s Industries
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Fire and safety officers aren&rsquo;t optional hires in this city — Visakhapatnam&rsquo;s
          largest employers are legally required to staff them.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div key={ind.name} className="border border-border bg-card p-5">
              <p className="font-medium">{ind.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{ind.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
          <h2 className="font-display text-2xl italic">
            Courses Available at NIFS Visakhapatnam
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {course.tier} · {course.duration}
                </span>
                <p className="font-display mt-3 text-lg italic">{course.name}</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {course.summary}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Eligibility: {course.eligibility}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Looking for a different level?{" "}
            <Link href="/courses" className="font-medium text-primary underline">
              See the full course ladder
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Why NIFS Vizag */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <h2 className="font-display text-2xl italic">Why Train at NIFS Visakhapatnam</h2>
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
          <ul className="space-y-4">
            {[
              "NSDC and Skill India approved, ISO 9001:2015 certified",
              "Degree programs affiliated with Acharya Nagarjuna University and Annamalai University",
              "SBTET, Andhra Pradesh recognition for diploma-level courses",
              "Dedicated practical training yard — live equipment, drills, hazard simulations",
              "15+ training centers across India, headquartered right here in Visakhapatnam",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
          <div className="flex items-start gap-3 border border-border bg-card p-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">NIFS Visakhapatnam HQ</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building, 3rd
                Floor, Visakhapatnam (A.P.) – 530016
              </p>
              <a
                href={PHONE_TEL}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
          <h2 className="font-display text-2xl italic">
            Careers After Fire Safety Training in Visakhapatnam
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
            Graduates go on to roles including Fire Warden, Site Safety Officer,
            Industrial Safety Officer, Plant Safety Coordinator, and Fire &amp; Safety
            Manager. NIFS graduates specifically have been placed with employers
            including Adani, L&amp;T, ITC, and Amazon.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <h2 className="font-display text-2xl italic">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-border pb-6">
              <p className="font-medium">{faq.question}</p>
              <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center lg:px-10">
          <h2 className="font-display text-2xl italic">
            Start your fire safety training in Visakhapatnam
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
            >
              Apply Now
            </Link>
            <a
              href={PHONE_TEL}
              className="flex items-center gap-2 text-sm font-medium text-background hover:text-primary"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
