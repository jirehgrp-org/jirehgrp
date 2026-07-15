// @/components/OrganizationJsonLd.tsx

import { siteConfig } from "@/lib/site";
import type { SiteLanguage } from "@/content/home";

export default function OrganizationJsonLd({
  language,
}: {
  language: SiteLanguage;
}) {
  const locale = siteConfig.locales[language];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: siteConfig.logo,
        },
        description: locale.description,
        email: siteConfig.contact.salesEmail,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressCountry: siteConfig.location.countryCode,
        },
        areaServed: ["Ethiopia", "Africa"],
        knowsAbout: [
          "Enterprise resource planning",
          "Business management systems",
          "Internal software platforms",
          "Workflow automation",
          "Custom software development",
          "Web application development",
          "Mobile application development",
          "Data analytics and reporting",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        description: locale.description,
        inLanguage: locale.language,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
