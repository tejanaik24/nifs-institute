"use client";

import { motion } from "framer-motion";
import { IndiaMap } from "@/components/sections/india-map";

export function CentersGrid() {
  return (
    <section className="bg-muted/30 py-14 lg:py-28">
      <div data-path-target="true" className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <h2 className="font-display text-4xl italic leading-tight md:text-5xl">
          85+ Centers Across India
        </h2>
        <p className="mt-4 text-muted-foreground">Find a center near you</p>

        <div className="mt-12">
          <IndiaMap />
        </div>

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
