import { Router } from 'express'
import { HealthzController } from '../controllers/healthz.controller.js'

export class HealthzRoutes {
  private router: Router
  private healthzController: HealthzController

  constructor() {
    this.router = Router()
    this.healthzController = new HealthzController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get(/^\/api\/health(z)?$/, async (req, res): Promise<void> => {
      await this.healthzController.healthz(req, res)
    })

    this.router.get('/', async (req, res): Promise<void> => {
      await this.healthzController.hello(req, res)
    })

    this.router.get('/openapi', async (_req, res) => {
      // const data = await SwaggerAutoGen()

      res.json({
        openapi: '3.0.0'
      })
    })
  }

  public getRouter(): Router {
    return this.router
  }
}
export const doc = {
  info: {
    title: 'Minha API',
    description: 'Documentação gerada automaticamente',
    version: '1.0.0'
  },
  host: 'localhost:5001',

  servers: [{ url: 'http://localhost:5001/api', description: 'Servidor local' }]
}

export const outputFile = './src/swagger-output.json'

// Aqui você lista todos os arquivos de rotas
export const endpointsFiles = [
  './src/app.ts',
  './src/routes/healthz.routes.ts',
  './src/routes/auth.routes.ts',
  './src/routes/users.routes.ts',
  './src/routes/payments.routes.ts',
  './src/routes/referrals.routes.ts',
  './src/routes/attendances.routes.ts',
  './src/routes/commissions.routes.ts'
]
