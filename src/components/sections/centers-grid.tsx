"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IndiaMap } from "@/components/sections/india-map";
import { centers } from "@/lib/data/centers";
import { CenterDetailCard } from "@/components/sections/center-detail-card";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

export function CentersGrid() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const selectedCenter = centers.find((c) => c.city === selectedCity) ?? null;

  function handleSelect(city: string) {
    setSelectedCity(city);
    if (!reduceMotion) {
      requestAnimationFrame(() =>
        mobileCardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      );
    }
  }

  return (
    <section className="relative overflow-hidden">
      <SpineGutterBg color="var(--background)" />

      <SpineSplit
        align="start"
        left={
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <IndiaMap selectedCity={selectedCity} onSelect={handleSelect} />

            {/* Mobile-only detail card — SpineSplit's center slot is desktop-only */}
            {selectedCenter && (
              <div ref={mobileCardRef} className="mt-6 flex justify-center lg:hidden">
                <AnimatePresence mode="wait">
                  <CenterDetailCard
                    key={selectedCenter.city}
                    center={selectedCenter}
                    onClose={() => setSelectedCity(null)}
                  />
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        }
        center={
          <AnimatePresence mode="wait">
            {selectedCenter ? (
              <CenterDetailCard
                key={selectedCenter.city}
                center={selectedCenter}
                onClose={() => setSelectedCity(null)}
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex w-full max-w-[320px] flex-col items-center gap-3 border border-dashed border-primary/30 px-6 py-10 text-center"
              >
                <span className="text-2xl text-primary">◎</span>
                <p className="text-sm text-muted-foreground">
                  Select a center on the map to view its details
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        }
        right={
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
              Pan-India Network
            </span>
            <h3 className="mt-4 font-display text-2xl italic">
              Find a center near you
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              NIFS trains and places candidates from 86 centers across India
              — tap a location on the map or a city below to see its details.
            </p>

            <div className="mt-6 flex gap-8 border-y border-border py-5">
              <div>
                <div className="font-display text-3xl italic text-primary">86</div>
                <div className="text-xs text-muted-foreground">Centers</div>
              </div>
              <div>
                <div className="font-display text-3xl italic text-primary">24</div>
                <div className="text-xs text-muted-foreground">States</div>
              </div>
              <div>
                <div className="font-display text-3xl italic text-primary">3+</div>
                <div className="text-xs text-muted-foreground">African Countries</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Major centers
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {centers.slice(0, 10).map((c) => (
                  <button
                    key={c.city}
                    type="button"
                    onClick={() => handleSelect(c.city)}
                    aria-pressed={selectedCity === c.city}
                    className={`border px-3 py-1 text-xs transition-colors ${
                      selectedCity === c.city
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground/80 hover:border-primary/50"
                    }`}
                  >
                    {c.city}
                  </button>
                ))}
                <Link
                  href="/centers"
                  className="px-3 py-1 text-xs font-medium text-primary underline-offset-2 hover:underline"
                >
                  +75 more
                </Link>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="tel:+919246624690"
                className="inline-flex items-center bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Call HQ
              </a>
              <a
                href="https://wa.me/919246624690"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                WhatsApp Us
              </a>
              <Link
                href="/centers"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                View All Centers →
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Can&apos;t find your city? Reach our admissions team — they&apos;ll
              connect you to your nearest center.
            </p>
          </motion.div>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
        className="relative z-[3] mx-auto flex max-w-5xl justify-center px-6 pb-4 lg:px-10"
      >
        <div className="inline-flex items-center border border-dashed border-primary px-6 py-3 text-sm font-medium italic text-primary">
          &amp; International Centers →
        </div>
      </motion.div>
    </section>
  );
}
