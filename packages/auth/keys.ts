import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const keys = () =>
  createEnv({
    server: {
      COGNITO_DOMAIN: z.string(),
      COGNITO_CLIENT_ID: z.string(),
      COGNITO_CLIENT_SECRET: z.string(),
      COGNITO_REDIRECT_URI: z.string(),
      COGNITO_JWKS_URL: z.string(),
      COGNITO_AUDIENCE: z.string(),
      COGNITO_ISSUER: z.string()
    },
    runtimeEnv: {
      COGNITO_DOMAIN: process.env.COGNITO_DOMAIN,
      COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
      COGNITO_CLIENT_SECRET: process.env.COGNITO_CLIENT_SECRET,
      COGNITO_REDIRECT_URI: process.env.COGNITO_REDIRECT_URI,
      COGNITO_JWKS_URL: process.env.COGNITO_JWKS_URL,
      COGNITO_AUDIENCE: process.env.COGNITO_AUDIENCE,
      COGNITO_ISSUER: process.env.COGNITO_ISSUER
    }
  })

// # Cognito / AWS settings (fill with your values)
// COGNITO_DOMAIN=https://your-cognito-domain.auth.us-east-1.amazoncognito.com
// COGNITO_CLIENT_ID=your_client_id
// COGNITO_CLIENT_SECRET=your_client_secret_if_any
// COGNITO_REDIRECT_URI=http://localhost:3000/api/auth/callback
// COGNITO_JWKS_URL=https://cognito-idp.<region>.amazonaws.com/<userPoolId>/.well-known/jwks.json
// COGNITO_AUDIENCE=your_client_id_or_audience
// COGNITO_ISSUER=https://cognito-idp.<region>.amazonaws.com/<userPoolId>
