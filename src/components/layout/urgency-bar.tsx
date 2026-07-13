const announcements = [
  "Admissions Open for Diploma / PG Diploma / Degree / PG and International Courses on Fire and Industrial Safety, Construction Safety, Health Safety and Environment, SBTET — Education Loan available for all Courses",
  "NIFS offering certification in Defensive Driving Training recognized by Govt of Andhra Pradesh",
];

export function UrgencyBar() {
  const loop = [...announcements, ...announcements];

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-9 overflow-hidden bg-[#CC0000] text-white [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="flex h-9 w-max animate-marquee items-center gap-16 text-xs font-medium tracking-wide whitespace-nowrap md:text-sm">
        {loop.map((text, i) => (
          <span key={i} className="flex items-center gap-2">
            🔥 {text}
          </span>
        ))}
      </div>
    </div>
  );
}
