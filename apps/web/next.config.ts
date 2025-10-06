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
  '@workspace/typescript-config'
]

// Base config
const nextConfig: NextConfig = {
  ...baseConfig,

  reactStrictMode: true,

  trailingSlash: true,

  transpilePackages,

  experimental: {
    authInterrupts: true
  }
}

if (env.ANALYZE === 'true') {
  // nextConfig = withAnalyzer(nextConfig)
}

export default withMdx(nextConfig)
