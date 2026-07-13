"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryCategory } from "@/lib/data/gallery";

export function GalleryGrid({ categories }: { categories: GalleryCategory[] }) {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const initialSlug =
    (requestedCategory &&
      categories.find((c) => c.slug === requestedCategory)?.slug) ||
    categories[0]?.slug;

  const [active, setActive] = useState(initialSlug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === active) ?? categories[0],
    [categories, active]
  );
  const images = activeCategory?.images ?? [];

  useEffect(() => {
    setLightboxIndex(null);
  }, [active]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + images.length) % images.length
        );
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="relative flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setActive(c.slug)}
            className={`relative isolate min-h-12 px-5 py-2 text-[12px] font-medium tracking-[0.1em] uppercase transition-colors sm:min-h-0 ${
              active === c.slug
                ? "text-white"
                : "border border-[#E5E7EB] bg-white text-[#0A0A0A] hover:border-primary"
            }`}
          >
            {active === c.slug && (
              <motion.span
                layoutId="gallery-tab-active"
                className="absolute inset-0 -z-10 bg-primary"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {c.name}
            <span className="ml-1.5 opacity-70">({c.images.length})</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 flex flex-wrap gap-4">
        <AnimatePresence mode="popLayout">
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: (i % 8) * 0.03 }}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[4/3] min-w-[240px] flex-1 overflow-hidden rounded-sm border border-border"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 text-white/80 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) =>
                  i === null ? null : (i - 1 + images.length) % images.length
                );
              }}
              className="absolute left-3 text-white/80 transition-colors hover:text-white sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-9 w-9" />
            </button>
            <div
              className="relative h-full max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) =>
                  i === null ? null : (i + 1) % images.length
                );
              }}
              className="absolute right-3 text-white/80 transition-colors hover:text-white sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
