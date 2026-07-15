// @/lib/fonts.ts

import localFont from "next/font/local";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const entoto = localFont({
  src: "../../public/fonts/entoto.ttf",
  variable: "--font-entoto",
  display: "swap",
  style: "normal",
  weight: "400",
  fallback: ["Arial", "sans-serif"],
});

export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  bricolage.variable,
  entoto.variable,
].join(" ");