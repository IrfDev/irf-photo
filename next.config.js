/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  images: {
    disableStaticImages: true,
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
    const shaderLoader = {
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: [{ loader: "ts-shader-loader", options: {} }],
    };

    config.module.rules.push(shaderLoader);

    const fileLoader = {
      test: /\.(png|jpeg|jpg|gif)$/i,

      use: [
        {
          loader: "file-loader",

          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    };

    config.module.rules.push(fileLoader);

    return {
      ...config,
    };
  },
};

module.exports = nextConfig;
