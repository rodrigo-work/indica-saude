import type { Request, Response } from 'express'
import { CommissionsService } from '../services/commissions.service.js'
import { AbstractController } from './abstract.controller.js'

export class CommissionsController extends AbstractController {
  private readonly services: CommissionsService

  constructor() {
    super()
    this.services = new CommissionsService()
  }

  public async getAllCommissions(req: Request, res: Response) {
    try {
      const data = await this.services.getAllCommissions(req.user)
      res.status(200).json(data)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
