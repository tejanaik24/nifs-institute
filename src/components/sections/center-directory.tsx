"use client";

import { IndiaMap } from "@/components/sections/india-map";
import type { Center } from "@/lib/data/centers";
import { hasVerifiedAddress, phoneHref } from "@/lib/data/centers";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, ExternalLink, MapPin, Phone, Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";

export function CenterDirectory({ centers }: { centers: Center[] }) {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);

  const states = useMemo(
    () => Array.from(new Set(centers.map((c) => c.state))).sort(),
    [centers],
  );

  // Group and filter centers
  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = centers.filter((c) => {
      const matchesQuery =
        !q ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        (c.address ?? "").toLowerCase().includes(q);
      const matchesState = !stateFilter || c.state === stateFilter;
      return matchesQuery && matchesState;
    });
    return states.reduce<Record<string, Center[]>>((acc, state) => {
      const list = filtered.filter((c) => c.state === state);
      if (list.length) acc[state] = list;
      return acc;
    }, {});
  }, [centers, query, stateFilter, states]);

  const total = Object.values(grouped).flat().length;
  const selectedCenter = useMemo(() => {
    return centers.find((c) => c.city === selectedCity) ?? null;
  }, [centers, selectedCity]);

  // Handle center selection and scroll on mobile
  function handleSelectCenter(city: string) {
    setSelectedCity(city);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        detailCardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }

  // Clear query resets filters
  const handleClearFilter = () => {
    setQuery("");
    setStateFilter(null);
    setSelectedCity(null);
  };

  return (
    <div className="mt-12">
      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="mb-10 flex flex-col gap-6 rounded-2xl border border-border/80 bg-muted/20 p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, state, or address..."
              aria-label="Search centers by city, state, or address"
              className="h-12 w-full rounded-xl border border-border bg-white pr-4 pl-12 text-sm outline-none transition-all placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Compass className="h-4 w-4 animate-spin-slow text-primary" />
            <span>
              Showing {total} of {centers.length} Centers
            </span>
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Filter by Region / State
          </span>
          <div
            className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin"
            role="group"
            aria-label="Filter by state"
          >
            <button
              type="button"
              onClick={() => {
                setStateFilter(null);
                setSelectedCity(null);
              }}
              aria-pressed={stateFilter === null}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                stateFilter === null
                  ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "border-border bg-white text-foreground/80 hover:border-primary/30"
              }`}
            >
              All States ({centers.length})
            </button>
            {states.map((state) => {
              const count = centers.filter((c) => c.state === state).length;
              return (
                <button
                  key={state}
                  type="button"
                  onClick={() => {
                    setStateFilter(stateFilter === state ? null : state);
                    setSelectedCity(null);
                  }}
                  aria-pressed={stateFilter === state}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                    stateFilter === state
                      ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "border-border bg-white text-foreground/80 hover:border-primary/30"
                  }`}
                >
                  {state} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 2-COLUMN GEOGRAPHIC CONSOLE ── */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        {/* LEFT COLUMN: Sticky Map & Center Detail */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-28">
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-md">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Center Locator
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-200/50">
                {centers.length} Locations
              </span>
            </div>

            {/* Render Map */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-100">
              <IndiaMap
                selectedCity={selectedCity}
                onSelect={handleSelectCenter}
              />
            </div>

            {/* Selected Center Detail Panel */}
            <div
              ref={detailCardRef}
              className="mt-6 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-5"
            >
              <AnimatePresence mode="wait">
                {selectedCenter ? (
                  <motion.div
                    key={selectedCenter.city}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-display text-2xl italic text-primary">
                          {selectedCenter.city}
                        </h4>
                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                          {selectedCenter.state}
                        </p>
                      </div>
                      {selectedCenter.isHQ ? (
                        <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-bold text-primary uppercase tracking-widest">
                          National HQ
                        </span>
                      ) : selectedCenter.isInformationCentre ? (
                        <span className="rounded-full bg-zinc-100 border border-zinc-200 px-2.5 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          Info Center
                        </span>
                      ) : (
                        <span className="rounded-full bg-zinc-100 border border-zinc-200 px-2.5 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                          Active Branch
                        </span>
                      )}
                    </div>

                    <div className="h-px bg-zinc-100" />

                    <div className="space-y-2 text-sm">
                      <span className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                        Address
                      </span>
                      {hasVerifiedAddress(selectedCenter) ? (
                        <p className="text-zinc-600 leading-relaxed text-xs">
                          {selectedCenter.address}
                        </p>
                      ) : (
                        <p className="text-zinc-400 leading-relaxed text-xs italic">
                          Official address registration pending. Contact HQ for
                          complete details.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                        href={`/centers/${selectedCenter.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-nifs-red hover:bg-red-700 px-3.5 py-1.5 text-xs font-bold text-white transition-colors shadow-sm"
                      >
                        <span>Explore {selectedCenter.city} Page →</span>
                      </a>

                      {hasVerifiedAddress(selectedCenter) && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            selectedCenter.address ?? selectedCenter.city,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-white border border-zinc-200 hover:border-primary/30 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Get Directions</span>
                        </a>
                      )}

                      {(selectedCenter.phones ?? []).map((phone) => (
                        <a
                          key={phone}
                          href={phoneHref(phone)}
                          className="inline-flex items-center gap-1 rounded-full bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Call: {phone}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-selection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-6 text-center"
                  >
                    <MapPin className="h-7 w-7 text-zinc-300 mb-2" />
                    <span className="text-xs font-semibold text-zinc-500">
                      No center selected
                    </span>
                    <p className="mt-2 max-w-[240px] text-xs text-zinc-400 leading-normal">
                      Click any center card or a pin on the map to view its full
                      details.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Directory List */}
        <div className="order-2 lg:order-1">
          {total === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No training centers match &ldquo;{query}&rdquo;.
              </p>
              <button
                type="button"
                onClick={handleClearFilter}
                className="mt-4 text-xs font-semibold text-primary underline underline-offset-4"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(grouped).map(([state, list]) => (
                <div key={state} className="space-y-4">
                  {/* State Divider */}
                  <div className="flex items-baseline justify-between border-b border-border/80 pb-2">
                    <h3 className="font-display text-2xl italic text-[#7A0F0C]">
                      {state}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      {list.length} {list.length > 1 ? "Locations" : "Location"}
                    </span>
                  </div>

                  {/* Centers Cards */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {list.map((c) => {
                      const isSelected = c.city === selectedCity;
                      return (
                        <div
                          key={c.city}
                          onClick={() => handleSelectCenter(c.city)}
                          className={`group relative flex flex-col justify-between cursor-pointer rounded-2xl border p-5 transition-all duration-300 hover:shadow-md ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                              : "border-border bg-white hover:border-primary/30"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between">
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                                <span>{c.city}</span>
                                {c.isHQ && (
                                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary uppercase tracking-widest">
                                    HQ
                                  </span>
                                )}
                              </h4>
                              <MapPin
                                className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                                  isSelected
                                    ? "text-primary animate-pulse"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </div>

                            {c.isInformationCentre && (
                              <span className="mt-1 inline-block text-[10px] font-mono font-semibold tracking-wider text-muted-foreground uppercase">
                                Information Centre
                              </span>
                            )}

                            {hasVerifiedAddress(c) ? (
                              <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                {c.address}
                              </p>
                            ) : (
                              <p className="mt-3 text-xs leading-relaxed text-muted-foreground italic">
                                Click card to reveal official registration
                                details.
                              </p>
                            )}
                          </div>

                          <div className="mt-6 pt-3 border-t border-border/50 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              View Details →
                            </span>
                            <div className="flex gap-1.5">
                              {(c.phones ?? []).slice(0, 1).map((phone) => (
                                <span
                                  key={phone}
                                  className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-foreground/75"
                                >
                                  <Phone className="h-2.5 w-2.5" />
                                  <span>{phone}</span>
                                </span>
                              ))}
                              {(c.phones ?? []).length > 1 && (
                                <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                                  +{(c.phones ?? []).length - 1} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
