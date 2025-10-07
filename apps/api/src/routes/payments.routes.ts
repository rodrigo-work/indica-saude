import { Router } from 'express'
import { PaymentsController } from '../controllers/payments.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

export class PaymentsRoutes {
  private router: Router
  private controllers: PaymentsController

  constructor() {
    this.router = Router()
    this.controllers = new PaymentsController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get('/api/payments', authMiddleware, async (req, res) => {
      return await this.controllers.getAllPayments(req, res)
    })
  }

  public getRouter(): Router {
    return this.router
  }
}
