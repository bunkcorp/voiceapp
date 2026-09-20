import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep formula-sheet markdown available to the Node knowledge API on Vercel.
  outputFileTracingIncludes: {
    "/api/knowledge/tool": ["./docs/formula-sheets/**/*"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "microphone=(self), camera=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
