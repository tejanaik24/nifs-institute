// Limited logins that may only open specific dashboard pages (enforced in
// middleware.ts; the sidebar hides everything else). Other roles: no limit.
export const ROLE_PAGES: Record<string, string[]> = {
  leads: ["/dashboard/enquiries"], // callback leads only
  freecourse: ["/dashboard/free-course-leads"], // free course leads only
};
