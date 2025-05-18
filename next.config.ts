import type { NextConfig } from "next";

import CopyWebpackPlugin from "copy-webpack-plugin";

const nextConfig: NextConfig = {
  output: "export",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            { from: "public/sw.js", to: "service-worker.js" },
          ],
        })
      );
    }
    return config;
  },
};

export default nextConfig;
