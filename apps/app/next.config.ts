import {
  config as baseConfig,
  mergeImageRemotePatterns,
  withAnalyzer
} from '@workspace/next-config'
import type { NextConfig } from 'next'

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

const additionalImagePatterns = [
  {
    protocol: 'https' as const,
    hostname: 'res.cloudinary.com'
  },
  {
    protocol: 'https' as const,
    hostname: 'iad.microlink.io'
  }
]

const nextConfig: NextConfig = {
  ...baseConfig,

  reactStrictMode: true,

  transpilePackages,

  experimental: {
    authInterrupts: true
  },

  rewrites: () => Promise.resolve([]),

  images: {
    ...baseConfig.images,
    remotePatterns: mergeImageRemotePatterns(
      baseConfig.images?.remotePatterns,
      additionalImagePatterns
    )
  }
}

export default withAnalyzer(nextConfig)
