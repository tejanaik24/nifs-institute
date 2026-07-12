export type Division = {
  eyebrow: string;
  name: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  photoLeft: string;
  photoRight: string;
};

export const divisions: Division[] = [
  {
    eyebrow: "Division 01.",
    name: "Academic Training",
    description:
      "Smart classrooms, expert faculty, and industry-aligned curriculum building the next generation of safety professionals.",
    ctaLabel: "Explore Courses →",
    ctaHref: "/courses",
    photoLeft: "/images/classroom-lecture.jpg",
    photoRight: "/images/courses-classroom.png",
  },
  {
    eyebrow: "Division 02.",
    name: "Industrial Projects",
    description:
      "On-site consulting and risk assessment at India's top industrial facilities — real-world experience for every candidate.",
    ctaLabel: "Industrial Services →",
    ctaHref: "/industrial-services",
    photoLeft: "/images/control-room-risk-assessment.jpg",
    photoRight: "/images/corporate-training-onsite.jpg",
  },
];
