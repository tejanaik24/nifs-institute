import { cn } from "@/lib/utils";

export function NifsCrest({ className }: { className?: string }) {
  return (
    <img
      src="/images/nifs-official-logo-v3.png"
      alt="NIFS Fire, Safety & Disaster crest"
      width={96}
      height={96}
      className={cn("object-contain", className)}
      loading="eager"
    />
  );
}
