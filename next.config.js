/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
