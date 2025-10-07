import crypto from 'node:crypto'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { env } from '../env.js'

export abstract class AbstractService {
  protected readonly client: CognitoIdentityProviderClient
  protected readonly clientId: string
  protected readonly clientSecret: string

  constructor() {
    this.client = new CognitoIdentityProviderClient({
      region: env.COGNITO_REGION
    })
    this.clientId = env.COGNITO_CLIENT_ID
    this.clientSecret = env.COGNITO_CLIENT_SECRET
  }

  protected generateSecretHash(user: string): string {
    return crypto
      .createHmac('SHA256', this.clientSecret)
      .update(user + this.clientId)
      .digest('base64')
  }
}
