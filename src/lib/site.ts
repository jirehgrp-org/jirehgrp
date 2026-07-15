// @/lib/site.ts

const SITE_URL = "https://jirehgrp.com";

const locales = {
  en: {
    language: "en",
    locale: "en_ET",
    path: "/",

    title: "Jireh Group — ERP, Internal Platforms & Custom Software",

    description:
      "Jireh Group designs ERP solutions, internal business platforms, automation tools, and custom software for growing organisations in Ethiopia and beyond.",

    keywords: [
      "ERP solutions Ethiopia",
      "ERP development Addis Ababa",
      "business software Ethiopia",
      "enterprise software company Ethiopia",
      "custom software development Ethiopia",
      "internal business platforms",
      "business management systems",
      "workflow automation Ethiopia",
      "dashboard development Ethiopia",
      "inventory management software Ethiopia",
      "point of sale software Ethiopia",
      "digital transformation Ethiopia",
      "software company Addis Ababa",
    ],
  },

  am: {
    language: "am",
    locale: "am_ET",
    path: "/am",

    title: "ጃይረ ግሩፕ — ERP፣ የንግድ ስርዓቶች እና በትእዛዝ የተሰራ ሶፍትዌር",

    description:
      "ጃይረ ግሩፕ ለኢትዮጵያ እና ለአፍሪካ ድርጅቶች ERP ስርዓቶች፣ የንግድ ማኔጅመንት ፕላትፎርሞች፣ አውቶሜሽን እና በትእዛዝ የተሰራ ሶፍትዌር ይገነባል።",

    keywords: [
      "ERP ሶፍትዌር ኢትዮጵያ",
      "የንግድ ማኔጅመንት ሲስተም",
      "በትእዛዝ የተሰራ ሶፍትዌር ኢትዮጵያ",
      "የሶፍትዌር ኩባንያ አዲስ አበባ",
      "የክምችት ማኔጅመንት ሶፍትዌር",
      "የሽያጭ እና POS ሲስተም",
      "የንግድ አውቶሜሽን",
      "የድርጅት ERP ሲስተም",
    ],
  },
} as const;

export const siteConfig = {
  name: "Jireh Group",
  alternateName: "Jirehgrp",

  domain: "jirehgrp.com",
  url: SITE_URL,

  creator: "Jireh Group",

  logo: `${SITE_URL}/logo.png`,
  ogImage: `${SITE_URL}/opengraph-image`,

  /*
   * Default English aliases.
   *
   * These preserve compatibility with global files such as:
   * - manifest.ts
   * - opengraph-image.tsx
   * - structured data
   */
  title: locales.en.title,
  description: locales.en.description,
  keywords: locales.en.keywords,
  language: locales.en.language,
  locale: locales.en.locale,

  contact: {
    generalEmail: "hello@jirehgrp.com",
    salesEmail: "sales@jirehgrp.com",
    supportEmail: "support@jirehgrp.com",
  },

  location: {
    city: "Addis Ababa",
    country: "Ethiopia",
    countryCode: "ET",
  },

  locales,
} as const;

export type SiteLanguage = keyof typeof siteConfig.locales;