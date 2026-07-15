"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, FileText, CalendarDays, BookOpen, ShieldUser, Factory, ArrowUpRight } from "lucide-react";
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
    <span className="flex items-center justify-between gap-3 rounded-md bg-muted px-4 py-3 text-sm text-foreground transition-colors hover:bg-primary/10">
      <span>{item.title}</span>
      {item.href && <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" />}
    </span>
  );
  if (!item.href) return <div>{content}</div>;
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <Link href={item.href}>{content}</Link>;
}

function TabContent({ active }: { active: TabId }) {
  return (
    <div className="min-h-[220px] rounded-xl bg-white p-6">
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
              <div key={i} className="rounded-md bg-muted px-4 py-3 text-sm text-foreground">
                {text}
              </div>
            ))}
          {active === "articles" && updatesTabs.articles.map((item) => <LinkRow key={item.title} item={item} />)}
          {active === "events" && updatesTabs.events.map((item) => <LinkRow key={item.title} item={item} />)}
          {active === "journals" && updatesTabs.journals.map((item) => <LinkRow key={item.title} item={item} />)}
          {active === "jobs" &&
            jobOpenings.map((job) => (
              <a key={job.link} href={job.link} target="_blank" rel="noopener noreferrer">
                <span className="flex flex-col gap-1 rounded-md bg-muted px-4 py-3 text-sm text-foreground transition-colors hover:bg-primary/10 sm:flex-row sm:items-center sm:justify-between">
                  <span>{job.title}</span>
                  <span className="shrink-0 text-xs font-medium text-primary">{job.salary}</span>
                </span>
              </a>
            ))}
          {active === "industrial-works" &&
            updatesTabs.industrialWorks.map((item) => <LinkRow key={item.title} item={item} />)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TabNav({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className={`relative isolate flex items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition-colors ${
              isActive ? "text-white" : "bg-white text-foreground/80 hover:bg-muted"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="updates-tab-active"
                className="absolute inset-0 -z-10 rounded-md bg-primary"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <Icon className="h-4 w-4 shrink-0" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function UpdatesSection() {
  const [active, setActive] = useState<TabId>("updates");

  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <span className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">Stay Updated</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
          Updates, Articles &amp; Openings
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
          <TabNav active={active} onSelect={setActive} />
          <TabContent active={active} />
        </div>
      </div>
    </section>
  );
}
