"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Center } from "@/lib/data/centers";
import { hasVerifiedAddress } from "@/lib/data/centers";

export function CenterDetailCard({
  center,
  onClose,
}: {
  center: Center;
  onClose: () => void;
}) {
  const verified = hasVerifiedAddress(center);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative w-full max-w-[320px] border border-primary/30 bg-background/95 p-6 text-center shadow-lg"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 text-muted-foreground transition-colors hover:text-foreground"
      >
        ×
      </button>

      {center.isHQ && (
        <span className="inline-block border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
          Headquarters
        </span>
      )}

      <h3 className="font-display mt-3 text-2xl italic">{center.city}</h3>
      <p className="text-xs text-muted-foreground">{center.state}</p>

      {verified ? (
        <>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {center.address}
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              center.address ?? center.city
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Get Directions →
          </a>
        </>
      ) : (
        <>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Contact NIFS HQ for this center&apos;s address &amp; enrollment
            details.
          </p>
          <Link
            href="/centers"
            className="mt-4 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            View All Centers →
          </Link>
        </>
      )}

      <div className="mt-6 flex justify-center gap-3">
        <a
          href="tel:+919246624690"
          className="inline-flex items-center bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Call HQ
        </a>
        <a
          href="https://wa.me/919246624690"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
