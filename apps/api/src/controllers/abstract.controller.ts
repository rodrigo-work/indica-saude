/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
import type { Response } from 'express'

export abstract class AbstractController {
  protected handleError(res: Response, error: Error | unknown) {
    const data = {
      success: false,
      code: (error as any)?.$metadata?.httpStatusCode || 500,
      name: (error as any)?.name || '500',
      message: (error as any)?.message || 'Unexpected error occurred'
    }

    if ((error as any)?.message === 'FORBIDDEN') {
      return res.status(403).json({
        success: false,
        code: 403,
        message: (error as any)?.message
      })
    }

    if (error instanceof Error) {
      res.status(data.code).json(data)
    } else {
      res.status(500).json({ error: 'Unexpected error occurred' })
    }
  }
}
