import { vercel } from '@t3-oss/env-core/presets-zod'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

/**
 * Environment variables schema and validation
 *
 * Validates required and optional environment variables for Next.js apps.
 * Uses Zod for type-safe validation with @t3-oss/env-nextjs.
 *
 * @returns Validated environment object with type safety
 *
 * @example
 * ```ts
 * const env = keys()
 * // env is fully typed with all validated variables
 * ```
 */
export const keys = () =>
  createEnv({
    extends: [vercel()],
    server: {
      JWT_SECRET: z.string(),

      /**
       * Enable bundle analyzer when set to 'true'
       * Usage: ANALYZE=true pnpm build
       */
      ANALYZE: z.string().optional(),

      /**
       * Next.js runtime environment (added automatically by Vercel)
       * @see https://nextjs.org/docs/app/api-reference/edge
       */
      NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional()
    },
    client: {
      NEXT_PUBLIC_WEB_URL: z.string().url(),
      NEXT_PUBLIC_APP_URL: z.string().url(),
      NEXT_PUBLIC_API_URL: z.string().url()
    },
    runtimeEnv: {
      JWT_SECRET: process.env.JWT_SECRET,

      ANALYZE: process.env.ANALYZE,
      NEXT_RUNTIME: process.env.NEXT_RUNTIME,

      NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
    }
  })
