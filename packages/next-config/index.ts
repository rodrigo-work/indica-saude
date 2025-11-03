import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

/**
 * Default remote image patterns allowed by Next.js Image component
 */
export const defaultImageRemotePatterns = [
  {
    protocol: 'https' as const,
    hostname: 'img.clerk.com'
  },
  {
    protocol: 'https' as const,
    hostname: 'res.cloudinary.com'
  },
  {
    protocol: 'https' as const,
    hostname: 'iad.microlink.io'
  },
  {
    protocol: 'https' as const,
    hostname: 'github.com'
  }
]

/**
 * Remote image pattern type
 */
export type RemotePattern = {
  protocol: 'http' | 'https'
  hostname: string
  port?: string
  pathname?: string
}

/**
 * Merges image remote patterns, avoiding duplicates
 * Accepts the actual type that Next.js uses for remotePatterns
 * @param basePatterns - Base patterns from config (can include URL objects or RemotePattern)
 * @param additionalPatterns - Additional patterns to merge
 * @returns Merged array of unique patterns
 */
export const mergeImageRemotePatterns = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  basePatterns: any = [],
  additionalPatterns: RemotePattern[] = []
): RemotePattern[] => {
  // Filter and convert base patterns to RemotePattern format
  const basePatternsArray: RemotePattern[] = Array.isArray(basePatterns)
    ? basePatterns
        .filter(
          (pattern): pattern is RemotePattern | URL =>
            pattern !== null && typeof pattern === 'object'
        )
        .map((pattern): RemotePattern => {
          // Handle URL objects
          if (pattern instanceof URL) {
            return {
              protocol: pattern.protocol.slice(0, -1) as 'http' | 'https',
              hostname: pattern.hostname,
              ...(pattern.port && { port: pattern.port }),
              ...(pattern.pathname && { pathname: pattern.pathname })
            }
          }

          // Handle RemotePattern objects
          if (
            'protocol' in pattern &&
            'hostname' in pattern &&
            (pattern.protocol === 'http' || pattern.protocol === 'https')
          ) {
            return {
              protocol: pattern.protocol,
              hostname: pattern.hostname,
              ...('port' in pattern && pattern.port && { port: String(pattern.port) }),
              ...('pathname' in pattern && pattern.pathname && { pathname: pattern.pathname })
            }
          }

          // Fallback (shouldn't happen with valid Next.js config)
          throw new Error(`Invalid remote pattern: ${JSON.stringify(pattern)}`)
        })
    : []

  const allPatterns = [...basePatternsArray, ...additionalPatterns]
  const uniquePatterns = new Map<string, RemotePattern>()

  for (const pattern of allPatterns) {
    if (!pattern) continue
    const key = `${pattern.protocol}://${pattern.hostname}`
    if (!uniquePatterns.has(key)) {
      uniquePatterns.set(key, pattern)
    }
  }

  return Array.from(uniquePatterns.values())
}

/**
 * Applies bundle analyzer to Next.js config if ANALYZE env var is set
 * @param config - Next.js config to enhance
 * @returns Config with bundle analyzer applied if enabled
 */
export const withAnalyzer = (config: NextConfig): NextConfig => {
  if (process.env.ANALYZE === 'true') {
    return withBundleAnalyzer({
      enabled: true
    })(config)
  }
  return config
}

/**
 * Base Next.js configuration shared across all apps
 *
 * Features:
 * - Image optimization with AVIF and WebP formats
 * - Turbopack rules for SVG handling
 * - TypeScript strict mode
 * - Dev indicators configuration
 */
export const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: defaultImageRemotePatterns
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true
            }
          }
        ],
        as: '*.js'
      }
    }
  },

  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: false,

  devIndicators: {
    position: 'bottom-right'
  },

  typescript: {
    ignoreBuildErrors: false
  }
}
