import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization for external images (Supabase Storage)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dtxieqrlqzpygzlleble.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  // Redirects for old Italian URLs to new English slugs
  async redirects() {
    return [
      { source: '/it/settori', destination: '/it/sectors', permanent: true },
      { source: '/it/settori/:slug', destination: '/it/sectors/:slug', permanent: true },
      { source: '/it/prezzi', destination: '/it/pricing', permanent: true },
      { source: '/it/contatti', destination: '/it/contact', permanent: true },
      { source: '/it/casi-studio', destination: '/it/case-studies', permanent: true },
      // Also handle root Italian paths without /it prefix
      { source: '/settori', destination: '/it/sectors', permanent: true },
      { source: '/settori/:slug', destination: '/it/sectors/:slug', permanent: true },
      { source: '/prezzi', destination: '/it/pricing', permanent: true },
      { source: '/contatti', destination: '/it/contact', permanent: true },
      { source: '/casi-studio', destination: '/it/case-studies', permanent: true },
    ]
  },
};

export default withNextIntl(nextConfig);
