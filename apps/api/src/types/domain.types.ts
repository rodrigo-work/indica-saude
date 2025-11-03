/**
 * Domain Types - Tipos de domínio fortemente tipados
 * Elimina uso de 'any' e melhora type safety
 */

export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  INDICATOR = 'INDICATOR',
  PROFESSIONAL = 'PROFESSIONAL'
}

export enum ReferralStatus {
  PENDING = 'PENDING',
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum AttendanceStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  CANCELLED = 'CANCELLED'
}

export enum CommissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PAID = 'PAID'
}

export enum CommissionType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

/**
 * Tipo de usuário autenticado
 * Combina dados do banco + Cognito + JWT payload
 */
export interface AuthenticatedUser {
  id: string
  authProviderId: string
  name: string
  email: string
  role: Role
  
  // Campos do JWT payload
  sub: string
  token_use?: string
  
  // Campos do Cognito
  'cognito:groups'?: string[]
  'cognito:username'?: string
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

/**
 * Payload do JWT do Cognito
 */
export interface CognitoJwtPayload {
  sub: string
  token_use: 'access' | 'id' | 'refresh'
  iss: string
  aud?: string
  exp: number
  iat: number
  [key: string]: unknown
}

/**
 * Atributos do Cognito
 */
export interface CognitoUserAttributes {
  email: string
  name?: string
  family_name?: string
  'cognito:groups'?: string[]
  'cognito:username'?: string
  [key: string]: string | string[] | undefined
}

