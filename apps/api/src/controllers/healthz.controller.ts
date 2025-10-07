import type { Request, Response } from 'express'
import { AbstractController } from './abstract.controller.js'

export class HealthzController extends AbstractController {
  async healthz(_req: Request, res: Response): Promise<void> {
    const data = {
      status: 'ok',
      timestamp: Date.now()
    }

    try {
      res.status(200).json(data)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  async hello(_req: Request, res: Response): Promise<void> {
    const html = `
    <html>
      <head>
        <title>Express</title>
        <style type="text/css">
          body {
            padding: 50px;
            font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
          }
          h1 {
            font-weight: 100;
          }
        </style>
      </head>
      <body>
        <h1>Express</h1>
        <p>Welcome the <a href="/docs">API - Indica Saúde</a> with Express</p>
      </body>
    </html>
    `
    try {
      res.status(200).send(html)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
