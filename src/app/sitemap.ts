import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const homeLanguages = {
  en: siteConfig.url,
  am: `${siteConfig.url}/am`,
  "x-default": siteConfig.url,
};

const startLanguages = {
  en: `${siteConfig.url}/start`,
  am: `${siteConfig.url}/am/start`,
  "x-default": `${siteConfig.url}/start`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${siteConfig.url}/am`,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${siteConfig.url}/start`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: startLanguages },
    },
    {
      url: `${siteConfig.url}/am/start`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: startLanguages },
    },
  ];
}
