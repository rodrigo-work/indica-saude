import { createRemoteJWKSet, type JWTPayload, jwtVerify } from 'jose'
import { keys } from '../../keys'

if (!keys().COGNITO_JWKS_URL) {
  // Will throw when verifying if not set
}

let jwks: ReturnType<typeof createRemoteJWKSet>
if (keys().COGNITO_JWKS_URL) {
  jwks = createRemoteJWKSet(new URL(keys().COGNITO_JWKS_URL))
}

/**
 * Verify ID token using jose and Cognito's JWKS.
 * Throws on invalid token.
 */
export async function verifyIdToken(idToken: string): Promise<JWTPayload> {
  if (!jwks) {
    throw new Error('COGNITO_JWKS_URL not configured')
  }
  const { payload } = await jwtVerify(idToken, jwks, {
    // audience: COGNITO_AUDIENCE,
    issuer: keys().COGNITO_ISSUER
  })
  // if (payload.email.includes('indicator')) {
  //   payload.role = 'indicator'
  // }
  payload.name = payload['cognito:username']
  payload.role = 'INDICATOR'

  return payload
}
