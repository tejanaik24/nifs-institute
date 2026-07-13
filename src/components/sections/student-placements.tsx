"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { placedStudents } from "@/lib/data/placed-students";

const PER_PAGE_DESKTOP = 5;
const PER_PAGE_MOBILE = 2;

function usePerPage() {
  const [perPage, setPerPage] = useState(PER_PAGE_DESKTOP);
  useEffect(() => {
    const update = () =>
      setPerPage(window.innerWidth < 640 ? PER_PAGE_MOBILE : PER_PAGE_DESKTOP);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perPage;
}

export function StudentPlacements() {
  const [page, setPage] = useState(0);
  const perPage = usePerPage();
  const reduceMotion = useReducedMotion();
  const totalPages = Math.ceil(placedStudents.length / perPage);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  function go(dir: 1 | -1) {
    setPage((p) => (p + dir + totalPages) % totalPages);
  }

  const visible = placedStudents.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <ShieldCheck className="h-7 w-7 shrink-0 text-primary" />
          <h2 className="font-display text-2xl italic leading-tight md:text-3xl">
            Our Students Placed In
          </h2>
          <div className="ml-4 hidden h-px flex-1 bg-border sm:block" />
        </motion.div>

        <div className="relative mt-8 flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label="Previous students"
            onClick={() => go(-1)}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary sm:flex md:hidden lg:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait" custom={perPage}>
              <motion.div
                key={page}
                custom={perPage}
                initial={reduceMotion ? {} : { opacity: 0, x: 24 }}
                animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              >
                {visible.map((student) => (
                  <div
                    key={student.id}
                    className="flex flex-col items-center border border-border bg-card p-3 text-center shadow-sm"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={student.image}
                        alt={`${student.name}, ${student.role} at ${student.company}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-foreground">
                      {student.name}
                    </p>
                    <p className="text-[10px] tracking-wide text-muted-foreground uppercase">
                      {student.role}
                    </p>
                    <p className="text-[10px] font-medium text-primary">
                      {student.company}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      CTC: {student.ctc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            aria-label="Next students"
            onClick={() => go(1)}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary sm:flex md:hidden lg:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
          <button
            type="button"
            aria-label="Previous students"
            onClick={() => go(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="Next students"
            onClick={() => go(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
