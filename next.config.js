/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  },
  compiler: {
    removeConsole: {
      exclude: ['log', 'warn', 'error']
    }
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  trailingSlash: false
}

module.exports = nextConfig
