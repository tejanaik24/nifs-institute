import Link from "next/link";
import { NifsCrest } from "@/components/nifs-crest";
import { primaryNav } from "@/lib/data/nav";
import { accreditations } from "@/lib/data/centers";

export function SiteFooter() {
  return (
    <footer
      data-path-target="true"
      className="border-t border-border bg-foreground text-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
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

          <div>
            <h3 className="font-display italic text-lg">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-background">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display italic text-lg">Accreditations</h3>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {accreditations.slice(0, 5).map((a) => (
                <li key={a.name}>{a.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display italic text-lg">Contact</h3>
            <p className="mt-4 text-sm text-background/70">
              Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building,
              3rd Floor, Visakhapatnam (A.P.) – 530016
            </p>
            <p className="mt-2 text-sm text-background/70">
              +91-9246-624-690 · +91-8374-340-999
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
        </div>
      </div>
    </footer>
  );
}
