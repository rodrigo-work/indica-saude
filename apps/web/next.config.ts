import { config as baseConfig } from '@workspace/next-config'
import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'
import { env } from '@/env'

const withMdx = createMDX()

const transpilePackages = [
  '@workspace/ui',
  '@workspace/seo',
  '@workspace/next-config',
  '@workspace/eslint-config',
  '@workspace/typescript-config',
  '@workspace/internationalization'
]

// Base config
const nextConfig: NextConfig = {
  ...baseConfig,

  trailingSlash: true,

  transpilePackages,

  experimental: {
    authInterrupts: true
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'github.com'
      }
    ]
  },

  async redirects() {
    return [
      {
        source: '/health(z)?',
        destination: '/api/health',
        permanent: false
      },
      {
        source: '/privacy(-policy)?',
        destination: '/?page=privacy',
        permanent: false
      }
    ]
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/privacy(-policy)?',
  //       destination: '/?page=privacy'
  //     },
  //     {
  //       source: '/ingest/:path*',
  //       destination: 'https://us.i.posthog.com/:path*'
  //     },
  //     {
  //       source: '/ingest/decide',
  //       destination: 'https://us.i.posthog.com/decide'
  //     }
  //   ]
  // },
}

if (env.ANALYZE === 'true') {
  // nextConfig = withAnalyzer(nextConfig)
}

export default withMdx(nextConfig)
