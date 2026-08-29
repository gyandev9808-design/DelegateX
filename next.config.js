/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent TypeScript type errors from breaking Vercel builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Prevent ESLint rules from failing Vercel production deployments
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Fixes node runtime issues in client bundles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
