"use client";

import { courses, courseTiers } from "@/lib/data/courses";
import { cn } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
                  <div
                    key={course.slug}
                    className={cn(
                      "grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12",
                      reverse && "md:[&>*:first-child]:order-2",
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
                      <div className="mt-6">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-transform duration-300 hover:translate-x-1 hover:text-primary"
                        >
                          View curriculum <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>

                      {/* Confused what to choose CTA */}
                      <div className="mt-5 rounded-xl border border-dashed border-border/80 bg-muted/40 p-4 max-w-md">
                        <p className="text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                          <span>Confused what to choose?</span>
                          <span className="text-[11px] font-normal text-muted-foreground">
                            Talk to our career expert:
                          </span>
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2.5">
                          <a
                            href="tel:+918374340999"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs hover:border-primary/50 hover:bg-muted/50 transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5 text-primary" />
                            <span>Call +91 8374 340 999</span>
                          </a>
                          <a
                            href={`https://wa.me/918374340999?text=${encodeURIComponent(
                              `Hi NIFS, I am confused about choosing between courses. I want guidance regarding ${course.name}.`,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366]/15 border border-[#25D366]/35 px-3 py-1.5 text-xs font-bold text-[#075E54] hover:bg-[#25D366]/25 transition-colors dark:text-[#25D366]"
                          >
                            <svg
                              className="h-3.5 w-3.5 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                            </svg>
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
