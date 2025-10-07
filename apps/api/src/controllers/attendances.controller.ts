import type { Request, Response } from 'express'
import { AttendancesService } from '../services/attendances.service.js'
import { AbstractController } from './abstract.controller.js'

export class AttendancesController extends AbstractController {
  private readonly services: AttendancesService

  constructor() {
    super()
    this.services = new AttendancesService()
  }

  public async getAllAttendances(req: Request, res: Response) {
    try {
      const data = await this.services.getAllAttendances(req.user)
      res.status(200).json(data)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
