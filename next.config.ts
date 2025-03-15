import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
