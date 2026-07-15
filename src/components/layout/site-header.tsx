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

  // Close mega menu on route change
  useEffect(() => {
    setMegaOpen(null);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-9 z-50 transition-all duration-500",
        scrolled
          ? "mx-2 mt-2 sm:mx-4 sm:mt-3 lg:mx-auto lg:mt-3 lg:max-w-5xl"
          : "mx-0 mt-0"
      )}
    >
      <nav
        ref={navRef}
        className={cn(
          "flex items-center justify-between transition-all duration-500",
          scrolled
            ? "rounded-2xl border border-white/15 bg-black/60 px-4 py-2.5 shadow-2xl shadow-black/10 backdrop-blur-2xl sm:px-6 lg:px-6"
            : "border-b border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-10"
        )}
        onMouseLeave={closeMegaDelayed}
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center gap-2.5"
          data-path-logo="true"
        >
          <NifsCrest className="h-9 w-9" />
          <div className="flex flex-col leading-none">
            <span
              className={cn(
                "text-lg font-black tracking-tight transition-colors duration-300",
                scrolled ? "text-white" : "text-white"
              )}
            >
              NIFS
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/50">
              National Institute
            </span>
          </div>
        </Link>

        {/* Desktop Navigation — center */}
        <div className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && openMega(item.label)}
              onMouseLeave={item.children ? closeMegaDelayed : undefined}
            >
              <Link
                href={item.href}
                className={cn(
                  "relative flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200",
                  megaOpen === item.label
                    ? "bg-white/10 text-white"
                    : "text-white/75 hover:bg-white/5 hover:text-white"
                )}
                onClick={closeMega}
              >
                {item.label}
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

              {/* Mega Menu */}
              <AnimatePresence>
                {item.children && megaOpen === item.label && (
                  <motion.div
                    className="absolute left-1/2 top-full z-[70] w-[520px] -translate-x-1/2 pt-3"
                    initial={{ opacity: 0, y: 8, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 8, x: "-50%" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onMouseEnter={() => openMega(item.label)}
                    onMouseLeave={closeMegaDelayed}
                  >
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                      <div
                        className={cn(
                          "grid gap-1 p-3",
                          item.children.length > 6
                            ? "grid-cols-2"
                            : "grid-cols-1"
                        )}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group flex items-start gap-3 rounded-xl px-3.5 py-3 transition-colors hover:bg-white/8"
                            onClick={closeMega}
                          >
                            <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DC1711] opacity-60 transition-opacity group-hover:opacity-100" />
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-white transition-colors group-hover:text-[#DC1711]">
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
          ))}
        </div>

        {/* Right side — desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+919246624690"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91-9246-624-690
          </a>
          <Link
            href="/admissions"
            className="rounded-full bg-[#DC1711] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#B0120E] hover:shadow-lg hover:shadow-[#DC1711]/25"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-xl bg-[#DC1711] text-white shadow-lg transition-transform hover:scale-105 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="flex flex-col items-center justify-center gap-[5px]">
            <motion.span
              className="block h-[2px] w-5 bg-white"
              animate={
                menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.span
              className="block h-[2px] w-5 bg-white"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-[2px] w-5 bg-white"
              animate={
                menuOpen
                  ? { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </span>
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-[#0A0A0A]"
            initial={{ clipPath: "circle(0% at top right)" }}
            animate={{ clipPath: "circle(150% at top right)" }}
            exit={{ clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Mobile top bar */}
            <div className="flex items-center justify-between px-5 py-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <NifsCrest className="h-8 w-8" />
                <span className="text-lg font-bold text-white">NIFS</span>
              </Link>
              <button
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </button>
            </div>

            {/* Mobile nav links */}
            <motion.nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 pb-6 pt-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.2 },
                },
              }}
            >
              {primaryNav.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      },
                    },
                  }}
                >
                  <Link
                    href={item.href}
                    className="group block py-3 text-3xl font-bold text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-2 group-hover:text-[#DC1711]">
                      {item.label}
                    </span>
                  </Link>
                  {item.children && (
                    <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1 pl-1">
                      {item.children.slice(0, 6).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-sm text-white/40 transition-colors hover:text-[#DC1711]"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                className="mt-6 flex flex-col gap-3"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    },
                  },
                }}
              >
                <Link
                  href="/admissions"
                  className="block w-full rounded-full bg-[#DC1711] py-4 text-center text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.02]"
                  onClick={() => setMenuOpen(false)}
                >
                  Apply Now →
                </Link>
                <div className="flex items-center justify-center gap-4 text-sm text-white/40">
                  <a
                    href="tel:+919246624690"
                    className="transition-colors hover:text-white"
                  >
                    +91-9246-624-690
                  </a>
                  <span className="text-white/20">|</span>
                  <a
                    href="https://wa.me/919246624690"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#25D366]"
                  >
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
