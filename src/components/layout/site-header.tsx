"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { mobileNav } from "@/lib/data/nav";
import { NifsCrest } from "@/components/nifs-crest";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  // Only the homepage has a full-bleed dark hero behind the header — every
  // other page has a light PageHero, so the transparent/white-text mode
  // would render invisible nav links there.
  const hasTransparentHero = pathname === "/";

  const [scrolled, setScrolled] = useState(!hasTransparentHero);
  const [open, setOpen] = useState(false);

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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false} className="w-full sm:max-w-md bg-background">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="flex h-full flex-col px-6 py-8">
              <div className="mb-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <NifsCrest className="h-8 w-8" />
                  <span className="font-sans text-lg font-bold">NIFS</span>
                </Link>
                <button aria-label="Close menu" onClick={() => setOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
                {mobileNav.map((item) => (
                  <div key={item.href} className="border-b border-border py-3">
                    <Link
                      href={item.href}
                      className="font-display text-2xl italic text-foreground hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="mt-2 flex flex-col gap-1 pl-2">
                        {item.children.slice(0, 6).map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="py-1 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href="/admissions"
                  className="block w-full bg-[#CC0000] py-3.5 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  onClick={() => setOpen(false)}
                >
                  Apply Now →
                </Link>
                <span className="text-center text-sm text-muted-foreground">
                  +91-9246-624-690
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
