export type Facility = {
  eyebrow: string;
  name: string;
  description: string;
  photoLeft: string;
  photoRight: string;
};

export const facilities: Facility[] = [
  {
    eyebrow: "Our Spaces",
    name: "AC Classrooms & Smart Labs",
    description:
      "Air-conditioned lecture halls with smart-classroom technology, projector systems, and dedicated safety simulation labs.",
    photoLeft: "/images/courses-classroom.png",
    photoRight: "/images/classroom-lecture.jpg",
  },
  {
    eyebrow: "Our Spaces",
    name: "Conference & Training Halls",
    description:
      "Full-scale conference facilities for seminars, guest lectures, and industry collaboration events.",
    photoLeft: "/images/hostel-facility.jpg",
    photoRight: "/images/gallery-industrial-visit.jpg",
  },
];

export type TrainingYardSlide = {
  eyebrow: string;
  name: string;
  description: string;
  photoLeft: string;
  photoRight: string;
};

export const trainingYardSlide: TrainingYardSlide = {
  eyebrow: "Hands-On",
  name: "Practical Training Yard",
  description:
    "Live fire suppression drills, hazard identification scenarios, and emergency response simulations on purpose-built training grounds.",
  photoLeft: "/images/training-yard-drill.jpg",
  photoRight: "/images/training-drill.png",
};

export type ProofSlide = {
  eyebrow: string;
  headline: string;
  description: string;
  photoLeft: string;
  photoRight: string;
};

export const proofSlide: ProofSlide = {
  eyebrow: "Outcomes",
  headline: "45,000 Candidates Placed",
  description:
    "Two decades of proven career outcomes across India's leading industrial and infrastructure companies.",
  photoLeft: "/images/placement-female.png",
  photoRight: "/images/placement-male-1.png",
};
