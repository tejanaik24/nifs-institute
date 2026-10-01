import Image from "next/image";
import { KUSUMA_SIGNATURE_SRC } from "@/lib/data/kusuma-signature";

/** Preview of the real certificate. `name` is the student's name once known, otherwise a placeholder. */
export function CertificateCard({ name, sample = false }: { name?: string; sample?: boolean }) {
  const candidateName = (name || "Candidate Name").toUpperCase();

  return (
    <div className="es-cert relative aspect-[1.414] w-full max-w-xl bg-[#FAF7F0] p-4 text-[#1C1917] shadow-[0_40px_70px_-30px_rgba(21,19,15,0.55)] border border-[#D9CBAC]">
      {/* Decorative Borders */}
      <div className="absolute inset-2 sm:inset-3 border-[1.5px] border-[#8B1E1E] pointer-events-none" aria-hidden />
      <div className="absolute inset-3 sm:inset-4 border border-[#C5A059] pointer-events-none" aria-hidden />

      <div className="relative flex h-full flex-col items-center justify-between px-3 py-2 sm:px-6 sm:py-4 text-center z-10">
        {/* Header */}
        <div>
          <Image
            src="/images/nifs-official-logo-v3.png"
            alt="National Institute of Fire & Safety"
            width={72}
            height={72}
            className="mx-auto h-12 sm:h-14 w-auto"
          />
          <p className="mt-1 font-serif text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B1E1E]">
            National Institute of Fire &amp; Safety
          </p>
          <p className="text-[6.5px] sm:text-[7.5px] uppercase tracking-wider text-stone-500 font-medium">
            Govt. Recognized • Estd. 2004
          </p>
        </div>

        {/* Certificate Title & Recipient */}
        <div className="w-full">
          <p className="font-serif text-lg sm:text-2xl font-bold tracking-wide text-[#1C1917] leading-none">
            Certificate of Completion
          </p>
          <div className="mx-auto my-1 flex w-24 sm:w-36 items-center justify-center gap-1.5 opacity-60">
            <div className="h-[0.5px] flex-1 bg-[#C5A059]" />
            <span className="text-[6px] text-[#C5A059]">✦ ✦ ✦</span>
            <div className="h-[0.5px] flex-1 bg-[#C5A059]" />
          </div>

          <p className="text-[8px] sm:text-[9.5px] italic text-stone-500">This is to certify that</p>
          <p className="font-serif my-0.5 text-base sm:text-xl font-extrabold uppercase tracking-wider text-[#8B1E1E]">
            {candidateName}
          </p>
          <p className="mx-auto max-w-[21rem] text-[8px] sm:text-[9px] text-stone-700 leading-snug">
            has demonstrated professional competency and fulfilled all curriculum standards in
          </p>
          <p className="font-serif text-[10px] sm:text-[12px] font-bold tracking-wide text-[#1C1917] mt-0.5">
            OCCUPATIONAL ERGONOMIC SAFETY (NIFS-ES)
          </p>

          {/* Academic Pathway Ribbon */}
          <div className="mx-auto mt-1 sm:mt-1.5 max-w-[23rem] rounded-[2px] border border-[#D9CBAC] bg-[#F4EEE4] px-2 py-0.5 sm:py-1 text-left text-[6.5px] sm:text-[7.5px] text-stone-700 flex items-center justify-between gap-2">
            <span className="line-clamp-2 leading-tight">
              <strong className="text-[#8B1E1E]">ACADEMIC PATHWAY:</strong> Recognized for fast-track credit transfer into <strong>Advance Diploma (ADIS)</strong> &amp; <strong>B.Sc. Fire &amp; Safety</strong>.
            </span>
            <span className="shrink-0 text-[6px] sm:text-[7px] font-bold text-[#8B1E1E] uppercase tracking-wider">
              Fast-Track
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex w-full items-end justify-between text-[7px] sm:text-[8px] text-stone-600 pt-1">
          <div className="text-left">
            <p className="font-semibold text-stone-800">nifsindia.net</p>
            <p className="text-[6px] sm:text-[7px] text-stone-500">{sample ? "Sample Credential" : "Verified Credential"}</p>
          </div>

          {/* Seal Graphic */}
          <div className="text-center flex flex-col items-center">
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border border-[#C5A059] bg-[#FAF7F0] flex items-center justify-center p-0.5 text-[6px] font-serif font-bold text-[#8B1E1E]">
              ★ NIFS ★
            </div>
            <span className="text-[5.5px] sm:text-[6.5px] uppercase tracking-wider text-stone-500 font-medium mt-0.5">Official Seal</span>
          </div>

          {/* Signature Block */}
          <div className="text-center w-24 sm:w-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={KUSUMA_SIGNATURE_SRC}
              alt="Authorised Signatory"
              className="mx-auto h-6 sm:h-8 w-auto -mb-1"
            />
            <div className="mx-auto w-20 border-t border-stone-800 my-0.5" />
            <p className="font-serif font-bold uppercase tracking-wider text-[6.5px] sm:text-[7.5px] text-stone-900">Authorised Signatory</p>
            <p className="text-[5.5px] sm:text-[6.5px] text-stone-500">Controller of Academics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
