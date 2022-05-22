/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
