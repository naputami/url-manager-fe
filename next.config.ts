import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["url-manager.cloud", "localhost:3000"]
    }
  }
};

export default nextConfig;
