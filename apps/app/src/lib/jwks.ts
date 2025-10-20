import { createRemoteJWKSet } from 'jose'
import { env } from '@/env'

if (!env.COGNITO_JWKS_URL) {
  throw new Error('COGNITO_JWKS_URL is not set')
}

export const JWKS = createRemoteJWKSet(new URL(env.COGNITO_JWKS_URL))
