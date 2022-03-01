module.exports = {
  distDir: '../../.next',
  env: {
    NEXT_PUBLIC_ROOT_URL: process.env.ROOT_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
};
