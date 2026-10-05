import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Sets the root directory explicitly to the current folder
    root: path.join(__dirname), 
  },
};

export default nextConfig;
