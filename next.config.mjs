const basePath = process.env.NEXT_BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath,
  output: "export",

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  transpilePackages: ["react-syntax-highlighter"],
};

export default nextConfig;
