import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from './generated/client/index.js'
import { keys } from './keys'

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

function createPrismaClient() {
  const env = keys()
  
  return new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
    // log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  }).$extends(withAccelerate())
}

export const database =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = database
}

export * from './generated/client/index.js'
