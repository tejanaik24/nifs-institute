"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav } from "@/lib/data/nav";
import { NifsCrest } from "@/components/nifs-crest";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const hasTransparentHero = pathname === "/";

  const [scrolled, setScrolled] = useState(!hasTransparentHero);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!hasTransparentHero) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onAppScroll = (e: Event) => {
      const detail = (e as CustomEvent<{ scrollY: number }>).detail;
      setScrolled(detail.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("app-scroll", onAppScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("app-scroll", onAppScroll);
    };
  }, [hasTransparentHero]);

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
      className={cn(
        "fixed inset-x-0 top-9 z-50 transition-all duration-500",
        scrolled
          ? "mx-3 mt-2 sm:mx-6 sm:mt-3 lg:mx-auto lg:mt-3 lg:max-w-6xl"
          : "mx-3 mt-2 sm:mx-6 sm:mt-3 lg:mx-auto lg:max-w-6xl"
      )}
    >
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={cn(
          "flex items-center justify-between rounded-full border border-white/15 bg-zinc-950/85 px-4 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-all duration-500 sm:px-6 lg:px-7"
        )}
        onMouseLeave={closeMegaDelayed}
      >
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center gap-2.5 group"
          data-path-logo="true"
        >
          <img
            src="/images/nifs-official-logo-v3.png"
            alt="NIFS India"
            className="h-10 w-10 object-contain drop-shadow transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tight text-white transition-colors group-hover:text-primary">
              NIFS
            </span>
            <span className="text-[7.5px] font-bold uppercase tracking-[0.18em] text-white/50">
              National Institute
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Pill Capsule */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {primaryNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

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
                    "relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : megaOpen === item.label
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white"
                  )}
                  onClick={closeMega}
                >
                  {/* Dynamic Active Pill Background (Reference Design Bubble) */}
                  {isActive && (
                    <motion.div
                      layoutId="pill-active-bg"
                      className="absolute inset-0 z-[-1] rounded-full bg-primary shadow-lg shadow-primary/35"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Active Indicator Top Dot (Bubble aesthetic) */}
                  {isActive && (
                    <motion.span
                      layoutId="pill-active-dot"
                      className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white shadow-sm shadow-white/80"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span>{item.label}</span>

                  {item.children && (
                    <svg
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        megaOpen === item.label && "rotate-180"
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

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {item.children && megaOpen === item.label && (
                    <motion.div
                      className="absolute left-1/2 top-full z-[70] w-[500px] -translate-x-1/2 pt-3"
                      initial={{ opacity: 0, y: 8, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 8, x: "-50%" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onMouseEnter={() => openMega(item.label)}
                      onMouseLeave={closeMegaDelayed}
                    >
                      <div className="overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/90 shadow-2xl shadow-black/60 backdrop-blur-2xl p-2">
                        <div
                          className={cn(
                            "grid gap-1 p-2",
                            item.children.length > 4
                              ? "grid-cols-2"
                              : "grid-cols-1"
                          )}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              target={child.external ? "_blank" : undefined}
                              rel={child.external ? "noopener noreferrer" : undefined}
                              className="group flex items-start gap-3 rounded-2xl px-3.5 py-3 transition-all hover:bg-white/10"
                              onClick={closeMega}
                            >
                              <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary opacity-60 transition-all group-hover:scale-150 group-hover:opacity-100" />
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-white transition-colors group-hover:text-primary">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div className="mt-0.5 text-xs text-white/40 leading-relaxed">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right side CTA & Contact */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+918374340999"
            className="flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5 text-primary"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+91-8374-340-999</span>
          </a>
          <Link
            href="/admissions"
            className="rounded-full bg-gradient-to-r from-primary to-red-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-primary/50"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-[60] flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="flex flex-col items-center justify-center gap-[4px]">
            <motion.span
              className="block h-[2px] w-4 bg-white"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.span
              className="block h-[2px] w-4 bg-white"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-[2px] w-4 bg-white"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </span>
        </button>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-zinc-950"
            initial={{ clipPath: "circle(0% at top right)" }}
            animate={{ clipPath: "circle(150% at top right)" }}
            exit={{ clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Link
                href="/"
                className="flex items-center gap-2.5"
                onClick={() => setMenuOpen(false)}
              >
                <NifsCrest className="h-8 w-8 text-primary" />
                <span className="text-xl font-black text-white">NIFS</span>
              </Link>
              <button
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <motion.nav
              className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
              }}
            >
              {primaryNav.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
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
                  {item.children && (
                    <div className="mt-1 flex flex-wrap gap-2 pl-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noopener noreferrer" : undefined}
                          className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 transition-colors hover:bg-primary/20 hover:text-white"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/admissions"
                  className="block w-full rounded-full bg-primary py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30"
                  onClick={() => setMenuOpen(false)}
                >
                  Apply Now →
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
