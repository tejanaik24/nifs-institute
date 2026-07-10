"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { courses, courseTiers } from "@/lib/data/courses";
import { cn } from "@/lib/utils";

export function CourseCatalog() {
  return (
    <div className="flex flex-col gap-20 lg:gap-28">
      {courseTiers.map((tier) => {
        const tierCourses = courses.filter((c) => c.tier === tier);
        if (tierCourses.length === 0) return null;

        return (
          <div key={tier}>
            <h2 className="font-display text-2xl italic">{tier}</h2>

            <div className="mt-10 flex flex-col gap-16 lg:gap-24">
              {tierCourses.map((course, i) => {
                const reverse = i % 2 === 1;
                return (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={cn(
                      "grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12",
                      reverse && "md:[&>*:first-child]:order-2"
                    )}
                  >
                    <div
                      data-path-target="true"
                      className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
                    >
                      <Image
                        src={course.image}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        {course.duration} · {course.mode}
                      </span>
                      <h3 className="font-display mt-2 text-3xl italic leading-tight md:text-4xl">
                        {course.name}
                      </h3>
                      <p className="mt-4 max-w-md text-muted-foreground">
                        {course.summary}
                      </p>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform duration-300 hover:translate-x-1 hover:text-primary"
                      >
                        View curriculum <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
