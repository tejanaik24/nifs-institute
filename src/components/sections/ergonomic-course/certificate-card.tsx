import Image from "next/image";

/** Preview of the real certificate. `name` is the student's name once known, otherwise a placeholder. */
export function CertificateCard({ name, sample = false }: { name?: string; sample?: boolean }) {
  return (
    <div className="es-cert relative aspect-[1.414] w-full max-w-xl bg-[var(--es-paper)] p-3 shadow-[0_40px_70px_-30px_rgba(21,19,15,0.55)]">
      <div className="absolute inset-3 border border-primary" aria-hidden />
      <div className="absolute inset-[18px] border border-[var(--es-line)]" aria-hidden />
      <div className="relative flex h-full flex-col items-center justify-between px-6 py-5 text-center">
        <div>
          <Image src="/images/nifs-official-logo-v3.png" alt="NIFS" width={56} height={56} className="mx-auto h-11 w-auto" />
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.28em] text-primary">National Institute of Fire &amp; Safety</p>
        </div>
        <div>
          <p className="font-display text-2xl italic leading-none md:text-3xl">Certificate of Completion</p>
          <p className="mt-2 text-[10px] text-muted-foreground">This is to certify that</p>
          <p className="font-display mt-1 text-xl italic leading-tight text-primary md:text-2xl">{name || "Your name here"}</p>
          <p className="mx-auto mt-2 max-w-[22rem] text-[10px] leading-relaxed">
            has successfully completed the free online course <strong>Ergonomic Safety (NIFS ES)</strong>, including the assignment and final assessment.
          </p>
        </div>
        <div className="flex w-full items-end justify-between text-[8px] text-muted-foreground">
          <span>nifsindia.net</span>
          <span className="font-display text-[10px] italic text-foreground">{sample ? "Sample certificate" : "Certificate of Completion"}</span>
          <span>Authorised signatory</span>
        </div>
      </div>
    </div>
  );
}
