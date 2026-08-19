import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { industrialServices } from "@/lib/data/industrial-services";
import Image from "next/image";
import { FAQSchema, BreadcrumbSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return industrialServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = industrialServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | NIFS Industrial Services`,
    description: service.body,
    alternates: { canonical: `/industrial-services/${slug}/` },
  };
}

export default async function IndustrialServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = industrialServices.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net" },
          { name: "Industrial Services", url: "https://nifsindia.net/industrial-services/" },
          { name: service.title, url: `https://nifsindia.net/industrial-services/${service.slug}/` },
        ]}
      />
      <FAQSchema
        faqs={[
          {
            question: `What does NIFS offer under ${service.title}?`,
            answer: `${service.body} This includes ${service.offerings.slice(0, 4).join(", ")}, and more.`,
          },
          {
            question: `Who is ${service.title} for?`,
            answer: `${service.title} is delivered for manufacturing, construction, and process industry sites that need on-site or consultative fire and industrial safety support from NIFS.`,
          },
        ]}
      />
      <article className="pt-32 lg:pt-36">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
          <div data-path-target="true">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Industrial Services
            </span>
            <h1 className="font-display mt-3 max-w-3xl text-4xl italic leading-tight md:text-5xl">
              {service.title}
            </h1>
            <p className="speakable-summary mt-6 max-w-2xl text-lg text-muted-foreground">
              {service.body}
            </p>
          </div>

          <div
            data-path-target="true"
            className="relative mt-12 aspect-[16/7] w-full overflow-hidden rounded-sm"
          >
            <Image
              src={`/images/${service.slot}`}
              alt={`${service.title} — NIFS Industrial Services`}
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl italic">What&apos;s Included</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.offerings.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-border pt-10">
            <Link
              href="/contact"
              className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
            >
              Request This Service
            </Link>
            <Link
              href="/industrial-services"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
            >
              All industrial services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
