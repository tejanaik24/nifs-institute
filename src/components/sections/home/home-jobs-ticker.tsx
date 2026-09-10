import Link from "next/link";
import { getOpenJobs, JobWithPositions } from "@/lib/db/jobs";

function tickerLabel(job: JobWithPositions) {
  const company = job.clientCompany || job.companyName;
  const posCount = job.positions.length;
  const roleText =
    posCount === 1
      ? job.positions[0]?.designation
      : posCount > 1
        ? `${posCount} positions`
        : "Immediate opening";
  const ctc = job.positions.find((p) => p.salary)?.salary;
  return `${company}: ${roleText}${ctc ? ` · ${ctc}` : ""}`;
}

export default async function HomeJobsTicker() {
  const openJobs = await getOpenJobs().catch(() => []);
  if (openJobs.length === 0) return null;

  const items = [...openJobs, ...openJobs];

  return (
    <div className="relative w-full overflow-hidden bg-black py-3">
      <div className="flex items-center">
        <div className="z-10 flex shrink-0 items-center gap-2 bg-black pl-[5%] pr-4 sm:pl-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nifs-red opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-nifs-red" />
          </span>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-white">
            Hiring Now
          </span>
        </div>

        <div
          className="relative flex-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, #000 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, #000 90%, transparent 100%)",
          }}
        >
          <div className="animate-marquee flex w-max items-center gap-8">
            {items.map((job, i) => (
              <Link
                key={`${job.id}-${i}`}
                href={`/placements/jobs/${job.slug}`}
                aria-hidden={i >= openJobs.length}
                className="flex shrink-0 items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-nifs-red"
              >
                {tickerLabel(job)}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
