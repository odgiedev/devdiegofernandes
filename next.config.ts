import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/", destination: "/pt", permanent: false },
    ];
  },
};

export default nextConfig;
