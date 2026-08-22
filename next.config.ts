import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',          // ← مهم
  images: {
    unoptimized: true,
  },
  basePath: '/task-manager', // ← اسم مخزن
  assetPrefix: '/task-manager',
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;