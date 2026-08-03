// @/app/(en)/proforma/page.tsx

import type { Metadata } from "next";
import ProformaFormLoader from "@/components/proforma/ProformaFormLoader";

export const metadata: Metadata = {
  title: "Proforma generator — Jirehgrp",
  robots: { index: false, follow: false },
};

export default function ProformaPage() {
  return <ProformaFormLoader />;
}