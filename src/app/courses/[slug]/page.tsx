import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { courses } from "@/lib/data/courses";
import Image from "next/image";

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
    title: `${course.name} | NIFS India`,
    description: course.summary,
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
    <article className="pt-28 lg:pt-32">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
        <div data-path-target="true">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {course.tier}
          </span>
          <h1 className="font-display mt-3 max-w-3xl text-4xl italic leading-tight md:text-5xl">
            {course.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {course.summary}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
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

        <div className="relative mt-12 aspect-[16/7] w-full overflow-hidden rounded-sm">
          <Image
            src={course.image}
            alt={`${course.name} — practical training`}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl italic">Key Subjects Covered</h2>
            <ul className="mt-4 space-y-3">
              {course.subjects.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl italic">Career Opportunities</h2>
            <ul className="mt-4 space-y-3">
              {course.careers.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-border pt-10">
          <Link
            href="/admissions"
            className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
          >
            Join Now &amp; Secure Your Future
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
  );
}
