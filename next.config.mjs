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
  async headers() {
    return [
      {
        source: "/Images/backgrounds/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=600, must-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["i.imgur.com", "imgur.com", "www.gravatar.com", "example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ufs.sh", 
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost",
        "test.payu.in",
        "testtxncdn.payubiz.in",
        "secure.payu.in",
        "txncdn.payu.in",
        "anokha.amrita.edu",
      ],
    },
  },
};

export default nextConfig;
