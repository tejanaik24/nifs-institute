import { redirect } from "next/navigation";

// On cPanel, public/.htaccess internally rewrites "/" to serve
// homepage.html without changing the URL. This redirect only matters
// on hosts (like Vercel) that don't read .htaccess.
export default function HomePage() {
  redirect("/homepage.html");
}
