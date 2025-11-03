import {
  CognitoIdentityProviderClient,
  GetUserCommand
} from '@aws-sdk/client-cognito-identity-provider'
import type { NextFunction, Request, Response } from 'express'
import { jwtVerify } from 'jose'
import { env } from '../env.js'
import { database } from '../lib/database.js'
import { JWKS } from '../lib/jwks.js'
import { logger } from '../lib/logger.js'
import type {
  AuthenticatedUser,
  CognitoJwtPayload,
  CognitoUserAttributes,
  Role
} from '../types/domain.types.js'

// const ISSUER = env.COGNITO_ISSUER
const AUDIENCE = env.COGNITO_AUDIENCE

const cognitoClient = new CognitoIdentityProviderClient({ region: env.COGNITO_REGION })

async function getUserAttributes(accessToken: string): Promise<CognitoUserAttributes> {
  const command = new GetUserCommand({ AccessToken: accessToken })
  const response = await cognitoClient.send(command)

  const attributes: CognitoUserAttributes = {
    email: ''
  }

  response.UserAttributes?.forEach((attr) => {
    if (attr.Name && attr.Value) {
      attributes[attr.Name] = attr.Value
    }
  })

  return attributes
}

/**
 * Middleware padrão: apenas valida o token (access ou id)
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return next({ status: 401, message: 'Token not found' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      // issuer: ISSUER
      // audience: AUDIENCE
    }) //as { payload: CognitoJwtPayload }

    // Verifica tipo de token
    if (payload.token_use !== 'access') {
      return next({ status: 401, message: 'Invalid token, not an access token' })
    }

    // Consulta atributos do usuário via GetUser
    const cognitoAttrs = await getUserAttributes(token)

    // Procura ou cria usuário no banco
    let user = await database.user.findUnique({
      where: { authProviderId: payload.sub }
    })

    // Se não existir, procura pelo email para evitar duplicidade
    if (!user && cognitoAttrs.email) {
      user = await database.user.findUnique({ where: { email: cognitoAttrs.email } })
      if (user) {
        // Atualiza authProviderId do registro existente
        user = await database.user.update({
          where: { email: cognitoAttrs.email },
          data: { authProviderId: payload.sub }
        })
      }
    }

    // Se ainda não existir, cria novo usuário
    if (!user) {
      user = await database.user.create({
        data: {
          authProviderId: payload.sub,
          name:
            `${cognitoAttrs.name || ''} ${cognitoAttrs.family_name || ''}`.trim() ||
            cognitoAttrs.email,
          email: cognitoAttrs.email,
          role: 'INDICATOR'
        }
      })
    }

    // Constrói objeto de usuário autenticado tipado
    const authenticatedUser: AuthenticatedUser = {
      id: user.id,
      authProviderId: user.authProviderId || payload.sub,
      name: user.name,
      email: user.email,
      role: user.role as Role,
      sub: payload.sub,
      token_use: payload.token_use,
      'cognito:groups': cognitoAttrs['cognito:groups'],
      'cognito:username': cognitoAttrs['cognito:username'],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }

    // Anexa usuário autenticado à request
    req.user = authenticatedUser

    logger.debug('User authenticated', {
      userId: authenticatedUser.id,
      role: authenticatedUser.role
    })

    next()
  } catch (error) {
    logger.error('Error validating token', error, { token: token.substring(0, 20) + '...' })
    return next({ status: 401, message: 'Token invalid or expired' })
  }
}
