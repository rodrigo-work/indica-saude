import type { Request, Response } from 'express'
import { UsersService } from '../services/users.service.js'
import { AbstractController } from './abstract.controller.js'

export class UsersController extends AbstractController {
  private readonly cognitoService: UsersService

  constructor() {
    super()
    this.cognitoService = new UsersService()
  }

  public async getAllUsers(_req: Request, res: Response) {
    try {
      const data = await this.cognitoService.getAllUsers()
      res.status(200).json(data)
    } catch (error) {
      this.responseError(res, error, _req)
    }
  }

  public async getUsersMe(req: Request, res: Response) {
    try {
      const data = await this.cognitoService.getUsersMe(req.user)
      res.status(200).json(data)
    } catch (error) {
      this.responseError(res, error, req)
    }
  }
}
