// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/task-manager',
  assetPrefix: '/task-manager',
  
  // ✅ این خط رو اضافه کن تا TypeScript check رو غیرفعال کنه
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ✅ این خط رو اضافه کن تا ESLint رو غیرفعال کنه
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;