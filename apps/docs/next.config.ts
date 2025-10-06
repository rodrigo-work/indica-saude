import { config as baseConfig, withAnalyzer } from '@workspace/next-config'
import { createMDX } from 'fumadocs-mdx/next'
// import { withLogging } from '@repo/observability/next-config'
import type { NextConfig } from 'next'
import { env } from '@/env'

const withMDX = createMDX()

const transpilePackages = [
  '@workspace/seo',
  '@workspace/next-config',
  '@workspace/typescript-config'
]

// Base config
let nextConfig: NextConfig = {
  ...baseConfig,

  reactStrictMode: true,

  transpilePackages,

  experimental: {
    authInterrupts: true
  },

  async redirects() {
    return [
      {
        source: '/health(z)?',
        destination: '/api/health',
        permanent: false
      },
      {
        source: '/legal/privacy(-policy)?',
        destination: '/privacy',
        permanent: false
      },
      {
        source: '/admin',
        destination: '/admin/index.html#/',
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

// nextConfig = withLogging(nextConfig)

nextConfig = withMDX(nextConfig)

export default nextConfig
