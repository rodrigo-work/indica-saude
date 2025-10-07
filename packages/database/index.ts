import 'server-only'

// import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from './generated/client'
import { keys } from './keys'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: keys().DATABASE_URL
    // log: ['query', 'info', 'warn', 'error']
  })
// .$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export * from './generated/client'

// import { neonConfig, Pool } from '@neondatabase/serverless'
// import { PrismaNeon } from '@prisma/adapter-neon'
// import ws from 'ws'
// import { PrismaClient } from './generated/client'
// import { keys } from './keys'

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// neonConfig.webSocketConstructor = ws

// const pool = new Pool({ connectionString: keys().DATABASE_URL })
// const adapter = new PrismaNeon(pool)

// export const database = globalForPrisma.prisma || new PrismaClient({ adapter })

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = database
// }

// export * from './generated/client'
