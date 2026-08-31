import { courses } from "@/lib/data/courses";
import { BreadcrumbSchema, CourseSchema, FAQSchema } from "@/lib/seo/schema";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: course.seoTitle ?? `${course.name} | NIFS India`,
    description: course.seoDescription ?? course.summary,
    alternates: { canonical: `/courses/${slug}/` },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <CourseSchema
        name={course.name}
        description={course.summary}
        url={`https://nifsindia.net/courses/${course.slug}/`}
        duration={course.duration}
        tier={course.tier}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Courses", url: "https://nifsindia.net/courses/" },
          {
            name: course.name,
            url: `https://nifsindia.net/courses/${course.slug}/`,
          },
        ]}
      />
      <FAQSchema
        faqs={[
          {
            question: `What is ${course.name}?`,
            answer: course.summary,
          },
          {
            question: `What is the eligibility for ${course.name}?`,
            answer: `${course.name} requires ${course.eligibility}. The course duration is ${course.duration} and is available in ${course.mode} mode.`,
          },
          {
            question: `What is the duration of ${course.name}?`,
            answer: `${course.name} has a duration of ${course.duration}.`,
          },
          {
            question: `What are the career opportunities after ${course.name}?`,
            answer: `After completing ${course.name}, graduates can pursue careers as ${course.careers.join(", ")}.`,
          },
          {
            question: `Is ${course.name} recognized by the government?`,
            answer:
              course.accreditedBy === "NSDC"
                ? `Yes, ${course.name} is NSDC-affiliated. NIFS India is also ISO 9001:2015 certified.`
                : course.accreditedBy === "ANU"
                  ? `${course.name} is offered in association with Acharya Nagarjuna University. NIFS India is also NSDC-approved and ISO 9001:2015 certified.`
                  : course.accreditedBy === "SBTET-AP"
                    ? `${course.name} is affiliated to the State Board of Technical Education & Training, Andhra Pradesh (SBTET-AP). NIFS India is also NSDC-approved and ISO 9001:2015 certified.`
                    : `NIFS India is an NSDC & Skill India approved, ISO 9001:2015 certified training institute.`,
          },
        ]}
      />
      <article className="pt-32 lg:pt-36">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
          <div data-path-target="true">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {course.tier}
            </span>
            <h1 className="font-display mt-3 max-w-3xl text-4xl italic leading-tight md:text-5xl">
              {course.h1 ?? course.name}
            </h1>
            <p className="speakable-summary mt-6 max-w-2xl text-lg text-muted-foreground">
              {course.summary}
            </p>
          </div>

          <div
            data-path-target="true"
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { label: "Duration", value: course.duration },
              { label: "Eligibility", value: course.eligibility },
              { label: "Mode", value: course.mode },
              { label: "Tier", value: course.tier },
            ].map((f) => (
              <div key={f.label} className="border border-border p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </p>
                <p className="mt-1 text-sm font-medium">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Trust Badges Bar */}
          <div
            data-path-target="true"
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 border-y border-border py-4"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>NSDC / Govt Approved</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>25+ Years Legacy</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>70+ Centers in India</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>45,000+ Placed</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>ISO 9001:2015</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>Practical Training Yard</span>
            </div>
          </div>

          <div
            data-path-target="true"
            className="relative mt-8 aspect-[16/7] w-full overflow-hidden rounded-sm border border-border"
          >
            <Image
              src={course.image}
              alt={`${course.name} — practical training`}
              fill
              className="object-cover"
            />
          </div>

          {/* Section: What You Will Learn & Career Scope */}
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl italic text-foreground">
                Core Curriculum &amp; Modules
              </h2>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Hands-on practical &amp; statutory compliance modules covered in
                this program:
              </p>
              <ul className="space-y-3">
                {course.subjects.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl italic text-foreground">
                Career Paths &amp; Designations
              </h2>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Immediate job designations our graduates step into upon course
                completion:
              </p>
              <ul className="space-y-3">
                {course.careers.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Statutory Importance & Legal Value */}
          <div className="mt-12 space-y-4 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
            <h2 className="font-display text-2xl italic text-foreground">
              Statutory Legal Mandate &amp; Industrial Demand
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Under <strong>The Factories Act, 1948 (Section 40-B)</strong> and
              the{" "}
              <strong>
                Occupational Safety, Health and Working Conditions Code (OSH
                Code 2026)
              </strong>
              , manufacturing plants, construction projects, and hazardous
              process units across India are legally mandated to appoint
              certified Safety Officers. Holding an accredited qualification
              like {course.name} from NIFS India gives you direct compliance
              eligibility for registered factory inspectorate audits.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="rounded-lg border border-border bg-background p-4 text-center">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Domestic Starting Salary
                </span>
                <p className="text-xl font-bold text-foreground mt-1">
                  ₹3.0L – ₹4.8L / Year
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4 text-center">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Mid-Career (3-5 Years)
                </span>
                <p className="text-xl font-bold text-primary mt-1">
                  ₹6.5L – ₹11.0L / Year
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4 text-center">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Gulf / Middle East
                </span>
                <p className="text-xl font-bold text-foreground mt-1">
                  ₹18L – ₹35L / Year
                </p>
              </div>
            </div>
          </div>

          {/* Section: Practical Training Yard Experience */}
          <div className="mt-12 space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <h2 className="font-display text-2xl italic text-foreground">
              Real Hands-On Drills at NIFS Practical Training Yard
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Theoretical knowledge alone is never sufficient on an industrial
              plant floor. At NIFS India, every student enrolled in{" "}
              {course.name} receives intense physical training at our dedicated
              Practical Firefighting and Safety Yard:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>
                  Live Class A, B, C, D fire suppression with dry powder, CO₂,
                  and foam.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>
                  Self-Contained Breathing Apparatus (SCBA) in zero-visibility
                  smoke chambers.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>
                  High-altitude rescue, harness inspection, and scaffolding
                  safety.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>
                  Chemical spill management, emergency response planning, and
                  first aid triage.
                </span>
              </div>
            </div>
          </div>

          {/* Top Recruiters */}
          <div className="mt-12 space-y-4">
            <h2 className="font-display text-2xl italic text-foreground">
              Top Hiring Partners for {course.shortName}
            </h2>
            <p className="text-xs text-muted-foreground">
              Our alumni have been placed across leading industrial powerhouses:
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              {[
                "Larsen & Toubro (L&T)",
                "Adani Group",
                "Reliance Industries",
                "ITC Limited",
                "GMR Group",
                "MEIL",
                "Amazon India",
                "Sun Pharma",
              ].map((comp) => (
                <span
                  key={comp}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-border pt-10">
            <a
              href={`https://wa.me/918374340999?text=${encodeURIComponent(`Hi NIFS, I want to know more about ${course.name}, course fees, eligibility and admissions.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/25 transition-all duration-200"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
              </svg>
              <span>Chat on WhatsApp for Fees &amp; Eligibility</span>
            </a>
            <Link
              href="/admissions"
              className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 rounded-sm"
            >
              Apply Online
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
            >
              All courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
