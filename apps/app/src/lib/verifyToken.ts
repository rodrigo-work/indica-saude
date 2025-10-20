import { jwtVerify } from 'jose'
import { env } from '@/env'
import { type Profile, profileSchema } from '@/types/profile'
import { JWKS } from './jwks'

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: env.COGNITO_ISSUER,
      // audience: env.COGNITO_AUDIENCE
    })

    if (payload.token_use !== 'id') {
      throw new Error('Invalid token, not an ID token')
    }

    const results: Profile = profileSchema.parse(payload)

    return results
  } catch (_error) {
    return null
  }
}
