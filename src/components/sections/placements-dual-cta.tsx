export function PlacementsDualCta() {
  return (
    <section
      data-path-target="true"
      className="grid w-full grid-cols-1 text-center sm:grid-cols-2"
    >
      <div className="flex flex-col items-center justify-center gap-5 bg-nifs-red px-6 py-16 sm:py-20">
        <h2 className="font-sans text-[28px] font-black leading-tight text-white sm:text-[32px]">
          Want a placement like this?
        </h2>
        <p className="max-w-[420px] font-sans text-sm text-white/90 sm:text-base">
          Join 45,000+ alumni placed at Adani, L&amp;T, MEIL, GMR, ITC and
          more. Admissions open for Diploma, PG Diploma, Degree, and
          Certificate programs.
        </p>
        <a
          href="https://wa.me/918374340999?text=Hi%20NIFS%2C%20I%20want%20to%20know%20about%20courses%2C%20fees%2C%20eligibility%20and%20job%20placements."
          className="mt-2 inline-block rounded-full bg-white px-8 py-4 font-sans text-base font-bold text-nifs-red transition-all duration-300 hover:bg-transparent hover:text-white border-2 border-white"
        >
          Chat on WhatsApp — Enroll Now
        </a>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 bg-black px-6 py-16 sm:py-20">
        <h2 className="font-sans text-[28px] font-black leading-tight text-white sm:text-[32px]">
          Hiring safety officers?
        </h2>
        <p className="max-w-[420px] font-sans text-sm text-white/90 sm:text-base">
          Partner with NIFS Placement Cell for pre-trained, industry-ready
          Fire &amp; Industrial Safety candidates across 70+ centers,
          available for immediate joining.
        </p>
        <a
          href="https://wa.me/918374340999?text=Hi%20NIFS%2C%20our%20company%20is%20looking%20to%20hire%20trained%20Fire%20%26%20Industrial%20Safety%20candidates.%20Please%20share%20details."
          className="mt-2 inline-block rounded-full bg-nifs-red px-8 py-4 font-sans text-base font-bold text-white transition-all duration-300 hover:bg-transparent hover:text-nifs-red border-2 border-nifs-red"
        >
          Chat on WhatsApp — Hire from NIFS
        </a>
      </div>
    </section>
  );
}
