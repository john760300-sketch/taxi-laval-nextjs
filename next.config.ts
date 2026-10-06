import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false, // Official URLs without trailing slash
  async rewrites() {
    return [
      // Pretty city URLs: /fr/taxi-chomedey → /fr/ville/chomedey
      { source: "/fr/taxi-:ville", destination: "/fr/ville/:ville" },
      { source: "/en/taxi-:city", destination: "/en/city/:city" },
    ];
  },
  // Old URL redirects will be added in a later commit
};

export default nextConfig;
