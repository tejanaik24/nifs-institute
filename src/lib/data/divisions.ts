export type Division = {
  eyebrow: string;
  name: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  photoLeft: string;
  photoRight: string;
  photoCaption: string;
};

export const divisions: Division[] = [
  {
    eyebrow: "Division 01.",
    name: "Academic Training",
    description:
      "Smart classrooms, expert faculty, and an industry-aligned curriculum that builds the next generation of safety professionals. Every course is designed around real-world competency, not theory.",
    bullets: [
      "AC classrooms with smart-class projection systems",
      "Curriculum audited against NSDC and ISO frameworks",
      "Faculty drawn from working safety officers, not just lecturers",
      "Certification recognized across NIFS's placement network",
    ],
    ctaLabel: "Explore Courses →",
    ctaHref: "/courses",
    photoLeft: "/images/classroom-lecture.jpg",
    photoRight: "/images/courses-classroom.png",
    photoCaption: "Classroom & Faculty",
  },
  {
    eyebrow: "Division 02.",
    name: "Industrial Projects",
    description:
      "On-site consulting and risk assessment at India's top industrial facilities. Candidates work alongside experienced professionals on live projects — gaining the field hours that employers actually look for.",
    bullets: [
      "Hands-on plant-floor audits under live industry supervision",
      "Direct placement pipeline with Adani, L&T, GMR, ITC and more",
      "Real hazard-identification and risk-assessment fieldwork",
      "Dedicated placement cell tracking outcomes for every graduate",
    ],
    ctaLabel: "Industrial Services →",
    ctaHref: "/industrial-services",
    photoLeft: "/images/control-room-risk-assessment.jpg",
    photoRight: "/images/corporate-training-onsite.jpg",
    photoCaption: "Site Projects",
  },
];
