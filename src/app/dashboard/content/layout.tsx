import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session?.role !== "admin") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
