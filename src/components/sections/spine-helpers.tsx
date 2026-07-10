import type { ReactNode, CSSProperties } from "react";
import { SPINE_WIDTH } from "@/components/SpineLayout";

const gutterWidth = `calc(50% - ${SPINE_WIDTH / 2}px)`;
const overlapWidth = `calc(50% - ${SPINE_WIDTH / 2}px + 120px)`;

/** Two background panels covering only the left/right gutters, leaving the
 * center 450px transparent so the global spine shows through. On mobile the
 * spine is hidden, so a single flat background covers the whole section. */
export function SpineGutterBg({ color, mobileColor }: { color: string; mobileColor?: string }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-[2] hidden lg:block"
        style={{ width: gutterWidth, background: color }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-[2] hidden lg:block"
        style={{ width: gutterWidth, background: color }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] lg:hidden"
        style={{ background: mobileColor ?? color }}
      />
    </>
  );
}

const gutterStyle: CSSProperties = { ["--gutter-w" as string]: gutterWidth };

/** Left / center-on-spine / right three-column row. The center column always
 * reserves the full spine width (empty if no `center` content) so left/right
 * content lines up exactly at the gutter edges. */
export function SpineSplit({
  left,
  center,
  right,
  className = "",
}: {
  left: ReactNode;
  center?: ReactNode;
  right: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative z-[3] mx-auto flex max-w-[1600px] flex-col gap-10 px-5 py-16 lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:py-24 ${className}`}
    >
      <div className="w-full lg:w-[var(--gutter-w)]" style={gutterStyle}>
        {left}
      </div>
      <div
        className="hidden shrink-0 items-center justify-center lg:flex"
        style={{ width: `${SPINE_WIDTH}px` }}
      >
        {center}
      </div>
      <div className="w-full lg:w-[var(--gutter-w)]" style={gutterStyle}>
        {right}
      </div>
    </div>
  );
}

/** Width style for an element that should bleed 120px into the spine from
 * the left gutter (used for images/cards called out as overlapping). */
export function overlapFromLeft(): CSSProperties {
  return { width: overlapWidth };
}

/** Width style for an element that should bleed 120px into the spine from
 * the right gutter. */
export function overlapFromRight(): CSSProperties {
  return { width: overlapWidth, marginLeft: "auto" };
}

export { gutterWidth, overlapWidth };
