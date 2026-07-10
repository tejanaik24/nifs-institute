import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Styled placeholder standing in for AI-generated photography that hasn't
 * landed yet (see nifs-images-incoming/). Swap for next/image once the real
 * file exists — the `slot` prop matches the filename it's waiting on.
 */
export function ImagePlaceholder({
  slot,
  label,
  className,
  align = "center",
}: {
  slot: string;
  label: string;
  className?: string;
  /** "top" keeps the label clear of overlaid text lower in the frame (e.g. Hero) */
  align?: "center" | "top";
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 bg-gradient-to-br from-muted to-secondary/40 text-center",
        align === "top" ? "justify-start pt-10" : "justify-center",
        className
      )}
    >
      <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
      <div className="px-6">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground/60">
          {slot}
        </p>
      </div>
    </div>
  );
}
