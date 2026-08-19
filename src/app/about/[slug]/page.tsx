import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About3DScroll } from "@/components/about/about-3d-scroll";
import { AboutPageRenderer } from "@/components/about/about-page-renderer";
import { aboutPages } from "@/lib/data/about-pages";

export function generateStaticParams() {
  return aboutPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = aboutPages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: `/about/${page.slug}/` },
  };
}

export default async function AboutSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = aboutPages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <About3DScroll>
      <AboutPageRenderer page={page} />
    </About3DScroll>
  );
}
