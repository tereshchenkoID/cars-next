import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    nextScriptWorkers: true,
  },
  // For test remove after
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 576, 768, 992, 1280],
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.alpha-analytics.cz',
        port: '',
        pathname: '/get/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.alpha-analytics.cz',
        port: '',
        pathname: '/resize/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.alpha-analytics.cz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'auto.oddsbit.io',
        port: '',
        pathname: '/_next/**',
      },
      {
        protocol: 'https',
        hostname: 'carvago.com',
        port: '',
        pathname: '/_next/**',
      }
    ],
  },
  webpack(config, options) {
    return config;
  },
  reactStrictMode: true
};

export default withNextIntl(nextConfig);
