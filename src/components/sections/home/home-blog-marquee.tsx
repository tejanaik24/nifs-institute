const POSTS = [
  {
    href: "/blog/nifs-india-achieves-milestone-collaboration-with-acharya-nagarjuna-university",
    img: "/images/blog/nifs-india-achieves-milestone-collaboration-with-acharya-nagarjuna-university-65.jpeg",
    alt: "NIFS ANU",
    date: "July 31",
    badge: "bg-nifs-red",
    title: "NIFS India Achieves Milestone Collaboration with Acharya Nagarjuna University",
    desc: "Landmark collaboration for advanced certifications in fire and safety education.",
    read: "text-nifs-red",
  },
  {
    href: "/blog/pdis-course-eligibility-criteria-based-on-academic-and-work-background",
    img: "/images/blog/pdis-course-eligibility-criteria-based-on-academic-and-work-background-1.jpg",
    alt: "PDIS Eligibility",
    date: "July 28",
    badge: "bg-[#157a17]",
    title: "PDIS Course Eligibility Criteria Based on Academic and Work Background",
    desc: "Detailed eligibility requirements for the Post Diploma in Industrial Safety.",
    read: "text-[#157a17]",
  },
  {
    href: "/blog/what-you-can-learn-in-6-to-12-months-of-safety-officer-course-training",
    img: "/images/blog/what-you-can-learn-in-6-to-12-months-of-safety-officer-course-training-2.jpg",
    alt: "Safety Officer Training",
    date: "July 26",
    badge: "bg-nifs-orange",
    title: "What You Can Learn in 6 to 12 Months of Safety Officer Course Training",
    desc: "Skills, certifications, and career outcomes from short-term safety programs.",
    read: "text-nifs-orange",
  },
  {
    href: "/blog/how-to-choose-a-credible-industrial-safety-online-course-with-practical-training",
    img: "/images/blog/how-to-choose-a-credible-industrial-safety-online-course-with-practical-training-3.jpg",
    alt: "Online Safety Course",
    date: "July 26",
    badge: "bg-nifs-red",
    title: "How to Choose a Credible Industrial Safety Online Course with Practical Training",
    desc: "Key factors: accreditations, hands-on drills, placement support.",
    read: "text-nifs-red",
  },
  {
    href: "/blog/advantages-of-studying-industrial-safety-from-a-government-recognized-institute",
    img: "/images/blog/advantages-of-studying-industrial-safety-from-a-government-recognized-institute-4.jpg",
    alt: "Govt Recognized",
    date: "July 26",
    badge: "bg-[#157a17]",
    title: "Advantages of Studying Industrial Safety from a Government-Recognized Institute",
    desc: "Why govt-approved certifications matter for India, Gulf, and global markets.",
    read: "text-[#157a17]",
  },
];

export default function HomeBlogMarquee() {
  const loop = [...POSTS, ...POSTS];

  return (
    <section className="w-full py-[90px] max-lg:py-[60px] bg-white flex justify-center items-center flex-col overflow-hidden">
      <div className="w-[90%] max-sm:w-[95%] flex flex-col gap-10 items-center">
        <div className="text-center w-full">
          <span className="font-sans text-nifs-red text-xs font-bold uppercase tracking-[4px]">Articles &amp; Insights</span>
          <h2 className="font-sans text-gray-900 text-[2.8vw] max-lg:text-[5vw] max-sm:text-[26px] font-black leading-tight mt-2 break-words">
            What&apos;s Happening
            <br />
            <span className="font-display italic">At NIFS</span>
          </h2>
          <p className="font-sans text-gray-600 text-[14px] mt-3">Latest blogs, stories, and updates — hover to pause</p>
        </div>

        <div className="home-blog-wrap w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="home-blog-track">
            {loop.map((post, i) => (
              <a
                key={`${post.href}-${i}`}
                href={post.href}
                target="_blank"
                className="w-[320px] flex-shrink-0 bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col hover:shadow-[0_8px_40px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-full h-[180px] overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={post.img} alt={post.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute top-3 left-3 ${post.badge} text-white font-sans text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full`}>{post.date}</div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-sans text-[14px] font-bold text-gray-900 leading-snug line-clamp-2">{post.title}</h3>
                  <p className="font-sans text-gray-600 text-[12px] mt-2 line-clamp-2 leading-relaxed">{post.desc}</p>
                  <span className={`font-sans ${post.read} font-bold text-[12px] mt-auto pt-3 block group-hover:translate-x-1 transition-transform`}>Read More →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
