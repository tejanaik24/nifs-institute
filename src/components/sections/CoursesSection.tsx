"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { courses, courseTiers, type Course } from "@/lib/data/courses";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

const filters = ["All", ...courseTiers] as const;

function CourseCard({ course, i }: { course: Course; i: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
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
          <span className="text-xs text-[#9CA3AF]">{course.duration}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-[#0A0A0A]">
          {course.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-[#6B7280]">
          {course.summary}
        </p>
        <div className="mt-4 flex items-center justify-end gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className="text-xs font-medium text-[#0A0A0A] transition-colors hover:text-primary"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function CoursesSection() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered =
    active === "All" ? courses : courses.filter((c) => c.tier === active);
  const mid = Math.ceil(filtered.length / 2);
  const leftCourses = filtered.slice(0, mid);
  const rightCourses = filtered.slice(mid);

  return (
    <section className="relative overflow-x-hidden">
      <SpineGutterBg color="#F8F8F8" />

      <div className="relative z-[3] mx-auto max-w-[1600px] px-5 pt-16 lg:px-0 lg:pt-24">
        <div className="mx-auto flex max-w-[1150px] flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
          <div className="relative hidden aspect-video w-[220px] shrink-0 overflow-hidden lg:block">
            <Image
              src="/images/courses-classroom.png"
              alt="Certificate-level student in a NIFS classroom"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-[11px] font-medium tracking-[0.15em] text-primary uppercase">
              Find Your Path
            </span>
            <h2 className="font-display mx-auto mt-3 max-w-[500px] text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.1] text-[#0A0A0A] italic lg:mx-0">
              A Course For Every Stage Of Your Career.
            </h2>
          </div>
        </div>

        <div className="mx-auto max-w-[1150px] text-center">
          <div className="mt-8 mb-4 flex flex-wrap justify-center gap-2">
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
        </div>
      </div>

      <SpineSplit
        className="!py-0 lg:!pt-8 lg:!pb-24"
        left={
          <div className="flex flex-col gap-6">
            {leftCourses.map((course, i) => (
              <CourseCard key={course.slug} course={course} i={i} />
            ))}
          </div>
        }
        right={
          <div className="flex flex-col gap-6">
            {rightCourses.map((course, i) => (
              <CourseCard key={course.slug} course={course} i={i} />
            ))}
          </div>
        }
      />

      <div className="relative z-[3] mx-auto flex max-w-[1600px] justify-center px-5 pb-16 lg:px-0 lg:pb-24">
        <Link
          href="/courses"
          className="min-h-12 border border-primary px-8 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
        >
          View All 10 Courses →
        </Link>
      </div>
    </section>
  );
}
