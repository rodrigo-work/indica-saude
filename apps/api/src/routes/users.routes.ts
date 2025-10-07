import { Router } from 'express'
import { UsersController } from '../controllers/users.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { requireGroup } from '../middleware/requireGroup.js'

export class UsersRoutes {
  private router: Router
  private controllers: UsersController

  constructor() {
    this.router = Router()
    this.controllers = new UsersController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get('/api/users', async (req, res) => {
      return await this.controllers.getAllUsers(req, res)
    })

    this.router.get('/api/user/me', authMiddleware, async (req, res) => {
      return await this.controllers.getUsersMe(req, res)
    })

    this.router.get('/users/admin', authMiddleware, requireGroup('admins'), async (req, res) => {
      return await this.controllers.getAllUsers(req, res)
    })
  }

  public getRouter(): Router {
    return this.router
  }
}
