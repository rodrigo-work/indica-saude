import { createRemoteJWKSet, type JWTVerifyResult, jwtVerify } from 'jose'

const env = {
  COGNITO_DOMAIN: 'https://rodrigo-work.auth.us-east-1.amazoncognito.com',
  COGNITO_CLIENT_ID: '4ohlp007ie2mhlr143kre5jeml',
  COGNITO_CLIENT_SECRET: '1defidoj6ndcslv89snueuvu2ef6cunj0folmd2lh81dre6o6agq',
  COGNITO_REDIRECT_URI: 'http://localhost:3002/auth/callback',
  COGNITO_JWKS_URL:
    'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_RjV4c0h4p/.well-known/jwks.json',
  COGNITO_AUDIENCE: '',
  COGNITO_ISSUER: 'https://cognito-idp.<region>.amazonaws.com/us-east-1_RjV4c0h4p'
}

const JWKS = createRemoteJWKSet(
  new URL(`https://cognito-idp.us-east-1.amazonaws.com/us-east-1_RjV4c0h4p/.well-known/jwks.json`)
)

export async function verifyToken(token: string) {
  try {
    const { payload }: JWTVerifyResult = await jwtVerify(token, JWKS, {
      issuer: env.COGNITO_ISSUER
      // audience: env.COGNITO_CLIENT_ID
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
