import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Blog — Safety Insights & NIFS News | NIFS India",
  description: "Articles on industrial safety regulations, NIFS announcements, and events.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Safety insights & NIFS updates"
        description="Articles, events, and announcements — coming soon."
      />
      <section data-path-target="true" className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        <p className="text-muted-foreground">
          We&apos;re migrating our articles from the old site. Check back
          soon, or follow NIFS on Instagram for the latest updates.
        </p>
      </section>
    </>
  );
}
