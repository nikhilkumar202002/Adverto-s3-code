import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile GSAP for compatibility
  transpilePackages: ["gsap"],
  // Generate a deployable static site in the `out` directory.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adverto.jinskadamthodu2k15.workers.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-e7450afec95f428391514b56cd3e9428.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "jinskadamthodu-410139137516-eu-north-1-an.s3.eu-north-1.amazonaws.com",
        pathname: "/adverto/**",
      },
    ],
    qualities: [72, 75],
  },
};

export default nextConfig;
