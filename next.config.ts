import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use Webpack for production builds (stable)
  // Turbopack is used in dev via `next dev --turbopack` in package.json

  // Enable styled-components support
  compiler: {
    styledComponents: true,
  },

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // Experimental features (stable ones only for production)
  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap'],
  },
};

export default nextConfig;
