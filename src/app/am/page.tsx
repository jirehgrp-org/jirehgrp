// @/app/am/page.tsx

import type { Metadata } from "next";

import HomePage from "@/components/HomePage";
import { homeDictionaries } from "@/content/home";
import { siteConfig } from "@/lib/site";

const am = siteConfig.locales.am;

export const metadata: Metadata = {
  title: {
    absolute: am.title,
  },

  description: am.description,
  keywords: [...am.keywords],

  alternates: {
    canonical: am.path,

    languages: {
      en: "/",
      am: "/am",
      "x-default": "/",
    },
  },

  openGraph: {
    type: "website",
    url: `${siteConfig.url}${am.path}`,
    siteName: "ጃይረ ግሩፕ",
    locale: am.locale,
    alternateLocale: [siteConfig.locales.en.locale],
    title: am.title,
    description: am.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "ጃይረ ግሩፕ ERP፣ የንግድ ስርዓቶች እና በትእዛዝ የተሰራ ሶፍትዌር",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: am.title,
    description: am.description,
    images: [siteConfig.ogImage],
  },
};

export default function AmharicHomePage() {
  return (
    <HomePage
      language="am"
      copy={homeDictionaries.am}
    />
  );
}