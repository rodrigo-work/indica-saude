import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Minha API',
    description: 'Documentação gerada automaticamente',
    version: '1.0.0'
  },
  host: 'localhost:5001',

  servers: [{ url: 'http://localhost:5001/api', description: 'Servidor local' }]
}

const outputFile = './src/swagger-output.json'

// Aqui você lista todos os arquivos de rotas
const endpointsFiles = [
  './src/app.ts',
  './src/routes/healthz.routes.ts',
  './src/routes/auth.routes.ts',
  './src/routes/users.routes.ts',
  './src/routes/payments.routes.ts',
  './src/routes/referrals.routes.ts',
  './src/routes/attendances.routes.ts',
  './src/routes/commissions.routes.ts'
]

swaggerAutogen()(outputFile, endpointsFiles, doc)
