"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mobileNav } from "@/lib/data/nav";
import { NifsCrest } from "@/components/nifs-crest";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const hasTransparentHero = pathname === "/";

  const [scrolled, setScrolled] = useState(!hasTransparentHero);
  const [menuOpen, setMenuOpen] = useState(false);

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
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-9 z-50 transition-colors duration-300",
        scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2" data-path-logo="true">
          <NifsCrest className="h-9 w-9" />
          <span
            className={cn(
              "font-sans text-lg font-bold tracking-wide transition-colors",
              scrolled ? "text-foreground" : "text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]"
            )}
          >
            NIFS
          </span>
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-8 text-sm font-medium md:flex",
            scrolled ? "text-foreground" : "text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]"
          )}
        >
          <Link href="/admissions" className="hover:opacity-70">
            Admissions
          </Link>
          <Link href="/contact" className="hover:opacity-70">
            Contact us
          </Link>
        </nav>

        {/* Mobile burger button */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="flex flex-col items-center justify-center gap-[5px]">
            <motion.span
              className="block h-[2px] w-5 bg-current"
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.span
              className="block h-[2px] w-5 bg-current"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-[2px] w-5 bg-current"
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </span>
        </button>
      </div>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-white"
            initial={{ clipPath: "circle(0% at top right)" }}
            animate={{ clipPath: "circle(150% at top right)" }}
            exit={{ clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Top bar */}
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                <NifsCrest className="h-9 w-9" />
                <span className="font-sans text-lg font-bold text-foreground">NIFS</span>
              </Link>
              <button
                aria-label="Close menu"
                className="flex h-12 w-12 items-center justify-center rounded-full text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <motion.nav
              className="flex flex-1 flex-col items-start justify-center gap-2 overflow-y-auto px-6 pb-10 lg:px-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              }}
            >
              {mobileNav.map((item) => (
                <motion.div
                  key={item.href}
                  className="w-full"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                  }}
                >
                  <Link
                    href={item.href}
                    className="group block py-2 text-4xl font-bold text-foreground transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-2.5 group-hover:text-[#DC2626]">
                      {item.label}
                    </span>
                  </Link>
                  {item.children && (
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 pl-1">
                      {item.children.slice(0, 6).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-[#DC2626]"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Bottom section */}
              <motion.div
                className="mt-8 flex w-full flex-col gap-4"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                }}
              >
                <Link
                  href="/admissions"
                  className="block w-full bg-[#CC0000] py-3.5 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  onClick={() => setMenuOpen(false)}
                >
                  Apply Now →
                </Link>
                <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                  <a href="tel:+919246624690" className="transition-colors hover:text-[#DC2626]">
                    +91-9246-624-690
                  </a>
                  <a
                    href="https://wa.me/919246624690"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#DC2626]"
                  >
                    Chat on WhatsApp
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
