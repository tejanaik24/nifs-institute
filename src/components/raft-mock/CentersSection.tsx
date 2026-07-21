"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IndiaMap } from "@/components/sections/india-map";
import { centers } from "@/lib/data/centers";
import { CenterDetailCard } from "@/components/sections/center-detail-card";

export function CentersSection() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const selectedCenter = centers.find((c) => c.city === selectedCity) ?? null;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <IndiaMap selectedCity={selectedCity} onSelect={setSelectedCity} />
          {selectedCenter && (
            <div className="mt-6 flex justify-center">
              <CenterDetailCard
                key={selectedCenter.city}
                center={selectedCenter}
                onClose={() => setSelectedCity(null)}
              />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">
            Pan-India Network
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
            Find a center near you
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            NIFS trains and places candidates from 86 centers across India —
            tap a location on the map or a city below to see its details.
          </p>

          <div className="mt-6 flex gap-8 border-y border-border py-5">
            <div>
              <div className="text-3xl font-bold text-primary">86</div>
              <div className="text-xs text-muted-foreground">Centers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24</div>
              <div className="text-xs text-muted-foreground">States</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">3+</div>
              <div className="text-xs text-muted-foreground">African Countries</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {centers.slice(0, 10).map((c) => (
              <button
                key={c.city}
                type="button"
                onClick={() => setSelectedCity(c.city)}
                aria-pressed={selectedCity === c.city}
                className={`rounded-md border px-3 py-1 text-xs transition-colors ${
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

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="tel:+918374340999"
              className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Call HQ
            </a>
            <a
              href="https://wa.me/918374340999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
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
        </motion.div>
      </div>
    </section>
  );
}
