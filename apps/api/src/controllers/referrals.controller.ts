import type { Request, Response } from 'express'
import { ReferralsService } from '../services/referrals.service.js'
import { AbstractController } from './abstract.controller.js'

export class ReferralsController extends AbstractController {
  private readonly services: ReferralsService

  constructor() {
    super()
    this.services = new ReferralsService()
  }

  public async getAllReferrals(req: Request, res: Response) {
    try {
      const data = await this.services.getAllReferrals(req.user)
      res.status(200).json(data)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
