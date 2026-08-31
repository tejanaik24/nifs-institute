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
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 px-4 pt-1.5 sm:px-6 lg:px-10"
    >
      {/* Logo (standalone, native a tag for clean home navigation) */}
      <a
        href="/"
        className="flex shrink-0 items-center gap-2.5 group"
        data-path-logo="true"
      >
        <img
          loading="eager"
          fetchPriority="high"
          decoding="async"
          src="/images/nifs-official-logo-v3.png"
          alt="NIFS India"
          className="h-28 w-28 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:w-32"
        />
        <span className="hidden sm:flex flex-col leading-[1.1]">
          <span className="text-nifs-red font-black text-2xl sm:text-3xl tracking-tight whitespace-nowrap drop-shadow-lg">
            National Institute
          </span>
          <span className="text-nifs-red font-black text-2xl sm:text-3xl tracking-tight whitespace-nowrap drop-shadow-lg">
            of Fire &amp; Safety
          </span>
        </span>
      </a>

      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-gray-950/85 backdrop-blur-2xl backdrop-saturate-150 pl-2.5 pr-2.5 py-2 shadow-2xl shadow-black/50 shadow-nifs-red/10 sm:pl-3 sm:pr-3"
        onMouseLeave={closeMegaDelayed}
      >
        {/* Desktop Navigation Items */}
        <div className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            if (item.href === "/") {
              return (
                <div key={item.label} className="relative">
                  <a
                    href="/"
                    className={cn(
                      "relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                      isActive
                        ? "text-white"
                        : "text-white/80 hover:bg-white/15 hover:text-white",
                    )}
                  >
                    {/* Active pill — CSS fade, replaces framer-motion layoutId spring */}
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
                    "relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "text-white"
                      : megaOpen === item.label
                        ? "text-white bg-white/15"
                        : "text-white/80 hover:bg-white/15 hover:text-white",
                  )}
                  onClick={closeMega}
                >
                  {/* Active pill background — CSS only */}
                  {isActive && (
                    <span className="absolute inset-0 z-[-1] rounded-full bg-primary shadow-lg shadow-primary/35" />
                  )}

                  <span>{item.label}</span>

                  {item.children && (
                    <svg
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        megaOpen === item.label && "rotate-180",
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

                {/* Mega Menu — always mounted, CSS opacity transition (no AnimatePresence) */}
                {item.children && (
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-[70] pt-3 transition-all duration-200",
                      item.children.length > 4 ? "w-[500px]" : "w-[280px]",
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
                    <div className="overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/95 shadow-2xl shadow-black/60 backdrop-blur-2xl p-2">
                      <div
                        className={cn(
                          "grid gap-1 p-2",
                          item.children.length > 4
                            ? "grid-cols-2"
                            : "grid-cols-1",
                        )}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            target={child.external ? "_blank" : undefined}
                            rel={
                              child.external ? "noopener noreferrer" : undefined
                            }
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
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: CTA + mobile trigger */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="https://wa.me/918374340999?text=Hi%20NIFS%2C%20I%20want%20to%20know%20about%20Fire%20%26%20Industrial%20Safety%20courses."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-md shadow-[#25D366]/25"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <Link
            href="/admissions"
            className="hidden lg:inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-nifs-red to-red-600 text-white text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-lg shadow-nifs-red/30"
          >
            Apply Now
          </Link>

          {/* Hamburger → X — pure CSS transform, no framer-motion */}
          <button
            id="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full bg-white/10 border border-white/10 lg:hidden"
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

      {/* Mobile Overlay — CSS clip-path circle animation, replaces framer-motion AnimatePresence */}
      {/* visibility is delayed via transition so it hides after clip-path closes */}
      <div
        role="dialog"
        aria-modal={menuOpen || undefined}
        aria-hidden={!menuOpen}
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

        {/* Mobile nav items — CSS opacity + translateX stagger via transition-delay */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-6">
          {primaryNav.map((item, i) => (
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
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 transition-colors hover:bg-primary/20 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
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
              className="flex items-center justify-center gap-2.5 w-full rounded-full bg-[#25D366] py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#25D366]/30"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
              </svg>
              <span>Chat on WhatsApp →</span>
            </a>
            <Link
              href="/admissions"
              className="block w-full rounded-full bg-primary py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30"
              onClick={() => setMenuOpen(false)}
            >
              Apply Now →
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
