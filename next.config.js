const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
  },
  turbopack: {
      // Sets the root directory explicitly to the current folder
      root: path.join(__dirname), 
    },
};
module.exports = nextConfig;
