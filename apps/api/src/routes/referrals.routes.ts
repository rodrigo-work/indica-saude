import { Router } from 'express'
import { ReferralsController } from '../controllers/referrals.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

export class ReferralsRoutes {
  private router: Router
  private controllers: ReferralsController

  constructor() {
    this.router = Router()
    this.controllers = new ReferralsController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get('/api/referrals', authMiddleware, async (req, res) => {
      return await this.controllers.getAllReferrals(req, res)
    })
  }

  public getRouter(): Router {
    return this.router
  }
}
