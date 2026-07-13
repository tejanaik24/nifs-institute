// Real content recovered from nifsindia.net's homepage 6-tab widget
// (raw HTML, fetched 2026-07-13). "NIFS Updates" and "Jobs" use real
// internal sources (the announcement strings already used in the site-wide
// ticker, and the live `awsm_job_openings` REST API respectively — see
// job-openings.ts). Articles/Events/Journals/Industrial Works are honest
// replicas of the old site's own behavior: they linked out to an external
// Blogspot blog or a legacy static page, so this does too, rather than
// inventing internal content that never existed.

export type UpdateLink = {
  title: string;
  href: string;
  external?: boolean;
};

export const updatesTabs = {
  updates: [
    "Admissions Open for Diploma / PG Diploma / Degree / PG and International Courses on Fire and Industrial Safety, Construction Safety, Health Safety and Environment, SBTET — Education Loan available for all Courses",
    "NIFS offering certification in Defensive Driving Training recognized by Govt of Andhra Pradesh",
  ] as string[],
  articles: [
    { title: "Safety is not determined by the absence of accidents, but defined by being vigilant and conscious", href: "https://nifs-india.blogspot.com/2021/12/safety-is-not-determined-by-absence-of.html", external: true },
    { title: "Employee Compensation Act 1923 (also called Workmen Compensation Act 1923)", href: "https://nifs-india.blogspot.com/2021/12/employee-compensation-act-1923-also.html", external: true },
    { title: "COSHH (Control of Substances Hazardous to Health) Regulations, 2002", href: "https://nifs-india.blogspot.com/2021/11/coshh-control-of-substances-hazardous.html", external: true },
    { title: "A Note on Contract Labour Act 1970", href: "https://nifs-india.blogspot.com/2021/08/a-note-on-contract-labour-act-1970.html", external: true },
  ] as UpdateLink[],
  events: [
    { title: "Webinar on Rigging Safety with OSHA Regulations & Standards by Mr. Murali Krishna — Guest Faculty, NIFS (16th Oct 2020)", href: "https://forms.gle/SDwjKWeZpNB9keNq6", external: true },
    { title: "50th National Safety Day — Blood Donation Camp (4th Mar 2021)", href: "", external: false },
  ] as UpdateLink[],
  journals: [
    { title: "Vizag Gas Leak — A Case Study on the Uncontrolled Styrene Vapour Release for the First Time in India", href: "https://nifs-india.blogspot.com/2020/08/vizag-gas-leak-case-study-on.html", external: true },
    { title: "Silicosis — A Major Occupational Health Problem in the Indian Construction Sector", href: "https://nifs-india.blogspot.com/2020/08/silicosis-major-occupational-health.html", external: true },
    { title: "“Health Hazards of Modern Living — A Perspective Study”", href: "https://nifs-india.blogspot.com/2020/07/health-hazards-of-modern-living.html", external: true },
    { title: "COVID-19 — A Boon for Environment", href: "https://nifs-india.blogspot.com/2020/07/covid-19-boon-for-environment-journal.html", external: true },
  ] as UpdateLink[],
  industrialWorks: [
    { title: "Online Corporate Training, Safety Training and Manpower Supply for Industries", href: "/industrial-services", external: false },
  ] as UpdateLink[],
};
