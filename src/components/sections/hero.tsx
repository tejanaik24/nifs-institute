import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      data-path-target="true"
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-foreground"
    >
      <Image
        src="/images/hero-industrial-site.jpg"
        alt="NIFS Industrial site inspection at golden hour"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />

      {/* Vertical rotated tagline — Gordonstoun's "Plus Est En Vous" pattern */}
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 md:block lg:right-10">
        <span
          className="font-display block whitespace-nowrap text-lg italic text-white/90"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Igniting Careers in Fire and Safety
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <h1 className="font-display max-w-3xl text-5xl italic leading-[1.05] text-white text-balance md:text-7xl">
          Trained for the Site.
          <br />
          Ready for the Career.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/85">
          India&apos;s leading industrial safety and fire engineering
          institute — NSDC &amp; Skill India approved, ISO 9001:2015
          certified, with graduates placed at Adani, L&amp;T, ITC, Amazon
          and 85+ centers nationwide.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/courses"
            className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Explore Courses
          </Link>
          <Link
            href="/placements"
            className="border border-white/70 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition-transform hover:scale-[1.02]"
          >
            See Placements
          </Link>
        </div>
      </div>
    </section>
  );
}
