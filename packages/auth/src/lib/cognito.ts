/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
import crypto from 'node:crypto'
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  GlobalSignOutCommand,
  InitiateAuthCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { keys } from '../../keys'
import type { TokenSet } from '../types'

const client = new CognitoIdentityProviderClient({
  region: 'us-east-1'
})

if (!keys().COGNITO_DOMAIN || !keys().COGNITO_CLIENT_ID) {
  // this module should still load in dev/test tasks; env must be set at runtime
  throw new Error('Missing keys(). or COGNITO_CLIENT_ID')
}

/**
 * Exchange username/password (RESOURCE OWNER PASSWORD flow) OR authorization code for tokens.
 * NOTE: For production prefer Authorization Code Flow with PKCE.
 */
export async function exchangeCodeForToken(code: string): Promise<TokenSet> {
  const tokenUrl = `${keys().COGNITO_DOMAIN}/oauth2/token`
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: keys().COGNITO_CLIENT_ID || '',
    code,
    redirect_uri: keys().COGNITO_REDIRECT_URI || ''
  })

  const auth = keys().COGNITO_CLIENT_SECRET
    ? Buffer.from(`${keys().COGNITO_CLIENT_ID}:${keys().COGNITO_CLIENT_SECRET}`).toString('base64')
    : undefined

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(auth ? { Authorization: `Basic ${auth}` } : {})
    },
    body: body.toString()
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Token exchange failed: ${res.status} ${txt}`)
  }
  return (await res.json()) as TokenSet
}

function generateSecretHash(username: string, clientId: string, clientSecret: string) {
  return crypto
    .createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64')
}

export async function passwordGrant(username: string, password: string): Promise<any> {
  try {
    const clientId = keys().COGNITO_CLIENT_ID as string
    const clientSecret = keys().COGNITO_CLIENT_SECRET as string

    const secretHash = generateSecretHash(username, clientId, clientSecret)

    const params = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH as AuthFlowType,
      ClientId: keys().COGNITO_CLIENT_ID as string,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: secretHash
      }
    }

    const command = new InitiateAuthCommand(params)
    const response = await client.send(command)

    if (response.ChallengeName) {
      // console.log('response', response)
      // Aqui você pode retornar os tokens para o cliente ou setar cookie, etc
      console.log('ChallengeName', response.ChallengeName)
      return JSON.stringify({ challengeName: response.ChallengeName })
    }

    return response.AuthenticationResult
  } catch (error) {
    return { error: (error as Error).message || 'Unauthorized' }
  }
}

/**
 * Refresh token
 */
export async function refreshToken(refresh_token: string): Promise<TokenSet> {
  const tokenUrl = `${keys().COGNITO_DOMAIN}/oauth2/token`
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: keys().COGNITO_CLIENT_ID || '',
    refresh_token
  })

  const auth = keys().COGNITO_CLIENT_SECRET
    ? Buffer.from(`${keys().COGNITO_CLIENT_ID}:${keys().COGNITO_CLIENT_SECRET}`).toString('base64')
    : undefined

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(auth ? { Authorization: `Basic ${auth}` } : {})
    },
    body: body.toString()
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Refresh tokn failed: ${res.status} ${txt}`)
  }
  return (await res.json()) as TokenSet
}

/**
 * Refresh token
 */
export async function removeSession(access_token: string | undefined): Promise<any> {
  const command = new GlobalSignOutCommand({
    AccessToken: access_token
  })
  const response = await client.send(command)

  return response
}
