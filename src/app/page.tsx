// @/app/page.tsx

import type { Metadata } from "next";
import SentinelCursor from "@/components/SentinelCursor";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import FeaturedWork from "@/components/sections/FeaturedWork";
import { siteConfig } from "@/lib/site";
import ScrollMotion from "@/components/ScrollMotion";

export const metadata: Metadata = {
  title: siteConfig.title,
  description:
    "Jirehgrp builds ERP solutions, business software, enterprise systems, and digital platforms for modern businesses.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description:
      "ERP solutions, business software, enterprise systems, and digital platforms for growing businesses.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Jirehgrp ERP solutions, business systems, and digital platforms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description:
      "ERP solutions, business software, enterprise systems, and digital platforms for growing businesses.",
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
        logo: `${siteConfig.url}/logo.png`,
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
          "Jirehgrp delivers ERP solutions, business software, enterprise systems, automation, and digital platforms.",
        provider: {
          "@id": `${siteConfig.url}/#organization`,
        },
        areaServed: ["Ethiopia", "Africa", "Worldwide"],
        serviceType: [
          "ERP solutions",
          "Business systems development",
          "Enterprise software development",
          "Workflow automation",
          "Dashboard and reporting systems",
          "Digital platform development",
          "System integration",
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
      <ScrollReveal />
      <ScrollMotion />
      <Navbar />

      <main className="site-main">
        <Hero />
        <Stats />
        <Services />
        <Industries />
        <FeaturedWork />
        <Process />
        <About />
        <CTA />
        <Contact />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <span>© 2026 Jirehgrp</span>
          <span>Addis Ababa · Africa &amp; Beyond</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}