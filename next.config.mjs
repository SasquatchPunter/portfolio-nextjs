const basePath = process.env.NEXT_BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath,
  output: "export",
};

export default nextConfig;
