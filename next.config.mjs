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
  // next.config.js 
  webpack(config, options) {
    return config;
  },
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);