import { config as baseConfig, withAnalyzer } from '@workspace/next-config'
import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const withMdx = createMDX()

const transpilePackages = [
  '@workspace/ui',
  '@workspace/seo',
  '@workspace/next-config',
  '@workspace/eslint-config',
  '@workspace/typescript-config'
]

const nextConfig: NextConfig = {
  ...baseConfig,

  reactStrictMode: true,

  trailingSlash: true,

  transpilePackages,

  experimental: {
    authInterrupts: true
  }
}

export default withMdx(withAnalyzer(nextConfig))
