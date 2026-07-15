"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { placedStudents, type PlacedStudent } from "@/lib/data/placed-students";

const PER_PAGE_DESKTOP = 8;
const PER_PAGE_MOBILE = 4;

function usePerPage() {
  const [perPage, setPerPage] = useState(PER_PAGE_DESKTOP);
  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 1024 ? PER_PAGE_MOBILE : PER_PAGE_DESKTOP);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perPage;
}

function StudentCard({ student }: { student: PlacedStudent }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border">
        <Image src={student.image} alt={`${student.name}, ${student.role} at ${student.company}`} fill sizes="80px" className="object-cover" />
      </div>
      <p className="mt-3 text-xs font-semibold text-foreground">{student.name}</p>
      <p className="text-[10px] tracking-wide text-muted-foreground uppercase">{student.role}</p>
      <p className="text-[10px] font-medium text-primary">{student.company}</p>
      <p className="text-[10px] text-muted-foreground">CTC: {student.ctc}</p>
    </div>
  );
}

export function StudentGrid() {
  const [page, setPage] = useState(0);
  const perPage = usePerPage();
  const totalPages = Math.ceil(placedStudents.length / perPage);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  function go(dir: 1 | -1) {
    setPage((p) => (p + dir + totalPages) % totalPages);
  }

  const visible = placedStudents.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">Real Outcomes</span>
            <h2 className="mt-3 flex items-center gap-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
              <ShieldCheck className="h-7 w-7 text-primary" />
              Our Students Placed In
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous students"
              onClick={() => go(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-muted-foreground">{page + 1} / {totalPages}</span>
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

        <div className="relative mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {visible.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
