// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  // optional but useful if you ever deploy in subfolders
  // basePath: "",
  // assetPrefix: "",
};

export default nextConfig;