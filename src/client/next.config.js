/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  distDir: '../../.next',
  env: {
    NEXT_PUBLIC_ROOT_URL: process.env.ROOT_URL,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
};
