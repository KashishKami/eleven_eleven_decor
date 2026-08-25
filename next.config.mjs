/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce static export during production build for GoDaddy,
  // while allowing live real-time dynamic post previews in dev mode!
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
