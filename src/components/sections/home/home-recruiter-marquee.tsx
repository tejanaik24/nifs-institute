import { recruiterLogos } from "@/lib/data/centers";
import { LogoMarquee } from "../logo-marquee";

export default function HomeRecruiterMarquee() {
  return (
    <section className="bg-white py-8 overflow-hidden border-y border-gray-100">
      <LogoMarquee items={recruiterLogos} />
    </section>
  );
}
