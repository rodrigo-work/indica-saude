import { ZodError } from 'zod'
import cors from '@/lib/cors'
import { database } from '@/lib/database'
import { usersSchema } from './schema'

export const runtime = 'nodejs'

export function OPTIONS(request: Request) {
  const response = new Response(null)

  return cors(request, response, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // We sometimes artificially delay a reponse for demo purposes.
  // Don't do this in real life :)
  const delay = searchParams.get('delay')
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)))
  }

  const response = new Response(JSON.stringify({ data: await users() }))

  return cors(request, response, {
    origin: 'http://localhost:3000',
    // methods: ['GET', 'POST']
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
}

const users = async () => {
  try {
    const data = await database.user.findMany()

    // validate data with Zod
    return usersSchema.parse(data)
  } catch (error) {
    if (error instanceof ZodError && error.name === 'ZodError') {
      return {
        error: {
          status: 400,
          message: JSON.parse(error.message)
        }
      }
    }

    return {
      status: 500,
      message: 'Error internal server'
    }
  }
}
