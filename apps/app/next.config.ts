// import { withMicrofrontends } from '@vercel/microfrontends/next/config'
// import createWithVercelToolbar from '@vercel/toolbar/plugins/next'
import { config as baseConfig } from '@workspace/next-config'
import type { NextConfig } from 'next'
import { env } from '@/env'

// const withVercelToolbar = createWithVercelToolbar()

const transpilePackages = [
  '@workspace/ui',
  '@workspace/seo',
  '@workspace/auth',
  '@workspace/about',
  '@workspace/next-config',
  '@workspace/internationalization',
  '@workspace/eslint-config',
  '@workspace/typescript-config'
]

// Base config
const nextConfig: NextConfig = {
  ...baseConfig,

  reactStrictMode: true,

  transpilePackages,

  experimental: {
    authInterrupts: true
  },
  rewrites: () => Promise.resolve([]),

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'iad.microlink.io'
      }
    ]
  }
  // other properties...
}

if (env.ANALYZE === 'true') {
  // nextConfig = withAnalyzer(nextConfig)
}

// nextConfig = withLogging(nextConfig)
// nextConfig = withVercelToolbar(nextConfig)

export default nextConfig
