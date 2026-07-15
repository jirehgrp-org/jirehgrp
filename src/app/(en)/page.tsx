// @/app/(en)/page.tsx

import type { Metadata } from "next";

import HomePage from "@/components/HomePage";
import { homeDictionaries } from "@/content/home";
import { siteConfig } from "@/lib/site";

const en = siteConfig.locales.en;

export const metadata: Metadata = {
  title: {
    absolute: en.title,
  },

  description: en.description,
  keywords: [...en.keywords],

  alternates: {
    canonical: "/",

    languages: {
      en: "/",
      am: "/am",
      "x-default": "/",
    },
  },

  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: en.locale,
    alternateLocale: [siteConfig.locales.am.locale],
    title: en.title,
    description: en.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Jireh Group ERP, internal platforms, and custom software",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: en.title,
    description: en.description,
    images: [siteConfig.ogImage],
  },
};

export default function EnglishHomePage() {
  return (
    <HomePage
      language="en"
      copy={homeDictionaries.en}
    />
  );
}