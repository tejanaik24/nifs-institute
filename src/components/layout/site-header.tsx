"use client";

import { NifsCrest } from "@/components/nifs-crest";
import { primaryNav } from "@/lib/data/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// Framer Motion removed — replaced with CSS transitions/clip-path animation.
// ~50KB removed from the initial JS bundle (layout-level, every page).

export function SiteHeader() {
  const pathname = usePathname();
  // Hide the Home link on the homepage itself
  const navItems = primaryNav.filter(
    (item) => !(item.href === "/" && pathname === "/"),
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(null);
    document.body.style.overflow = "";
  }, [pathname]);

  const openMega = useCallback((label: string) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(label);
  }, []);

  const closeMegaDelayed = useCallback(() => {
    megaTimer.current = setTimeout(() => setMegaOpen(null), 150);
  }, []);

  const closeMega = useCallback(() => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(null);
  }, []);

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-2 px-3 pt-2 sm:px-6 lg:px-8 xl:px-10 max-w-[100vw]"
    >
      {/* Logo (Refined responsive proportions fitting all laptop screens) */}
      <a
        href="/"
        className="flex shrink-0 items-center gap-2 2xl:gap-2.5 group"
        data-path-logo="true"
      >
        <img
          loading="eager"
          fetchPriority="high"
          decoding="async"
          src="/images/nifs-official-logo-v3.png"
          alt="NIFS India"
          className="h-20 w-20 sm:h-24 sm:w-24 2xl:h-28 2xl:w-28 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
        />
        <span className="hidden sm:flex flex-col leading-[1.1]">
          <span className="text-nifs-red font-black text-lg sm:text-xl 2xl:text-2xl tracking-tight whitespace-nowrap drop-shadow-sm">
            National Institute
          </span>
          <span className="text-nifs-red font-black text-lg sm:text-xl 2xl:text-2xl tracking-tight whitespace-nowrap drop-shadow-sm">
            of Fire &amp; Safety
          </span>
        </span>
      </a>

      {/* Navigation Bar Pill */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="flex shrink-0 items-center gap-1 2xl:gap-1.5 rounded-full border border-white/15 bg-gray-950/90 backdrop-blur-2xl backdrop-saturate-150 px-2 py-1.5 2xl:px-3 2xl:py-2 shadow-2xl shadow-black/60 shadow-nifs-red/10 mr-2 sm:mr-4 lg:mr-6"
        onMouseLeave={closeMegaDelayed}
      >
        {/* Desktop Navigation Items */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            if (item.href === "/") {
              return (
                <div key={item.label} className="relative">
                  <a
                    href="/"
                    className={cn(
                      "relative z-10 flex items-center gap-1 rounded-full px-2.5 py-1.5 2xl:px-3.5 2xl:py-2 text-[13px] 2xl:text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "text-white"
                        : "text-white/80 hover:bg-white/15 hover:text-white",
                    )}
                  >
                    {isActive && (
                      <span className="absolute inset-0 z-[-1] rounded-full bg-primary shadow-lg shadow-primary/35" />
                    )}
                    <span>{item.label}</span>
                  </a>
                </div>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && openMega(item.label)}
                onMouseLeave={item.children ? closeMegaDelayed : undefined}
              >
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "relative z-10 flex items-center gap-1 rounded-full px-2.5 py-1.5 2xl:px-3.5 2xl:py-2 text-[13px] 2xl:text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "text-white"
                      : megaOpen === item.label
                        ? item.label === "Centers"
                          ? "text-emerald-300 bg-emerald-950/50"
                          : "text-white bg-white/15"
                        : item.label === "Centers"
                          ? "text-white/80 hover:bg-emerald-950/40 hover:text-emerald-300"
                          : "text-white/80 hover:bg-white/15 hover:text-white",
                  )}
                  onClick={(e) => {
                    if (item.children) {
                      if (megaOpen === item.label) {
                        closeMega();
                      } else {
                        e.preventDefault();
                        openMega(item.label);
                      }
                    } else {
                      closeMega();
                    }
                  }}
                >
                  {isActive && (
                    <span
                      className={cn(
                        "absolute inset-0 z-[-1] rounded-full shadow-lg",
                        item.label === "Centers"
                          ? "bg-emerald-600 shadow-emerald-600/35"
                          : "bg-primary shadow-primary/35",
                      )}
                    />
                  )}

                  <span>{item.label}</span>

                  {item.children && (
                    <svg
                      className={cn(
                        "h-3 w-3 transition-transform duration-200 opacity-75",
                        megaOpen === item.label && "rotate-180",
                        item.label === "Centers" &&
                          "text-emerald-400 opacity-100",
                      )}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </Link>

                {/* Mega Menu */}
                {item.children && (
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-[70] pt-3 transition-all duration-200",
                      item.label === "Centers"
                        ? "w-[340px] sm:w-[370px]"
                        : item.children.length > 4
                          ? "w-[540px] 2xl:w-[570px]"
                          : "w-[280px]",
                      megaOpen === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none",
                    )}
                    style={{
                      transform: `translateX(-50%) translateY(${megaOpen === item.label ? "0" : "8px"})`,
                    }}
                    onMouseEnter={() => openMega(item.label)}
                    onMouseLeave={closeMegaDelayed}
                  >
                    <div
                      className={cn(
                        "overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-2xl p-2.5",
                        item.label === "Centers"
                          ? "border-emerald-500/50 bg-gradient-to-b from-zinc-950 via-emerald-950/25 to-zinc-950 shadow-emerald-950/60 ring-1 ring-emerald-500/30"
                          : "border-white/15 bg-zinc-950/95 shadow-black/60",
                      )}
                    >
                      {item.label === "Centers" && (
                        <div className="px-3 py-1.5 mb-1 flex items-center justify-between border-b border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                          <span>NIFS Training Network</span>
                          <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400 animate-pulse" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "grid gap-1.5 p-1.5",
                          item.children.length > 4
                            ? "grid-cols-2"
                            : "grid-cols-1",
                        )}
                      >
                        {item.children.map((child) => {
                          const isGreen = child.highlight === "green";
                          const isBlue = child.highlight === "blue";
                          const isAmber = child.highlight === "amber";

                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              target={child.external ? "_blank" : undefined}
                              rel={
                                child.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className={cn(
                                "group relative flex items-start gap-2.5 rounded-2xl p-3 transition-all duration-200",
                                isGreen &&
                                  "border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/60 hover:border-emerald-400 shadow-sm shadow-emerald-950/50",
                                isBlue &&
                                  "border border-sky-500/40 bg-sky-950/40 hover:bg-sky-900/60 hover:border-sky-400 shadow-sm shadow-sky-950/50",
                                isAmber &&
                                  "border border-amber-500/40 bg-amber-950/35 hover:bg-amber-900/55 hover:border-amber-400 shadow-sm shadow-amber-950/50",
                                !child.highlight && "hover:bg-white/10",
                              )}
                              onClick={closeMega}
                            >
                              {/* Indicator dot */}
                              <div
                                className={cn(
                                  "mt-1.5 shrink-0 rounded-full transition-all",
                                  isGreen &&
                                    "h-2 w-2 bg-emerald-400 shadow-xs shadow-emerald-400 ring-2 ring-emerald-500/30",
                                  isBlue &&
                                    "h-2 w-2 bg-sky-400 shadow-xs shadow-sky-400 ring-2 ring-sky-500/30",
                                  isAmber &&
                                    "h-2 w-2 bg-amber-400 shadow-xs shadow-amber-400 ring-2 ring-amber-500/30",
                                  !child.highlight &&
                                    "h-1.5 w-1.5 bg-primary opacity-60 group-hover:scale-150 group-hover:opacity-100",
                                )}
                              />

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span
                                    className={cn(
                                      "text-sm font-medium transition-colors",
                                      isGreen &&
                                        "text-emerald-100 font-semibold group-hover:text-emerald-200",
                                      isBlue &&
                                        "text-sky-100 font-semibold group-hover:text-sky-200",
                                      isAmber &&
                                        "text-amber-100 font-semibold group-hover:text-amber-200",
                                      !child.highlight &&
                                        "text-white group-hover:text-primary",
                                    )}
                                  >
                                    {child.label}
                                  </span>

                                  {child.badge && (
                                    <span
                                      className={cn(
                                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                        isGreen &&
                                          "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
                                        isBlue &&
                                          "bg-sky-500/20 text-sky-300 border border-sky-500/40",
                                        isAmber &&
                                          "bg-amber-500/20 text-amber-300 border border-amber-500/40",
                                      )}
                                    >
                                      {child.badge}
                                    </span>
                                  )}
                                </div>

                                {child.description && (
                                  <div
                                    className={cn(
                                      "mt-0.5 text-xs leading-relaxed",
                                      isGreen && "text-emerald-300/80",
                                      isBlue && "text-sky-300/80",
                                      isAmber && "text-amber-300/80",
                                      !child.highlight && "text-white/60",
                                    )}
                                  >
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: CTA + mobile trigger */}
        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href="/placements#current-openings"
            className="hidden lg:inline-flex px-3.5 py-1.5 2xl:px-5 2xl:py-2 rounded-full bg-nifs-red text-white text-xs 2xl:text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all duration-200 shadow-lg shadow-nifs-red/30"
          >
            Apply for Job
          </Link>

          <Link
            href="/admissions"
            className="hidden lg:inline-flex px-3.5 py-1.5 2xl:px-5 2xl:py-2 rounded-full bg-gradient-to-r from-nifs-red to-red-600 text-white text-xs 2xl:text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all duration-200 shadow-lg shadow-nifs-red/30"
          >
            Join a Course
          </Link>

          {/* Hamburger → X */}
          <button
            id="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-8 w-8 sm:h-9 sm:w-9 flex-col items-center justify-center gap-1.5 rounded-full bg-white/10 border border-white/10 lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span
              className="block w-4 h-0.5 bg-white rounded-full transition-transform duration-300 origin-center"
              style={{
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-4 h-0.5 bg-white rounded-full transition-opacity duration-150"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-4 h-0.5 bg-white rounded-full transition-transform duration-300 origin-center"
              style={{
                transform: menuOpen
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        role="dialog"
        aria-modal={menuOpen || undefined}
        inert={!menuOpen}
        aria-label="Navigation menu"
        style={{
          clipPath: menuOpen
            ? "circle(150% at top right)"
            : "circle(0% at top right)",
          visibility: menuOpen ? "visible" : "hidden",
          transitionProperty: menuOpen ? "clip-path" : "clip-path, visibility",
          transitionDuration: menuOpen ? "0.5s" : "0.5s, 0s",
          transitionDelay: menuOpen ? "0s" : "0s, 0.5s",
          transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1), step-end",
        }}
        className="fixed inset-0 z-[100] flex flex-col bg-zinc-950"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <a
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setMenuOpen(false)}
          >
            <NifsCrest className="h-8 w-8 text-primary" />
            <span className="text-xl font-black text-white">NIFS</span>
          </a>
          <button
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-6">
          {navItems.map((item, i) => (
            <div
              key={item.label}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: menuOpen
                  ? `opacity 0.3s ease ${0.1 + i * 0.05}s, transform 0.3s ease ${0.1 + i * 0.05}s`
                  : "none",
              }}
            >
              {item.href === "/" ? (
                <a
                  href="/"
                  className="group block py-2.5 text-2xl font-bold text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-2 group-hover:text-primary">
                    {item.label}
                  </span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group block py-2.5 text-2xl font-bold text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-2 group-hover:text-primary">
                    {item.label}
                  </span>
                </Link>
              )}
              {item.children && (
                <div className="mt-1 flex flex-wrap gap-2 pl-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      target={child.external ? "_blank" : undefined}
                      rel={child.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs transition-colors",
                        child.highlight === "green"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                          : child.highlight === "blue"
                            ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
                            : child.highlight === "amber"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold"
                              : "bg-white/5 text-white/60 hover:bg-primary/20 hover:text-white",
                      )}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{child.label}</span>
                      {child.badge && (
                        <span className="ml-1 opacity-80 text-[10px] uppercase font-bold">
                          ({child.badge})
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://wa.me/918374340999?text=Hi%20NIFS%2C%20I%20want%20to%20know%20about%20Fire%20%26%20Industrial%20Safety%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full rounded-full bg-[#075E54] py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#075E54]/30"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
              </svg>
              <span>Chat on WhatsApp →</span>
            </a>
            <Link
              href="/placements#current-openings"
              className="block w-full rounded-full border border-nifs-red/40 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-nifs-red"
              onClick={() => setMenuOpen(false)}
            >
              Apply for Job →
            </Link>
            <Link
              href="/admissions"
              className="block w-full rounded-full bg-primary py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30"
              onClick={() => setMenuOpen(false)}
            >
              Join a Course →
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
