"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollImageTunnelImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ScrollImageTunnelProps {
  images: ScrollImageTunnelImage[];
  hint?: React.ReactNode;
  stepHeight?: string;
  container?: React.RefObject<HTMLElement | null>;
  className?: string;
  overlay?: (progress: MotionValue<number>) => React.ReactNode;
}

function TunnelFrame({
  src,
  alt,
  caption,
  index,
  total,
  progress,
}: {
  src: string;
  alt: string;
  caption?: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const local = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1],
  );
  const scale = useTransform(local, [0, 0.8], [0.05, 1]);
  const y = useTransform(local, [0, 0.75], [40, 0]);
  const opacity = useTransform(local, [0, 0.03, 1], [0, 1, 1]);
  const contrast = useTransform(local, [0, 0.7], [2.2, 1]);
  const saturate = useTransform(local, [0, 0.7], [2.6, 1]);
  const filter = useMotionTemplate`contrast(${contrast}) saturate(${saturate}) sepia(0.15) brightness(1.05)`;

  const captionY = useTransform(local, [0.15, 0.6], [24, 0]);
  const captionOpacity = useTransform(local, [0.15, 0.4], [0, 1]);

  return (
    <div
      style={{ zIndex: index }}
      className="absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{ scale, y, opacity, filter }}
        className="absolute inset-0 h-full w-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Gradient scrim for caption legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Editorial caption */}
      {caption && (
        <motion.div
          style={{ y: captionY, opacity: captionOpacity }}
          className="absolute bottom-12 left-6 max-w-md lg:bottom-16 lg:left-16"
        >
          <span className="font-display text-sm italic text-white/60">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <p className="font-display mt-2 text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.05] italic text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
            {caption}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export function ScrollImageTunnel({
  images,
  hint = "Scroll down to reveal the images",
  stepHeight = "200vh",
  container,
  className,
  overlay,
}: ScrollImageTunnelProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const containerEl = container?.current ?? null;
    const win = el.ownerDocument.defaultView ?? window;
    const target: HTMLElement | Window = containerEl ?? win;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewport = containerEl ? containerEl.clientHeight : win.innerHeight;
      const top = containerEl
        ? rect.top - containerEl.getBoundingClientRect().top
        : rect.top;
      const denom = rect.height - viewport || 1;
      progress.set(Math.min(1, Math.max(0, -top / denom)));
    };
    const onScroll = () => {
      if (!raf) raf = win.requestAnimationFrame(update);
    };

    update();
    target.addEventListener("scroll", onScroll, { passive: true });
    win.addEventListener("resize", onScroll);
    const ro = containerEl ? new ResizeObserver(onScroll) : null;
    if (containerEl && ro) ro.observe(containerEl);

    return () => {
      target.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onScroll);
      ro?.disconnect();
      if (raf) win.cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, progress, container]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("grid gap-4 bg-muted p-6", className)}>
        {images.map((image) => (
          <div
            key={image.src}
            className="mx-auto aspect-video w-full max-w-5xl overflow-hidden bg-background"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-clip", className)}>
      {hint ? (
        <div className="my-20 grid content-start justify-items-center gap-6 text-center">
          <span className="relative text-xs uppercase leading-tight text-muted-foreground after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:to-muted-foreground/40 after:content-['']">
            {hint}
          </span>
        </div>
      ) : null}

      <div
        ref={containerRef}
        style={{ height: `calc(${images.length} * ${stepHeight})` }}
        className="w-full"
      >
        <section className="sticky top-0 h-screen w-full overflow-hidden bg-background">
          {images.map((image, index) => (
            <TunnelFrame
              key={image.src}
              src={image.src}
              alt={image.alt}
              caption={image.caption}
              index={index}
              total={images.length}
              progress={progress}
            />
          ))}

          {overlay && (
            <div className="absolute inset-0" style={{ zIndex: images.length }}>
              {overlay(progress)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ScrollImageTunnel;
