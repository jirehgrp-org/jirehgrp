import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const am = siteConfig.locales.am;

export const metadata: Metadata = {
  title: "ፕሮጀክት ይጀምሩ",
  description:
    "የሶፍትዌር ፕሮጀክትዎን፣ የንግድ ፍላጎቶችን፣ የጊዜ እቅድን፣ ኢንተግሬሽኖችን እና በጀትን ለJireh Group ያጋሩ።",
  alternates: {
    canonical: "/am/start",
    languages: {
      en: "/start",
      am: "/am/start",
      "x-default": "/start",
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/am/start`,
    siteName: "ጃይረ ግሩፕ",
    locale: am.locale,
    alternateLocale: [siteConfig.locales.en.locale],
    title: "ፕሮጀክት ይጀምሩ — ጃይረ ግሩፕ",
    description:
      "የፕሮጀክትዎን ግብ፣ የሚያስፈልጉ ስርዓቶችን፣ ኢንተግሬሽኖችን፣ የጊዜ እቅድን እና የበጀት ክልልን ያጋሩ።",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "ከJireh Group ጋር የሶፍትዌር ፕሮጀክት ይጀምሩ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ፕሮጀክት ይጀምሩ — ጃይረ ግሩፕ",
    description:
      "የፕሮጀክትዎን ግብ፣ የጊዜ እቅድን እና የበጀት ክልልን ለJireh Group ያጋሩ።",
    images: [siteConfig.ogImage],
  },
};

export default function AmharicStartProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
