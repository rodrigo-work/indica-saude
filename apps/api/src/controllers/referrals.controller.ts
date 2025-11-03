import type { Request, Response } from 'express'
import type { GetAllReferralsQuery } from '../types/dto.types.js'
import { ReferralsService } from '../services/referrals.service.js'
import { AbstractController } from './abstract.controller.js'

export class ReferralsController extends AbstractController {
  private readonly referralsService: ReferralsService

  constructor() {
    super()
    this.referralsService = new ReferralsService()
  }

  public async getAllReferrals(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        return this.responseError(res, { status: 401, message: 'Unauthorized' }, req)
      }

      const query: GetAllReferralsQuery = {
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        status: req.query.status as GetAllReferralsQuery['status'],
        indicatorId: req.query.indicatorId as string,
        professionalId: req.query.professionalId as string
      }

      const data = await this.referralsService.getAllReferrals(req.user, query)
      this.responseSuccess(res, data)
    } catch (error) {
      this.responseError(res, error, req)
    }
  }
}
