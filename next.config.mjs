import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("src"),
    };
    return config;
  },
  images: {
    domains: ["imgur.com"],
  },
};

export default nextConfig;
