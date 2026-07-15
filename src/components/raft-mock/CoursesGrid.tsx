"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { courses, courseTiers, type Course } from "@/lib/data/courses";

const filters = ["All", ...courseTiers] as const;

function CourseCard({ course, i }: { course: Course; i: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -8 }}
      transition={{ duration: 0.3, delay: (i % 4) * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/courses/${course.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={course.image}
            alt={course.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
            {course.tier}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            {course.duration}
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">
            {course.name}
          </h3>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
            Learn more <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function CoursesGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const filtered = active === "All" ? courses : courses.filter((c) => c.tier === active);

  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">
              Find Your Path
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
              A Course For Every Stage
            </h2>
          </div>
          <div className="relative flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`relative isolate rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
                  active === f ? "text-white" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {active === f && (
                  <motion.span
                    layoutId="course-tab-active"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <CourseCard key={course.slug} course={course} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/courses"
            className="rounded-md border border-primary px-8 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          >
            View All 10 Courses →
          </Link>
        </div>
      </div>
    </section>
  );
}
