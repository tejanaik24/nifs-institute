"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { courses } from "@/lib/data/courses";
import Image from "next/image";
import { motion } from "framer-motion";
import { TiltWrapper } from "@/components/motion/tilt-wrapper";

export function CourseGrid() {
  const featured = courses.filter((c) =>
    ["b-sc-in-fire-industrial-safety", "advanced-diploma-in-industrial-safety-adis", "pg-diploma-in-health-safety-environment-pg-dhse", "mba-in-safety-management"].includes(c.slug)
  );

  return (
    <section
      data-path-stretch="true"
      className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-28"
    >
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Certificate → Diploma → PG Diploma → B.Sc → MBA
          </span>
          <h2 className="font-display mt-2 max-w-xl text-4xl italic leading-tight md:text-5xl">
            A course for every stage of a safety career
          </h2>
        </div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          View all 10 courses <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div
        data-path-target="true"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {featured.map((course, i) => (
          <motion.div
            key={course.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <TiltWrapper className="flex h-full flex-col">
              <Link
                href={`/courses/${course.slug}`}
                className="group flex flex-1 flex-col overflow-hidden border border-border bg-card transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-0 top-0 bg-[#CC0000] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white">
                    {course.tier}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {course.duration}
                  </span>
                  <h3 className="font-display mt-2 text-xl italic leading-snug">
                    {course.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {course.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </TiltWrapper>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
