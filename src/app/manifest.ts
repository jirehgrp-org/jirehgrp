// @/app/manifest.ts

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.name,
    short_name: "Jireh",
    description: siteConfig.description,

    start_url: "/",
    scope: "/",

    display: "standalone",
    orientation: "any",

    background_color: "#0a0b0b",
    theme_color: "#0a0b0b",

    categories: ["business", "technology", "productivity"],

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}