// @/next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Creates a minimal production server bundle for Ubuntu deployment.
  output: "standalone",

  reactStrictMode: true,

  // Avoid advertising the framework in response headers.
  poweredByHeader: false,

  // Let Next.js optimize images at runtime.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;