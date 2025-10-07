import { createRemoteJWKSet } from 'jose'
import { env } from '../env.js'

// Cria apenas uma vez — jose faz cache interno automaticamente
export const JWKS = createRemoteJWKSet(new URL(env.COGNITO_JWKS_URL))
