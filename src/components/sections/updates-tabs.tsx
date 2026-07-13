"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  FileText,
  CalendarDays,
  BookOpen,
  ShieldUser,
  Factory,
  ArrowUpRight,
} from "lucide-react";
import { updatesTabs, type UpdateLink } from "@/lib/data/updates-tabs";
import { jobOpenings } from "@/lib/data/job-openings";

const tabs = [
  { id: "updates", label: "NIFS Updates", icon: Newspaper },
  { id: "articles", label: "Articles", icon: FileText },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "journals", label: "Journals", icon: BookOpen },
  { id: "jobs", label: "Jobs", icon: ShieldUser },
  { id: "industrial-works", label: "Industrial Works", icon: Factory },
] as const;

type TabId = (typeof tabs)[number]["id"];

function LinkRow({ item }: { item: UpdateLink }) {
  const content = (
    <span className="flex items-center justify-between gap-3 rounded-sm bg-[#FBECEA] px-4 py-3 text-sm text-foreground transition-colors hover:bg-primary/10">
      <span>{item.title}</span>
      {item.href && (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" />
      )}
    </span>
  );

  if (!item.href) {
    return <div>{content}</div>;
  }
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <Link href={item.href}>{content}</Link>;
}

export function UpdatesTabs() {
  const [active, setActive] = useState<TabId>("updates");

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
          <div className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`relative isolate flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white"
                      : "bg-muted text-foreground/80 hover:bg-muted/70"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="updates-tab-active"
                      className="absolute inset-0 -z-10 bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <Icon className="h-4 w-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="min-h-[220px] bg-[#FFFCF2] p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3"
              >
                {active === "updates" &&
                  updatesTabs.updates.map((text, i) => (
                    <div
                      key={i}
                      className="rounded-sm bg-[#FBECEA] px-4 py-3 text-sm text-foreground"
                    >
                      {text}
                    </div>
                  ))}

                {active === "articles" &&
                  updatesTabs.articles.map((item) => (
                    <LinkRow key={item.title} item={item} />
                  ))}

                {active === "events" &&
                  updatesTabs.events.map((item) => (
                    <LinkRow key={item.title} item={item} />
                  ))}

                {active === "journals" &&
                  updatesTabs.journals.map((item) => (
                    <LinkRow key={item.title} item={item} />
                  ))}

                {active === "jobs" &&
                  jobOpenings.map((job) => (
                    <a
                      key={job.link}
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex flex-col gap-1 rounded-sm bg-[#FBECEA] px-4 py-3 text-sm text-foreground transition-colors hover:bg-primary/10 sm:flex-row sm:items-center sm:justify-between">
                        <span>{job.title}</span>
                        <span className="shrink-0 text-xs font-medium text-primary">
                          {job.salary}
                        </span>
                      </span>
                    </a>
                  ))}

                {active === "industrial-works" &&
                  updatesTabs.industrialWorks.map((item) => (
                    <LinkRow key={item.title} item={item} />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
