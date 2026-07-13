// Real, live job listings pulled from nifsindia.net's public WordPress REST
// API (`/wp-json/wp/v2/awsm_job_openings`) — manpower-consultancy postings
// (Safety Executive roles), not internal NIFS HR jobs. Snapshot taken
// 2026-07-13; re-fetch periodically to keep current, this isn't wired to
// live-refresh automatically.

export type JobOpening = {
  title: string;
  date: string;
  link: string;
  salary: string;
};

export const jobOpenings: JobOpening[] = [
  { title: "Immediate requirement for Safety Executive", date: "2025-05-14", link: "https://www.nifsindia.net/jobs/immediate-requirement-for-safety-executive-052025-897/", salary: "23K-29K CTC" },
  { title: "Immediate requirement for Safety Executive in Tamil Nadu", date: "2025-05-14", link: "https://www.nifsindia.net/jobs/immediate-requirement-for-safety-executive-in-tamil-nadu-052025-894/", salary: "Contact for details" },
  { title: "Immediate requirement for Safety Executive in Guntur", date: "2025-01-20", link: "https://www.nifsindia.net/jobs/immediate-requirement-for-safety-executive-in-guntur-012025-822-3/", salary: "25K-27K (incl. allowances) per month" },
  { title: "Immediate requirement for Safety Executive in Bangalore", date: "2025-01-20", link: "https://www.nifsindia.net/jobs/immediate-requirement-for-safety-executive-in-guntur-012025-822-2/", salary: "25K-27K (incl. allowances) per month" },
  { title: "Immediate requirement for Safety Executive in Vijayawada", date: "2025-01-20", link: "https://www.nifsindia.net/jobs/immediate-requirement-for-safety-executive-in-vijayawada-012025-822-2/", salary: "25K-27K (incl. allowances) per month" },
  { title: "Immediate requirement for Safety Executive in Chennai", date: "2025-01-20", link: "https://www.nifsindia.net/jobs/immediate-requirement-for-safety-executive-in-chennai-012025-822-2/", salary: "25K-27K (incl. allowances) per month" },
];
