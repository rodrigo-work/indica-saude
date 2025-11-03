import 'express'
import type { AuthenticatedUser } from './domain.types.js'

declare module 'express' {
  interface Request {
    user?: AuthenticatedUser
  }
}
