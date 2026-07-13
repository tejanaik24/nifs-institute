"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { courses, courseTiers } from "@/lib/data/courses";
import { TiltWrapper } from "@/components/motion/tilt-wrapper";

const filters = ["All", ...courseTiers] as const;

export function CoursesSection() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const reduceMotion = useReducedMotion();

  const filtered =
    active === "All" ? courses : courses.filter((c) => c.tier === active);

  return (
    <section className="bg-background py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            Find Your Path
          </span>
          <h2 className="font-display mt-3 max-w-xl text-4xl italic leading-tight md:text-5xl">
            A Course For Every Stage Of Your Career
          </h2>
        </motion.div>

        <div className="relative mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`relative isolate min-h-12 px-5 py-2 text-[12px] font-medium tracking-[0.1em] uppercase transition-colors sm:min-h-0 ${
                active === f
                  ? "text-white"
                  : "border border-[#E5E7EB] bg-white text-[#0A0A0A] hover:border-primary"
              }`}
            >
              {active === f && (
                <motion.span
                  layoutId="course-tab-active"
                  className="absolute inset-0 -z-10 bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div
                key={course.slug}
                layout
                initial={reduceMotion ? {} : { opacity: 0, y: 28 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <span className="absolute top-0 left-0 bg-primary px-3 py-1.5 text-[11px] font-semibold tracking-widest text-white uppercase">
                        {course.tier}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {course.careers.slice(0, 2).map((c) => (
                          <span
                            key={c}
                            className="rounded-sm bg-white/15 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                          {course.duration}
                        </span>
                        <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                          {course.shortName}
                        </span>
                      </div>
                      <h3 className="font-display mt-2 text-xl leading-snug italic">
                        {course.name}
                      </h3>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </TiltWrapper>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
