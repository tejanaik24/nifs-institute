const TESTIMONIALS = [
  {
    quote:
      "I had the best decision of my life to join NIFS. The distance education and practical training along with training for placements made me get a job at one of the top construction companies. I especially encourage anyone seeking job centered courses to attend NIFS.",
    initial: "R",
    color: "bg-nifs-red",
    name: "Rajesh Kumar",
    role: "Safety Officer, Vizag",
  },
  {
    quote:
      "NIFS provided me with the right mix of theoretical knowledge and practical skills. The faculty's industry experience made every concept relevant. I was placed even before completing my course through the campus recruitment drive.",
    initial: "P",
    color: "bg-nifs-green",
    name: "NIFS Graduate",
    role: "Campus Placement",
  },
  {
    quote:
      "The dual diploma in Fire and Safety gave me both qualifications in a single program. That extra qualification expanded my job opportunities significantly. NIFS curriculum truly matches what the industry demands.",
    initial: "A",
    color: "bg-nifs-orange",
    name: "NIFS Alumni",
    role: "Dual Diploma Graduate",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="w-full py-[100px] max-lg:py-[60px] max-md:py-[50px] max-sm:py-[60px] pb-[200px] bg-black flex justify-center items-center flex-col">
      <div className="w-[1100px] max-w-full max-lg:w-[90%] max-sm:w-[95%] relative flex flex-col gap-[40px] max-sm:gap-[24px] justify-center items-center">
        <h2 className="font-sans text-[3.5vw] max-lg:text-[7vw] max-sm:text-[28px] font-black leading-[100%] tracking-normal text-center text-white break-words w-full">
          What Our <span className="font-display italic">Graduates Say</span>
        </h2>

        {/*
          Desktop: cards are sticky top-[90px], h-[280px] — the stacking/merge effect.
          Mobile: cards are sticky top-[70px], h-[220px] with overflow-hidden — same
          compact sticky-stack effect sized for a phone screen. The max-sm overrides
          replace the previous max-sm:static / max-sm:h-auto that disabled the effect.
        */}
        <div className="w-[95%] max-lg:w-[90%] max-sm:w-[100%] relative flex flex-col gap-6 max-sm:gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-[32px] max-md:rounded-[28px] max-sm:rounded-[24px] h-[280px] max-lg:h-[310px] max-md:h-[280px] max-sm:h-[220px] sticky top-[90px] max-sm:top-[70px] left-0 bg-white overflow-hidden`}
              style={{ zIndex: i + 1 }}
            >
              <div className="flex flex-col justify-between h-full p-8 py-10 max-sm:p-5">
                <p className="font-sans text-[17px] max-md:text-[14px] max-sm:text-[13px] leading-[130%] font-medium text-black line-clamp-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex max-sm:flex-col justify-between items-center mt-4">
                  <div className="flex gap-4 max-sm:flex-col max-sm:w-full items-center">
                    <div
                      className={`w-[52px] h-[52px] max-sm:w-[40px] max-sm:h-[40px] rounded-xl ${t.color} flex items-center justify-center text-white font-sans font-black text-[22px] max-sm:text-[18px]`}
                    >
                      {t.initial}
                    </div>
                    <h3 className="font-sans font-bold text-[18px] max-sm:text-[15px]">
                      {t.name}
                    </h3>
                  </div>
                  <p className="font-sans font-normal text-[18px] max-sm:text-[13px] max-sm:justify-start max-sm:w-full text-gray-600">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <a
            href="#apply"
            className="rounded-[48px] max-md:rounded-[32px] bg-white px-[28px] py-[12px] text-[18px] max-sm:text-[16px] text-black hover:bg-nifs-red hover:text-white font-sans font-bold cursor-pointer border-2 border-white hover:border-nifs-red transition-all duration-300 inline-block"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
