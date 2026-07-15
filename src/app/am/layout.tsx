// @/app/am/layout.tsx

import type { Metadata, Viewport } from "next";
import "../globals.css";

import { SitePreferencesProvider } from "@/components/providers/SitePreferencesProvider";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";

const am = siteConfig.locales.am;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: am.title,
    template: `%s — ጃይረ ግሩፕ`,
  },

  description: am.description,
  keywords: [...am.keywords],

  applicationName: "ጃይረ ግሩፕ",
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
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
    images: [
      {
        url: siteConfig.ogImage,
        alt: "ጃይረ ግሩፕ ERP፣ የንግድ ስርዓቶች እና በትእዛዝ የተሰራ ሶፍትዌር",
      },
    ],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],

    shortcut: "/favicon.ico",

    apple: [
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0b0b",
  colorScheme: "dark",
};

export default function AmharicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={am.language} suppressHydrationWarning className={fontVariables}>
      <body suppressHydrationWarning>
        <SitePreferencesProvider>{children}</SitePreferencesProvider>
      </body>
    </html>
  );
}
