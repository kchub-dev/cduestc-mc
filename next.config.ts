import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "q1.qlogo.cn",
      },
      {
        protocol: "http",
        hostname: "q1.qlogo.cn",
      },
      {
        protocol: "https",
        hostname: "tietu.mclists.cn",
      },
    ],
  },
};

export default nextConfig;
