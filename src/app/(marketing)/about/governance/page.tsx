import type { Metadata } from "next";
import GovernanceClient from "./governance-client";

export const metadata: Metadata = {
  title: "NIFS Governance — Board of Advisors & Leadership | NIFS India",
  description:
    "Meet the 9-member Board of Advisors guiding NIFS across academics, legal, health, and industrial safety, plus the organizational structure behind NIFS training centers nationwide.",
  alternates: { canonical: "/about/governance/" },
};

export default function GovernancePage() {
  return <GovernanceClient />;
}
