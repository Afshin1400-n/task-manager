// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 🔥 اسم مخزن task-manager رو بذار
  basePath: '/task-manager',
  assetPrefix: '/task-manager',
};

export default nextConfig;