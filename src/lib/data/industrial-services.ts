export type IndustrialService = {
  id: string;
  title: string;
  body: string;
  slot: string;
};

export const industrialServices: IndustrialService[] = [
  {
    id: "in-house-training",
    title: "In-House Trainings",
    body: "On-site fire and industrial safety training delivered directly at your facility, tailored to your specific hazard profile and workforce.",
    slot: "corporate-training-onsite.jpg",
  },
  {
    id: "corporate-training",
    title: "Corporate Trainings",
    body: "Structured EHS training programs for corporate teams — from induction-level safety awareness to advanced hazard management for supervisors.",
    slot: "control-room-risk-assessment.jpg",
  },
  {
    id: "safety-audits",
    title: "Safety Training & Audits",
    body: "Independent safety audits and compliance reviews conducted by certified assessors, benchmarked against ISO and national safety standards.",
    slot: "course-card-industrial-safety.jpg",
  },
  {
    id: "manpower-consultancy",
    title: "Manpower Consultancy",
    body: "Sourcing trained, certified safety personnel for your plant or project — drawn from our own graduate pipeline and placement network.",
    slot: "gallery-industrial-visit.jpg",
  },
];
