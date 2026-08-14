import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains:['googleapis.comundefined'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;