import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/page-hero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { galleryCategories } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Gallery & Facilities | NIFS India",
  description:
    "Practical training yards, industrial visits, graduations, guest lectures, and campus life at NIFS — 180+ real photos across 12 categories.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery & Facilities"
        title="See where the training happens"
        description="Practical training yards, industrial visits, graduations, and campus life — in pictures."
      />
      <Suspense fallback={null}>
        <GalleryGrid categories={galleryCategories} />
      </Suspense>
    </>
  );
}
