// @/components/proforma/ProformaFormLoader.tsx

"use client";
import dynamic from "next/dynamic";

const ProformaForm = dynamic(
  () =>
    import("@/components/proforma/ProformaForm").then((m) => m.ProformaForm),
  {
    ssr: false,
    loading: () => <p style={{ padding: "64px 24px" }}>Loading…</p>,
  },
);

export default function ProformaFormLoader() {
  return <ProformaForm />;
}