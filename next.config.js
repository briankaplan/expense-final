const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  },
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['pub-91e5050716e3427f88fd198e728b5a18.r2.dev'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8787/api/:path*',
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  }
};

module.exports = nextConfig; 