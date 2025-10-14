import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Explicitly set turbopack.root at the top-level to avoid Next.js inferring the wrong workspace root
  // Use an absolute path so Turbopack picks the correct project directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
