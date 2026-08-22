"use client";

import { useState } from "react";
import Link from "next/link";
import { NifsCrest } from "@/components/nifs-crest";
import { primaryNav } from "@/lib/data/nav";
import { accreditations } from "@/lib/data/centers";

/**
 * Accordion wrapper — mobile only.
 * On desktop (md+) the button is hidden and content always visible.
 * On mobile the button toggles visibility of children.
 */
function FooterAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Mobile toggle button — hidden on md+ */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="md:hidden w-full flex items-center justify-between font-display italic text-lg py-1 cursor-pointer bg-transparent border-none text-background"
      >
        {title}
        <span
          className="text-background/60 transition-transform duration-200 text-xl leading-none"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* Desktop heading — always visible, no interactivity */}
      <h3 className="hidden md:block font-display italic text-lg">{title}</h3>

      {/* Content: always visible on desktop, toggled on mobile */}
      <div className={open ? "mt-4" : "hidden md:block md:mt-4"}>
        {children}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      data-path-target="true"
      className="border-t border-border bg-foreground text-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand — always visible on mobile, no accordion */}
          <div>
            <div className="flex items-center gap-2">
              <NifsCrest className="h-10 w-10" />
              <span className="font-sans text-xl font-bold">NIFS</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-background/70">
              National Institute of Fire and Safety — igniting careers in
              fire engineering and industrial safety since 2004. An ISO
              9001:2015 certified unit of SSB Institute of Higher Studies
              Educational Society.
            </p>
          </div>

          {/* Explore — accordion on mobile, always-expanded on desktop */}
          <FooterAccordion title="Explore">
            <ul className="space-y-2 text-sm text-background/70">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-background">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          {/* Accreditations — accordion on mobile, always-expanded on desktop */}
          <FooterAccordion title="Accreditations">
            <ul className="space-y-2 text-sm text-background/70">
              {accreditations
                .filter((a) => a.name !== "NSDC" && a.name !== "Skill India")
                .slice(0, 3)
                .flatMap((a) =>
                  a.name === "Acharya Nagarjuna University"
                    ? [
                        <li key={a.name}>{a.name}</li>,
                        <li key="anu-fire-safety-dept">
                          <a
                            href="https://www.nagarjunauniversity.ac.in/departments/science/firesafety/"
                            target="_blank"
                            rel="noopener"
                            className="hover:text-background"
                          >
                            Fire Safety Dept (ANU)
                          </a>
                        </li>,
                      ]
                    : [<li key={a.name}>{a.name}</li>],
                )}
            </ul>
          </FooterAccordion>

          {/* Contact — always visible on mobile, no accordion */}
          <div>
            <h3 className="font-display italic text-lg">Contact</h3>
            <p className="mt-4 text-sm text-background/70">
              Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building,
              3rd Floor, Visakhapatnam (A.P.) – 530016
            </p>
            <p className="mt-2 text-sm text-background/70">
              +91-8374-340-999
            </p>
            <Link
              href="/admissions"
              className="mt-4 inline-block rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Apply Now
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/20 pt-6 text-xs text-background/50 md:flex-row">
          <span>© {new Date().getFullYear()} NIFS India. All rights reserved.</span>
          <span>Igniting Careers in Fire and Industrial Safety</span>
          <span>
            Crafted by{" "}
            <a href="https://vyzma.in" target="_blank" rel="noopener" className="hover:text-background">
              Vyzma.in
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
