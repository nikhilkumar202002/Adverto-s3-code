import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile GSAP for compatibility
  transpilePackages: ["gsap"],
  // Export static HTML to `out/` when building
  output: "export",
  // Disable Image Optimization for static export
  images: {
    unoptimized: true,
    remotePatterns: [
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
