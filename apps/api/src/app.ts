import cors from 'cors'
import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express, { type Express } from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { errorHandler } from './middleware/error.handler.js'
// import { rateLimiter } from './middleware/rate-limit.middleware.js'
import { AttendancesRoutes } from './routes/attendances.routes.js'
import { AuthRoutes } from './routes/auth.routes.js'
import { CommissionsRoutes } from './routes/commissions.routes.js'
import { HealthzRoutes } from './routes/healthz.routes.js'
import { PaymentsRoutes } from './routes/payments.routes.js'
import { ReferralsRoutes } from './routes/referrals.routes.js'
import { UsersRoutes } from './routes/users.routes.js'
import { swaggerFile } from './swagger-output.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class Application {
  private app: Express
  private healthzRoutes: HealthzRoutes
  private authRoutes: AuthRoutes
  private usersRoutes: UsersRoutes
  private paymentsRoutes: PaymentsRoutes
  private referralsRoutes: ReferralsRoutes
  private attendancesRoutes: AttendancesRoutes
  private commissionsRoutes: CommissionsRoutes

  constructor() {
    this.app = express()
    this.healthzRoutes = new HealthzRoutes()
    this.authRoutes = new AuthRoutes()
    this.usersRoutes = new UsersRoutes()
    this.paymentsRoutes = new PaymentsRoutes()
    this.referralsRoutes = new ReferralsRoutes()
    this.attendancesRoutes = new AttendancesRoutes()
    this.commissionsRoutes = new CommissionsRoutes()
  }

  init(): Express {
    this.app
      .disable('x-powered-by')
      // .use(helmet())
      // .use(rateLimiter)
      .use(morgan('dev'))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(
        cors({
          origin: ['*'],
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
          credentials: true
        })
      )
      .use(express.static(path.join(__dirname, '..', 'public')))

    this.app.use('/', this.healthzRoutes.getRouter())
    this.app.use(this.authRoutes.getRouter())
    this.app.use(this.usersRoutes.getRouter())
    this.app.use(this.paymentsRoutes.getRouter())
    this.app.use(this.referralsRoutes.getRouter())
    this.app.use(this.attendancesRoutes.getRouter())
    this.app.use(this.commissionsRoutes.getRouter())

    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

    this.app.use((_req, res) => {
      res.status(404).json({
        success: false,
        code: 404,
        message: 'Not found'
      })
    })

    this.app.use(errorHandler)

    return this.app
  }
}

export default new Application().init()
