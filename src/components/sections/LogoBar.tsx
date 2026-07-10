import { recruiters } from "@/lib/data/centers";
import { SpineGutterBg, SpineSplit } from "@/components/sections/spine-helpers";

export function LogoBar() {
  const list = recruiters.join(" · ");

  return (
    <section className="relative overflow-x-hidden">
      <SpineGutterBg color="#111111" />

      <SpineSplit
        className="!py-6 lg:!py-8"
        left={
          <span className="block text-[10px] font-medium tracking-[0.2em] whitespace-nowrap text-primary uppercase lg:text-right">
            Our Graduates Work At
          </span>
        }
        center={
          <span className="font-display text-[40px] leading-none text-white italic">
            85+
          </span>
        }
        right={
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#111111] to-transparent lg:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#111111] to-transparent lg:w-24" />

            <div className="ticker-track flex w-max whitespace-nowrap">
              <span className="px-4 text-[13px] tracking-[0.1em] text-white/90">
                {list}
                <span className="mx-4 text-primary">·</span>
              </span>
              <span className="px-4 text-[13px] tracking-[0.1em] text-white/90">
                {list}
                <span className="mx-4 text-primary">·</span>
              </span>
            </div>
          </div>
        }
      />

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker 25s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
