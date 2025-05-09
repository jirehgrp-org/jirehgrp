import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  output: "export",
};

export default nextConfig;