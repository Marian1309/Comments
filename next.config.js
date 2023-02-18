/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: []
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
  trailingSlash: false,

  modularizeImports: {
    react: {
      transform: 'react/{{ lowerCase member }}',
      skipDefaultConversion: true
    },
    next: {
      transform: 'next/{{ lowerCase member }}',
      skipDefaultConversion: true
    }
  }
}

module.exports = nextConfig
