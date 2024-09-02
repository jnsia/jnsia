/** @type {import('next').NextConfig} */

import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig = {
  // reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'universe',
        remotes: {
          devlog: `devlog@http://localhost:5173/dist/assets/remoteEntry.js`
        },
        filename: 'remoteEntry.js',
        exposes: {
          './index': './pages/index.tsx'
        },
        extraOptions: {
          debug: false, // `false` by default
          exposePages: false, // `false` by default
        },
        shared: {},
      })
    );

    return config;
  },
};

export default nextConfig;
