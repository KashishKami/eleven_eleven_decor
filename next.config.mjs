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
  ...(process.env.NODE_ENV !== 'production'
    ? {
        async rewrites() {
          return [
            {
              source: '/manage-7f3b9x2k/uploads/:path*',
              destination: 'http://127.0.0.1:8080/manage-7f3b9x2k/uploads/:path*',
            },
            {
              source: '/uploads/:path*',
              destination: 'http://127.0.0.1:8080/manage-7f3b9x2k/uploads/:path*',
            },
          ]
        },
      }
    : {}),
}

export default nextConfig
