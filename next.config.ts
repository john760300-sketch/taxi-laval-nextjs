import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false, // Official URLs without trailing slash
  // Old URL redirects will be added in a later commit
};

export default nextConfig;
