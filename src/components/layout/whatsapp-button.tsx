"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919246624690"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/60" />
      <MessageCircle className="relative h-7 w-7" fill="white" strokeWidth={0} />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
