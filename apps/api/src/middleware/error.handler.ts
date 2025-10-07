import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      code: 400,
      errors: err._zod.def.map((e) => ({
        field: e.path.join('.'),
        message: e.message
      }))
    })
  }

  // Erros 401 (não autorizado)
  if (err.status === 401 || err.code === 'UNAUTHORIZED') {
    return res.status(401).json({
      success: false,
      code: 401,
      message: err.message
    })
  }

  // Erros 403 (proibido)
  if (err.status === 403 || err.code === 'FORBIDDEN') {
    return res.status(403).json({
      success: false,
      code: 403,
      message: err.message
    })
  }

  // console.error('❌ Unexpected error:', err)

  return res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
}
