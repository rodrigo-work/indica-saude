import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),

    COGNITO_REGION: z.string(),
    COGNITO_CLIENT_ID: z.string(),
    COGNITO_CLIENT_SECRET: z.string(),
    COGNITO_JWKS_URL: z.string().startsWith('https://cognito-idp'),
    COGNITO_AUDIENCE: z.string().optional(),
    COGNITO_ISSUER: z.string().startsWith('https://cognito-idp')
  },
  runtimeEnv: {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,

    COGNITO_REGION: process.env.COGNITO_REGION,
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET: process.env.COGNITO_CLIENT_SECRET,
    COGNITO_JWKS_URL: process.env.COGNITO_JWKS_URL,
    COGNITO_AUDIENCE: process.env.COGNITO_AUDIENCE,
    COGNITO_ISSUER: process.env.COGNITO_ISSUER
  }
})
