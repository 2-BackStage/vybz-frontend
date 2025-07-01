import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["vybz.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
