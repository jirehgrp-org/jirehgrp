// @/app/legal/layout.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Documentations | JirehDashboard",
};

export default function legalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
