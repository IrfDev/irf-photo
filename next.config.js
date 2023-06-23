/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  eslint: false,
  experimental: { esmExternals: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.irving.suarez.digital",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      loader: "ts-shader-loader",
      options: {},
    });

    return {
      ...config,
    };
  },
};

module.exports = nextConfig;
