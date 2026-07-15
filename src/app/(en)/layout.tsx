// @/app/(en)/layout.tsx

import type { Metadata, Viewport } from "next";
import "../globals.css";

import { SitePreferencesProvider } from "@/components/providers/SitePreferencesProvider";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";

const en = siteConfig.locales.en;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: en.title,
    template: `%s — ${siteConfig.name}`,
  },

  description: en.description,
  keywords: [...en.keywords],

  applicationName: siteConfig.name,
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
        alt: "Jireh Group ERP, business platforms, and custom software",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: en.title,
    description: en.description,
    images: [
      {
        url: siteConfig.ogImage,
        alt: "Jireh Group ERP, business platforms, and custom software",
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

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={en.language} suppressHydrationWarning className={fontVariables}>
      <body suppressHydrationWarning>
        <SitePreferencesProvider>{children}</SitePreferencesProvider>
      </body>
    </html>
  );
}
