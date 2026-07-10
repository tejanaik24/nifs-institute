"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { courses, courseTiers, type Course } from "@/lib/data/courses";

const salaryByTier: Record<Course["tier"], string> = {
  Certificate: "₹2.5–₹4 LPA",
  Diploma: "₹3–₹6 LPA",
  "Advanced Diploma": "₹4–₹8 LPA",
  "PG Diploma": "₹5–₹10 LPA",
  "B.Sc": "₹4–₹9 LPA",
  MBA: "₹6–₹12 LPA",
};

const filters = ["All", ...courseTiers] as const;

export function CoursesSection() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const reduceMotion = useReducedMotion();

  const filtered =
    active === "All" ? courses : courses.filter((c) => c.tier === active);

  return (
    <section className="overflow-x-hidden bg-[#F8F8F8] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-6">
        <span className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase">
          Find Your Path
        </span>
        <h2 className="font-display mt-3 max-w-[500px] text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.1] text-[#0A0A0A] italic">
          A Course For Every
          <br />
          Stage Of Your Career.
        </h2>

        <div className="mt-8 mb-12 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`min-h-12 px-5 py-2 text-[12px] font-medium tracking-[0.1em] uppercase transition-colors sm:min-h-0 ${
                active === f
                  ? "bg-primary text-white"
                  : "border border-[#E5E7EB] bg-white text-[#0A0A0A] hover:border-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((course, i) => (
            <motion.div
              key={course.slug}
              initial={reduceMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: (i % 4) * 0.1 }}
              className="flex bg-white shadow-sm"
            >
              <div className="w-1.5 shrink-0 bg-primary" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-[#FEF2F2] px-3 py-1 text-xs text-primary">
                    {course.tier}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">
                    {course.duration}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[#0A0A0A]">
                  {course.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[#6B7280]">
                  {course.summary}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-primary">
                    Average Salary: {salaryByTier[course.tier]}
                  </span>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-xs font-medium text-[#0A0A0A] transition-colors hover:text-primary"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/courses"
            className="min-h-12 border border-primary px-8 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          >
            View All 10 Courses →
          </Link>
        </div>
      </div>
    </section>
  );
}
