import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { TiltWrapper } from "@/components/motion/tilt-wrapper";
import type { AboutPage, AboutSection } from "@/lib/data/about-pages";
import { accreditations, accreditationLogos } from "@/lib/data/centers";

function SplitSection({ section }: { section: Extract<AboutSection, { type: "split" }> }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {section.items.map((item) => (
          <div key={item.eyebrow} data-3d-item className="[transform-style:preserve-3d]">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {item.eyebrow}
            </span>
            <h2 className="font-display mt-3 text-3xl italic leading-tight">
              {item.title}
            </h2>
            {item.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsSection({ section }: { section: Extract<AboutSection, { type: "stats" }> }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {section.stats.map((s) => (
          <div key={s.label} data-3d-item className="[transform-style:preserve-3d]">
            <TiltWrapper className="h-full">
              <div className="h-full border border-border bg-muted/20 p-6 text-center">
                <div className="font-display text-4xl italic text-primary">{s.value}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </TiltWrapper>
          </div>
        ))}
      </div>
    </section>
  );
}

function CardsSection({ section }: { section: Extract<AboutSection, { type: "cards" }> }) {
  return (
    <section className="border-t border-border bg-muted/20 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {(section.eyebrow || section.title) && (
          <div data-3d-head>
            {section.eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {section.eyebrow}
              </span>
            )}
            {section.title && (
              <h2 className="font-display mt-2 text-3xl italic">{section.title}</h2>
            )}
          </div>
        )}
        <div
          className={`mt-8 grid grid-cols-1 gap-6 ${
            section.cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {section.cards.map((card) => (
            <div key={card.title} data-3d-item className="[transform-style:preserve-3d]">
              <TiltWrapper className="h-full">
                <div className="h-full border border-border bg-white p-6 shadow-sm">
                  {card.meta && (
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">
                      {card.meta}
                    </div>
                  )}
                  <h3 className="mt-2 text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </div>
              </TiltWrapper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogosSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {accreditationLogos
          .filter((a) => a.logo)
          .map((a) => (
            <div key={a.name} data-3d-item className="[transform-style:preserve-3d]">
              <TiltWrapper className="h-full">
                <div className="flex h-full flex-col items-center justify-center border border-border bg-white p-6 shadow-sm">
                  <div className="relative h-20 w-full">
                    <Image
                      src={a.logo as string}
                      alt={`${a.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-3 text-center text-sm font-semibold">{a.name}</div>
                </div>
              </TiltWrapper>
            </div>
          ))}
      </div>
    </section>
  );
}

function ListSection({ section }: { section: Extract<AboutSection, { type: "list" }> }) {
  return (
    <section className="border-t border-border bg-muted/20 py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div data-3d-head>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {section.eyebrow}
          </span>
          <h2 className="font-display mt-2 text-3xl italic">{section.title}</h2>
        </div>
        <ul className="mt-8 space-y-4">
          {accreditations.map((a) => (
            <li
              key={a.name}
              data-3d-item
              className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <div>
                <div className="font-semibold">{a.name}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{a.desc}</div>
              </div>
            </li>
          ))}
        </ul>
        {section.note && (
          <p className="mt-8 text-sm text-muted-foreground">{section.note}</p>
        )}
      </div>
    </section>
  );
}

function CtaSection({ section }: { section: Extract<AboutSection, { type: "cta" }> }) {
  return (
    <section className="border-t border-border bg-muted/20 py-16">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <div data-3d-head>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {section.eyebrow}
          </span>
          <h2 className="font-display mt-2 text-3xl italic">{section.title}</h2>
          {section.body && (
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{section.body}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export function AboutPageRenderer({ page }: { page: AboutPage }) {
  return (
    <>
      <div data-3d-hero>
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          description={page.hero.description}
        />
      </div>
      {page.sections.map((section, i) => {
        switch (section.type) {
          case "split":
            return <SplitSection key={i} section={section} />;
          case "stats":
            return <StatsSection key={i} section={section} />;
          case "cards":
            return <CardsSection key={i} section={section} />;
          case "logos":
            return <LogosSection key={i} />;
          case "list":
            return <ListSection key={i} section={section} />;
          case "cta":
            return <CtaSection key={i} section={section} />;
        }
      })}
    </>
  );
}
