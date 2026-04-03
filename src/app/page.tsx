// @/app/page.tsx

import type { Metadata } from "next";
import SentinelCursor from "@/components/SentinelCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description:
    "Jirehgrp builds custom websites, software, ERP systems, mobile apps, and digital platforms for modern businesses.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description:
      "Custom websites, business software, ERP systems, mobile apps, and digital platforms for modern businesses.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Jirehgrp custom websites, software, ERP and apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description:
      "Custom websites, business software, ERP systems, mobile apps, and digital platforms for modern businesses.",
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.png`,
        description: siteConfig.description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        url: siteConfig.url,
        description:
          "Jirehgrp builds custom websites, software, ERP systems, mobile apps, and digital platforms for modern businesses.",
        provider: {
          "@id": `${siteConfig.url}/#organization`,
        },
        areaServed: "Worldwide",
        serviceType: [
          "Custom website development",
          "Software development",
          "ERP systems",
          "Mobile app development",
          "Web application development",
          "Business software solutions",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SentinelCursor />
      <Navbar />

      <main className="snap-wrapper">
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
    </>
  );
}