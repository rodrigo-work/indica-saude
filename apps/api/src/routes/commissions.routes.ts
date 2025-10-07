import { Router } from 'express'
import { CommissionsController } from '../controllers/commissions.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

export class CommissionsRoutes {
  private router: Router
  private controllers: CommissionsController

  constructor() {
    this.router = Router()
    this.controllers = new CommissionsController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get('/api/commissions', authMiddleware, async (req, res) => {
      return await this.controllers.getAllCommissions(req, res)
    })
  }

  public getRouter(): Router {
    return this.router
  }
}
