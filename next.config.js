// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The images property is correct, just update the syntax inside
  images: {
    // This is the new, recommended format
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'external-preview.redd.it',
      },
       {
        protocol: 'https',
        hostname: 'bringatrailer.com',
      },
    ],
  },
};

module.exports = nextConfig;