/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "http://4.213.57.100:3100/api/:path*",
      },
    ];
  },
};

export default nextConfig;
