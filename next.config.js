/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    remotePatterns: [{ hostname: "cdn.sanity.io" }]
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === "production"
  },
  eslint: {
    // Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === "production"
  },
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/api/rss"
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/rss.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
