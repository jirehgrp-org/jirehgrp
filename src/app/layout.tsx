// @/app/layout.tsx

import { Providers } from "./providers";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";
import type { Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const entoto = localFont({
  src: "../../public/fonts/entoto.ttf",
  variable: "--font-entoto",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F0E3" },
    { media: "(prefers-color-scheme: dark)", color: "#1F1F1F" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jirehgrp.com"),
  title: "JirehGroup — Software, AI, Research, and Innovation",
  description:
    "JirehGroup drives innovation through expert software development, cutting-edge AI solutions, in-depth research, and a wide range of technology services. We’re committed to excellence and contribute to the tech community through open-source projects and public resources.",
  authors: [{ name: "JirehGroup", url: "https://jirehgrp.com" }],
  creator: "JirehGroup Engineering",
  publisher: "JirehGroup",
  keywords: [
    "JirehGroup",
    "Jireh Group",
    "jireh group",
    "software development",
    "AI solutions",
    "technology services",
    "research",
    "open source",
    "Next.js",
    "Tailwind",
    "React",
    "shadcn/ui",
  ],
  openGraph: {
    title: "JirehGroup — Software, AI, Research, and Innovation",
    description:
      "Explore JirehGroup’s work in software, AI, and research. We build scalable tech solutions and contribute to the open-source ecosystem.",
    url: "https://jirehgrp.com",
    siteName: "JirehGroup",
    images: [
      {
        url: "https://jirehgrp.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JirehGroup Open Graph Image",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('jireh-theme') === 'dark' || 
                    (!localStorage.getItem('jireh-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} ${entoto.variable} font-mono antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}