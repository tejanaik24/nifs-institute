"use client";

import dynamic from "next/dynamic";

// Lazy-loads PriyaWidget in a client boundary so next/dynamic ssr:false works.
// layout.tsx is a Server Component so it can't call dynamic() with ssr:false directly.
const PriyaWidgetLazy = dynamic(
  () =>
    import("@/components/widgets/priya-widget").then((m) => ({
      default: m.PriyaWidget,
    })),
  { ssr: false }
);

export function PriyaWidgetLoader() {
  return <PriyaWidgetLazy />;
}
