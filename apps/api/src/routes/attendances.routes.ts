import { Router } from 'express'
import { AttendancesController } from '../controllers/attendances.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

export class AttendancesRoutes {
  private router: Router
  private controllers: AttendancesController

  constructor() {
    this.router = Router()
    this.controllers = new AttendancesController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get('/api/attendances', authMiddleware, async (req, res) => {
      return await this.controllers.getAllAttendances(req, res)
    })
  }

  public getRouter(): Router {
    return this.router
  }
}
