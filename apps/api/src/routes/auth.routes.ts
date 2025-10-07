import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { authSignInSchema, authSignUpSchema } from '../schemas/auth.schema.js'

export class AuthRoutes {
  private router: Router
  private authController: AuthController

  constructor() {
    this.router = Router()
    this.authController = new AuthController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.post(
      '/api/auth/sign-in',
      validate({ body: authSignInSchema }),
      async (req, res) => {
        return await this.authController.signIn(req as any, res)
      }
    )

    this.router.post('/api/auth/sign-up', async (req, res) => {
      return await this.authController.signUp(req, res)
    })

    this.router.post('/api/auth/sign-out', authMiddleware, async (req, res) => {
      return await this.authController.signOut(req, res)
    })

    // this.router.get(
    //   '/status',
    //   async (req: Request, res: Response): Promise<void> => {
    //     await this.authController.statusAuth(req, res)
    //   }
    // )

    // this.router.post(
    //   '/sign-up',
    //   this.authController.signUp.bind(this.authController)
    // )
    // this.router.post(
    //   '/confirm',
    //   this.authController.confirmSignUp.bind(this.authController)
    // )
    // this.router.post('/sign-in', this.authController.signIn.bind(this.authController))
    // this.router.post(
    //   '/forgot-password',
    //   this.authController.forgotPassword.bind(this.authController)
    // )
    // this.router.post(
    //   '/reset-password',
    //   this.authController.resetPassword.bind(this.authController)
    // )
    // this.router.post('/mfa', this.authController.mfa.bind(this.authController))
    // this.router.post(
    //   '/verify-mfa',
    //   this.authController.verifyMfa.bind(this.authController)
    // )
  }

  public getRouter(): Router {
    return this.router
  }
}
