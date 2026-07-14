"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { placedStudents, type PlacedStudent } from "@/lib/data/placed-students";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

const PER_PAGE_DESKTOP = 6; // 3 left gutter + 3 right gutter
const PER_PAGE_MOBILE = 4;

function usePerPage() {
  const [perPage, setPerPage] = useState(PER_PAGE_DESKTOP);
  useEffect(() => {
    const update = () =>
      setPerPage(window.innerWidth < 1024 ? PER_PAGE_MOBILE : PER_PAGE_DESKTOP);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perPage;
}

function StudentCard({ student }: { student: PlacedStudent }) {
  return (
    <div className="flex flex-col items-center border border-border bg-card p-3 text-center shadow-sm">
      <div className="relative h-20 w-20 overflow-hidden rounded-sm border border-border">
        <Image
          src={student.image}
          alt={`${student.name}, ${student.role} at ${student.company}`}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <p className="mt-2 text-xs font-semibold text-foreground">{student.name}</p>
      <p className="text-[10px] tracking-wide text-muted-foreground uppercase">
        {student.role}
      </p>
      <p className="text-[10px] font-medium text-primary">{student.company}</p>
      <p className="text-[10px] text-muted-foreground">CTC: {student.ctc}</p>
    </div>
  );
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
  const half = Math.ceil(visible.length / 2);
  const leftCards = visible.slice(0, half);
  const rightCards = visible.slice(half);

  const navButtons = (size: "sm" | "lg") => (
    <div className={`flex items-center gap-3 ${size === "lg" ? "justify-center" : ""}`}>
      <button
        type="button"
        aria-label="Previous students"
        onClick={() => go(-1)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="text-xs text-white/70">
        {page + 1} / {totalPages}
      </span>
      <button
        type="button"
        aria-label="Next students"
        onClick={() => go(1)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <section className="relative overflow-hidden py-16 lg:py-0">
      <SpineGutterBg color="var(--background)" />

      {/* ── DESKTOP: spine split — cards flanking center controls ── */}
      <div className="hidden lg:block">
        <SpineSplit
          align="center"
          left={
            <div className="px-6 lg:pr-10 lg:pl-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${page}`}
                  initial={reduceMotion ? {} : { opacity: 0, x: 24 }}
                  animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {leftCards.map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          }
          center={
            <div className="flex flex-col items-center gap-5 text-center">
              <ShieldCheck className="h-8 w-8 text-white" />
              <h2 className="font-display text-2xl leading-tight text-white italic">
                Our Students
                <br />
                Placed In
              </h2>
              {navButtons("lg")}
            </div>
          }
          right={
            <div className="px-6 lg:pr-0 lg:pl-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${page}`}
                  initial={reduceMotion ? {} : { opacity: 0, x: 24 }}
                  animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {rightCards.map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          }
        />
      </div>

      {/* ── MOBILE: stacked single column ── */}
      <div className="relative z-[3] mx-auto max-w-5xl px-6 py-16 lg:hidden">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 shrink-0 text-primary" />
          <h2 className="font-display text-2xl italic leading-tight">
            Our Students Placed In
          </h2>
        </div>

        <div className="relative mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={reduceMotion ? {} : { opacity: 0, x: 24 }}
              animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {visible.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
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
