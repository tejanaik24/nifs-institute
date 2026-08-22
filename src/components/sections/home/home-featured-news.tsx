export default function HomeFeaturedNews() {
  return (
    <section className="w-full bg-[#f8f4f3] py-[80px] max-lg:py-[60px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex gap-12 max-lg:flex-col items-center">
          <div className="w-[52%] max-lg:w-full flex-shrink-0 relative">
            <div className="rounded-[28px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.18)] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                decoding="async"
                src="/images/blog/nifs-india-achieves-milestone-collaboration-with-acharya-nagarjuna-university-65.jpeg"
                alt="NIFS India achieves Milestone Collaboration with Acharya Nagarjuna University"
                className="w-full h-[420px] max-sm:h-[260px] object-cover"
              />
              <div className="absolute bottom-5 left-5 flex items-center gap-2">
                <span className="bg-nifs-red text-white font-sans text-[11px] font-bold uppercase tracking-[2px] px-3 py-1.5 rounded-full shadow">Featured News</span>
                <span className="bg-black/60 text-white font-sans text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">July 31, 2025</span>
              </div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 w-24 h-24 opacity-20 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle,#cc1b1b 1.5px,transparent 1.5px)", backgroundSize: "10px 10px" }}
            />
          </div>

          <div className="flex-1 flex flex-col gap-6 max-lg:items-center max-lg:text-center w-full">
            <div className="flex items-center gap-3 max-lg:justify-center">
              <div className="w-8 h-[3px] bg-nifs-red rounded-full" />
              <span className="font-sans text-nifs-red text-[12px] font-bold uppercase tracking-[3px]">Latest Update</span>
            </div>

            <h2 className="font-sans text-[2.2vw] max-lg:text-[4vw] max-sm:text-[22px] font-black leading-[1.2] text-gray-900 break-words">
              NIFS India Achieves Milestone
              <br />
              Collaboration with
              <br />
              <span className="font-display italic text-nifs-red">Acharya Nagarjuna University</span>
            </h2>

            <p className="font-sans text-gray-500 text-[15px] max-sm:text-[14px] leading-[1.7] max-w-[480px]">
              In a significant development in the field of fire and safety education, NIFS India has achieved a landmark collaboration with
              Acharya Nagarjuna University. This partnership enables students to pursue advanced safety certifications backed by a recognized
              university degree — opening doors to careers across India, Gulf countries, and beyond.
            </p>

            <div className="flex gap-8 max-sm:gap-5 max-lg:justify-center">
              <div className="flex flex-col">
                <span className="font-sans text-gray-900 font-black text-[22px]">2025</span>
                <span className="font-sans text-gray-400 text-[12px] uppercase tracking-widest font-semibold">Year</span>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="flex flex-col">
                <span className="font-sans text-gray-900 font-black text-[22px]">UG + PG</span>
                <span className="font-sans text-gray-400 text-[12px] uppercase tracking-widest font-semibold">Programs</span>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="flex flex-col">
                <span className="font-sans text-gray-900 font-black text-[22px]">Pan-India</span>
                <span className="font-sans text-gray-400 text-[12px] uppercase tracking-widest font-semibold">Access</span>
              </div>
            </div>

            <a
              href="/blog/nifs-india-achieves-milestone-collaboration-with-acharya-nagarjuna-university"
              target="_blank"
              className="inline-flex items-center gap-2 bg-nifs-red text-white font-sans font-bold text-[15px] px-7 py-3.5 rounded-full hover:bg-red-700 transition-colors duration-300 max-lg:self-center group"
            >
              Read Full Story
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
