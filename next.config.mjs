/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["@neondatabase/serverless", "@prisma/adapter-neon", "@prisma/client"],
}

export default nextConfig
