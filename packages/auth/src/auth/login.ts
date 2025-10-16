import { type NextRequest, NextResponse } from 'next/server'
import { keys } from '../../keys'
import { settings } from '../constants/data'

export const AuthLogin = async (req: NextRequest) => {
  const env = {
    COGNITO_CLIENT_ID: '4ohlp007ie2mhlr143kre5jeml',
    COGNITO_CLIENT_SECRET: '1defidoj6ndcslv89snueuvu2ef6cunj0folmd2lh81dre6o6agq',
    COGNITO_REDIRECT_URI: 'http://localhost:3000/auth/callback',
    COGNITO_JWKS_URL:
      'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_RjV4c0h4p/.well-known/jwks.json',
    COGNITO_AUDIENCE: '',
    COGNITO_ISSUER: 'https://cognito-idp.<region>.amazonaws.com/us-east-1_RjV4c0h4p'
  }

  const COOKIES_NAME = {
    id_token: 'id_token',
    access_token: 'access_token',
    refresh_token: 'refresh_token'
  }

  let STATE: string | unknown
  const LANG = 'pt-BR'
  const SCOPES = 'openid email profile'

  const redirectUrl = req.nextUrl.searchParams.get('redirect')

  if (redirectUrl) {
    STATE = `&state=${redirectUrl}`
  } else {
    STATE = ''
  }

  const LOGIN_URL = `${keys().COGNITO_DOMAIN}/oauth2/authorize?response_type=code&client_id=${env.COGNITO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    env.COGNITO_REDIRECT_URI
  )}&scope=${SCOPES}&lang=${LANG}${STATE}`

  return NextResponse.redirect(LOGIN_URL)

  // return NextResponse.json({ ok: true })
}
