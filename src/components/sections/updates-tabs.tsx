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
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

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

function TabContent({ active }: { active: TabId }) {
  return (
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
              <a key={job.link} href={job.link} target="_blank" rel="noopener noreferrer">
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
  );
}

function TabNav({ active, onSelect, layoutId }: { active: TabId; onSelect: (id: TabId) => void; layoutId: string }) {
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
            className={`relative isolate flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
              isActive
                ? "text-white"
                : "bg-muted text-foreground/80 hover:bg-muted/70"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
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
  );
}

export function UpdatesTabs() {
  const [active, setActive] = useState<TabId>("updates");

  return (
    <section className="relative overflow-hidden py-16 lg:py-0">
      <SpineGutterBg color="var(--background)" />

      {/* ── DESKTOP: spine split — nav in left gutter, content in right gutter ── */}
      <div className="hidden lg:block">
        <SpineSplit
          align="start"
          left={
            <div className="px-6 lg:pr-10 lg:pl-0">
              <TabNav active={active} onSelect={setActive} layoutId="updates-tab-active-left" />
            </div>
          }
          center={
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase [writing-mode:vertical-rl]">
                Stay Updated
              </span>
            </div>
          }
          right={
            <div className="px-6 lg:pr-0 lg:pl-10">
              <TabContent active={active} />
            </div>
          }
        />
      </div>

      {/* ── MOBILE: stacked single column ── */}
      <div className="relative z-[3] mx-auto max-w-5xl px-6 py-16 lg:hidden">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
          <TabNav active={active} onSelect={setActive} layoutId="updates-tab-active-mobile" />
          <TabContent active={active} />
        </div>
      </div>
    </section>
  );
}
