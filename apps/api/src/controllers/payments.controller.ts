import type { Request, Response } from 'express'
import { PaymentsService } from '../services/payments.service.js'
import { AbstractController } from './abstract.controller.js'

export class PaymentsController extends AbstractController {
  private readonly services: PaymentsService

  constructor() {
    super()
    this.services = new PaymentsService()
  }

  public async getAllPayments(req: Request, res: Response) {
    try {
      const data = await this.services.getAllPayments(req.user)
      this.responseSuccess(res, data)
    } catch (error) {
      this.responseError(res, error, req)
    }
  }
}
