import type { NextFunction, Request, Response } from 'express'
import { ZodError, type ZodTypeAny, type z } from 'zod'

type ValidationSchemas = {
  body?: ZodTypeAny
  query?: ZodTypeAny
  params?: ZodTypeAny
}

/**
 * Middleware genérico de validação com Zod, tipado.
 */
export const validate =
  <T extends ValidationSchemas>(schemas: T) =>
  (
    req: Request<
      T['params'] extends ZodTypeAny ? z.infer<T['params']> : any,
      any,
      T['body'] extends ZodTypeAny ? z.infer<T['body']> : any,
      T['query'] extends ZodTypeAny ? z.infer<T['query']> : any
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body) as any
      if (schemas.query) req.query = schemas.query.parse(req.query) as any
      if (schemas.params) req.params = schemas.params.parse(req.params) as any
      next()
    } catch (error) {
      // console.error(' 🚨 Erro de validação:', error)

      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          code: 400,
          name: error.name,
          messages: error._zod.def.map((e) => ({
            field: e.path.join('.'),
            message: e.message
          }))
        })
      }
      next(error)
    }
  }
