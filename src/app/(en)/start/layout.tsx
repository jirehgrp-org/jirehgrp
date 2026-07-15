import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell Jireh Group about your software project, business requirements, timeline, integrations, and budget. Submit a detailed project brief to our team.",
  alternates: {
    canonical: "/start",
    languages: {
      en: "/start",
      am: "/am/start",
      "x-default": "/start",
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/start`,
    siteName: siteConfig.name,
    locale: siteConfig.locales.en.locale,
    alternateLocale: [siteConfig.locales.am.locale],
    title: `Start a Project — ${siteConfig.name}`,
    description:
      "Share your project goals, required systems, integrations, timeline, and investment range with the Jireh Group team.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Start a software project with Jireh Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Start a Project — ${siteConfig.name}`,
    description:
      "Share your project goals, required systems, integrations, timeline, and investment range with the Jireh Group team.",
    images: [siteConfig.ogImage],
  },
};

export default function StartProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
