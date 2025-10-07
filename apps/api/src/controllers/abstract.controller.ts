/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
import type { Request, Response } from 'express'

export abstract class AbstractController {
  protected responseError(res: Response, error: Error | unknown, req?: Request) {
    const status = (error as any)?.$metadata?.httpStatusCode || 500
    const name = (error as any)?.name || 'InternalServerError'
    const message = (error as any)?.message || 'Unexpected error occurred'
    const path = req?.originalUrl || ''

    res.status(status).json({
      success: false,
      status,
      error: name,
      message,
      timestamp: new Date().toISOString(),
      path
    })
  }

  protected responseSuccess(res: Response, data: any, status = 200) {
    res.status(status).json(data)
  }
}
