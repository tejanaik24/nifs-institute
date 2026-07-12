"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IndiaMap } from "@/components/sections/india-map";
import { centers } from "@/lib/data/centers";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

export function CentersGrid() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-28">
      <SpineGutterBg color="var(--background)" />

      <SpineSplit
        left={
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <IndiaMap />
          </motion.div>
        }
        right={
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
              Headquarters
            </span>
            <h3 className="mt-4 font-display text-2xl italic">
              NIFS Visakhapatnam
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building,
              3rd Floor, Visakhapatnam (A.P.) – 530016
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
                  <span
                    key={c.city}
                    className="border border-border px-3 py-1 text-xs text-foreground/80"
                  >
                    {c.city}
                  </span>
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
