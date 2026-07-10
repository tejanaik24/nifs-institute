"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NifsCrest } from "@/components/nifs-crest";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Centers", href: "/centers" },
    { label: "Placements", href: "/placements" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 px-6 py-4 lg:px-10",
        scrolled
          ? "bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo left */}
        <Link href="/" className="flex items-center gap-2 group">
          <NifsCrest className="h-9 w-9 text-[#FF4500]" />
          <span className="font-sans text-xl font-bold tracking-wider text-white group-hover:text-[#FF4500] transition-colors">
            NIFS
          </span>
        </Link>

        {/* Nav links center */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-[#FF4500] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#FF4500] after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Apply Now CTA right */}
        <div className="hidden md:block">
          <Link
            href="/admissions"
            className="bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-medium text-sm px-6 py-2.5 rounded-sm transition-all hover:shadow-[0_0_15px_rgba(255,69,0,0.4)]"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile menu hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-[#FF4500] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0A0A0A] border-b border-white/10 px-6 py-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in fade-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-white/90 hover:text-[#FF4500] transition-colors py-2 border-b border-white/5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admissions"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#FF4500] text-center hover:bg-[#FF4500]/90 text-white font-medium text-sm py-3 rounded-sm transition-all mt-2"
          >
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
}
