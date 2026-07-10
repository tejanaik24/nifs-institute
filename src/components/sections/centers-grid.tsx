"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { centers } from "@/lib/data/centers";

export function CentersGrid() {
  return (
    <section className="bg-muted/30 py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <h2 className="font-display text-4xl italic leading-tight md:text-5xl">
          85+ Centers Across India
        </h2>
        <p className="mt-4 text-muted-foreground">Find a center near you</p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {centers.map((center, i) => (
            <motion.div
              key={center.city}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center justify-center gap-2 border border-border bg-card px-4 py-5 text-sm font-medium text-foreground"
            >
              <MapPin className="h-4 w-4 shrink-0 text-[#CC0000]" strokeWidth={1.75} />
              {center.city}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: centers.length * 0.04 }}
            className="flex items-center justify-center border border-dashed border-[#CC0000] px-4 py-5 text-sm font-medium italic text-[#CC0000]"
          >
            &amp; International Centers →
          </motion.div>
        </div>
      </div>
    </section>
  );
}
