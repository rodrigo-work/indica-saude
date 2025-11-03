import type { Request, Response } from 'express'
import { logger } from '../lib/logger.js'
import { CognitoService } from '../services/cognito.service.js'
import { AbstractController } from './abstract.controller.js'

export class AuthController extends AbstractController {
  private readonly cognitoService: CognitoService

  constructor() {
    super()
    this.cognitoService = new CognitoService()
  }

  public async signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const data = await this.cognitoService.signIn(email, password)
      this.responseSuccess(res, data.AuthenticationResult)
      
      logger.info('User signed in successfully', { email })
    } catch (error) {
      logger.error('Error during sign in', error, { email })
      this.responseError(res, error, req)
    }
  }

  public async signUp(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, password } = req.body

    try {
      const data = await this.cognitoService.signUp(firstName, lastName, email, password)
      this.responseSuccess(res, data, 201) // 201 Created
      
      logger.info('User signed up successfully', { email })
    } catch (error) {
      logger.error('Error during sign up', error, { email })
      this.responseError(res, error, req)
    }
  }

  public async signOut(req: Request, res: Response): Promise<void> {
    try {
      const authorizationHeader = req.headers.authorization
      const token = authorizationHeader?.split(' ')[1] || ''

      await this.cognitoService.signOut(token)
      this.responseSuccess(res, { message: 'User signed out' }, 200)
      
      logger.info('User signed out successfully')
    } catch (error) {
      logger.error('Error during sign out', error)
      this.responseError(res, error, req)
    }
  }
}
