/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  basePath: "/F_9",
  assetPrefix: "/F_9/",
  trailingSlash: true,
  output: "export",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
