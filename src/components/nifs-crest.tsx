import Image from "next/image";
import { cn } from "@/lib/utils";

export function NifsCrest({ className }: { className?: string }) {
  return (
    <Image
      src="/images/nifs-official-logo-v3.png"
      alt="NIFS Fire, Safety & Disaster crest"
      width={96}
      height={96}
      className={cn("object-contain", className)}
      priority
    />
  );
}
