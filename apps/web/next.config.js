/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true  // Skip ESLint during build (for Docker)
  },
  typescript: {
    ignoreBuildErrors: true   // Skip TypeScript errors during build
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  }
};

module.exports = nextConfig;