import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'k.kakaocdn.net',
      'vybz.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  experimental: {
    viewTransition: true,
  },
};

export default bundleAnalyzer(nextConfig);
