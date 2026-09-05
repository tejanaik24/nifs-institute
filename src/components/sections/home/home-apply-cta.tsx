export default function HomeApplyCta() {
  return (
    <section
      id="apply"
      data-path-target="true"
      className="w-full bg-nifs-red py-[120px] max-lg:py-[80px] flex justify-center items-center flex-col text-center px-6"
    >
      <h2 className="font-sans text-white text-[5vw] max-lg:text-[7vw] font-black leading-none mb-6 break-words w-full">
        Your Safety Career{" "}
        <span className="font-display italic">Starts Here</span>
      </h2>
      <p className="font-sans text-white font-medium text-[22px] max-sm:text-[16px] mb-10 max-w-[600px]">
        Admissions open for Diploma, PG Diploma, Degree, and Certificate
        programs. Education loans and scholarships available. Join 45,000+
        alumni.
      </p>
      <p className="font-sans text-white font-semibold text-[16px] mb-8">
        Limited seats available for August 2026 intake
      </p>
      <div className="flex gap-4 max-sm:flex-col max-sm:w-full max-sm:items-center">
        <a
          href="/admissions"
          className="rounded-[48px] bg-white px-[40px] py-[18px] text-[24px] max-sm:text-[18px] text-nifs-red font-sans font-bold cursor-pointer border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 inline-block"
        >
          Apply Now →
        </a>
        <a
          href="tel:+918374340999"
          className="rounded-[48px] bg-transparent px-[40px] py-[18px] text-[24px] max-sm:text-[18px] text-white font-sans font-bold cursor-pointer border-2 border-white hover:bg-white hover:text-nifs-red transition-all duration-300 inline-block"
        >
          Call Now
        </a>
      </div>
    </section>
  );
}
