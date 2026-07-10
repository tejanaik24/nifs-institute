const chevronTexture =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25'%3E%3Cpath d='M2 6l10.5 13L23 6' stroke='white' stroke-width='1.5' fill='none' stroke-opacity='0.15'/%3E%3C/svg%3E";

export const SPINE_WIDTH = 450;

/**
 * Continuous vertical red spine running behind every section passed as
 * children. Sections themselves must leave their middle 450px transparent
 * (see spine-helpers.tsx) so this shows through instead of being covered.
 */
export function SpineLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] hidden bg-primary lg:block"
        style={{
          width: `${SPINE_WIDTH}px`,
          transform: "translateX(-50%)",
          backgroundImage: `url("${chevronTexture}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "25px 25px",
        }}
      />
      <div className="relative z-[3]">{children}</div>
    </div>
  );
}
