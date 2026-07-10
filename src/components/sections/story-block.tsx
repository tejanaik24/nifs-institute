"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { NifsCrest } from "@/components/nifs-crest";

gsap.registerPlugin(ScrollTrigger);

export function StoryBlock({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  imageSlot,
  imageLabel,
  reverse = false,
  pathTarget = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageSlot: string;
  imageLabel: string;
  reverse?: boolean;
  pathTarget?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelector(".story-copy"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        sectionRef.current!.querySelector(".story-image"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-2 md:py-20 lg:px-10 lg:py-32"
    >
      <div
        className={`story-image relative aspect-[4/5] w-full overflow-hidden rounded-sm ${reverse ? "md:order-2" : ""}`}
        {...(pathTarget ? { "data-path-target": "true" } : {})}
      >
        <Image
          src={`/images/${imageSlot}`}
          alt={imageLabel}
          fill
          className="object-cover"
        />
      </div>

      <div className={`story-copy ${reverse ? "md:order-1" : ""}`}>
        <div className="mb-4 flex items-center gap-2">
          <NifsCrest className="h-6 w-6" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
        </div>
        <h2 className="font-display text-4xl italic leading-tight text-foreground text-balance md:text-5xl">
          {title}
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          {body}
        </p>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
