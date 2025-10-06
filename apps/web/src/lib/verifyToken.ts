import { createRemoteJWKSet, type JWTVerifyResult, jwtVerify } from 'jose'
import { env } from '@/env'

const JWKS = createRemoteJWKSet(new URL(`${env.COGNITO_ISSUER}/.well-known/jwks.json`))

export async function verifyToken(token: string) {
  try {
    const { payload }: JWTVerifyResult = await jwtVerify(token, JWKS, {
      issuer: env.COGNITO_ISSUER,
      audience: env.COGNITO_CLIENT_ID
    })

    if (!(payload.sub && payload.email && payload.email_verified)) {
      throw new Error('Error validating token')
    }

    const groups = payload['cognito:groups'] as string[] | undefined

    return {
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
      groups: groups || [],
      ...payload
    }
  } catch (error) {
    console.error('Error validating token:', error)
    return null
  }
}
