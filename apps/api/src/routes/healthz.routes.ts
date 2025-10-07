import { Router } from 'express'
import { HealthzController } from '../controllers/healthz.controller.js'

export class HealthzRoutes {
  private router: Router
  private healthzController: HealthzController

  constructor() {
    this.router = Router()
    this.healthzController = new HealthzController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get('/healthz', async (req, res): Promise<void> => {
      await this.healthzController.healthz(req, res)
    })

    this.router.get('/', async (req, res): Promise<void> => {
      await this.healthzController.hello(req, res)
    })
  }

  public getRouter(): Router {
    return this.router
  }
}
