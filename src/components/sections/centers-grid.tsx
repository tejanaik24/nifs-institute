"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IndiaMap } from "@/components/sections/india-map";
import { centers } from "@/lib/data/centers";

const stateCount = new Set(centers.map((c) => c.state)).size;

export function CentersGrid() {
  return (
    <section className="bg-muted/30 py-14 lg:py-28">
      <div data-path-target="true" className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <h2 className="font-display text-4xl italic leading-tight md:text-5xl">
          45,000+ Careers Launched
        </h2>
        <p className="mt-4 text-muted-foreground">Find a center near you</p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid items-center gap-0 border border-border bg-card text-left lg:grid-cols-[1.15fr_1fr]"
        >
          <div className="p-6 lg:p-10">
            <IndiaMap />
          </div>

          <div className="border-t border-border p-6 lg:border-t-0 lg:border-l lg:p-10">
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
                <div className="font-display text-3xl italic text-primary">45K+</div>
                <div className="text-xs text-muted-foreground">Training centers</div>
              </div>
              <div>
                <div className="font-display text-3xl italic text-primary">{stateCount}+</div>
                <div className="text-xs text-muted-foreground">States covered</div>
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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-10 inline-flex items-center border border-dashed border-[#CC0000] px-6 py-3 text-sm font-medium italic text-[#CC0000]"
        >
          &amp; International Centers →
        </motion.div>
      </div>
    </section>
  );
}
