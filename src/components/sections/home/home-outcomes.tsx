const ROLES = [
  { label: "Fire Safety Officer", hover: "hover:bg-nifs-red hover:border-nifs-red" },
  { label: "Industrial Safety Supervisor", hover: "hover:bg-nifs-green hover:border-nifs-green" },
  { label: "HSE Manager", hover: "hover:bg-nifs-orange hover:border-nifs-orange" },
  { label: "Emergency Response Coordinator", hover: "hover:bg-nifs-red hover:border-nifs-red" },
  { label: "Risk Analyst", hover: "hover:bg-nifs-green hover:border-nifs-green" },
  { label: "Safety Inspector", hover: "hover:bg-nifs-orange hover:border-nifs-orange" },
  { label: "Plant Safety Coordinator", hover: "hover:bg-nifs-red hover:border-nifs-red" },
  { label: "Environmental Compliance Analyst", hover: "hover:bg-nifs-green hover:border-nifs-green" },
];

export default function HomeOutcomes() {
  return (
    <section className="w-full py-[120px] max-lg:py-[70px] bg-black flex justify-center items-center flex-col overflow-hidden">
      <div className="w-[90%] max-sm:w-[95%] flex flex-col gap-12 items-center">
        <h2 className="font-sans text-white text-[6vw] max-lg:text-[8vw] font-black leading-none text-center break-words w-full">Where Our <span className="font-display italic">Graduates Work</span></h2>

        <div className="flex flex-wrap gap-4 justify-center">
          {ROLES.map((r) => (
            <span
              key={r.label}
              className={`px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white text-[16px] max-sm:text-[14px] font-semibold transition-all cursor-pointer ${r.hover}`}
            >
              {r.label}
            </span>
          ))}
        </div>

        <div className="flex gap-10 max-sm:gap-6 justify-center flex-wrap mt-4">
          <div className="text-center">
            <span className="block font-sans text-[48px] max-sm:text-[32px] font-black text-nifs-red leading-none">45,000+</span>
            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-white/40 mt-2 block">Candidates Placed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
