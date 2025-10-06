import { ZodError } from 'zod'
import { env } from '@/env'
import cors from '@/lib/cors'
import { database } from '@/lib/database'
import { HttpError } from '@/lib/errors'
import { delay } from '@/lib/utils'

export const runtime = 'nodejs'

async function commissions() {
  // const user = await getUserFromCookie()
  // if (!user) {
  //   throw new HttpError('Unauthorized', 401)
  // }

  // const where = user.role === 'INDICATOR' ? { indicatorId: user.id } : {}

  const data = await database.commission.findMany({
    // where,
    include: {
      referral: true,
      indicator: {
        select: {
          name: true
        }
      }
    }
  })

  return data // validate(commissionsSchema, data)
}

// GET
export async function GET(request: Request) {
  try {
    await delay(1000)
    const data = await commissions()

    const response = new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })

    return cors(request, response, {
      origin: env.NEXT_PUBLIC_APP_URL,
      methods: ['GET'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    })
  } catch (err: any) {
    return handleError(request, err)
  }
}

// POST
export async function POST(request: Request) {
  try {
    await delay(1000)
    const data = await commissions()

    return cors(
      request,
      new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    )
  } catch (err: any) {
    return handleError(request, err)
  }
}

// OPTIONS (CORS preflight)
export function OPTIONS(request: Request) {
  return cors(request, new Response(null, { status: 204 }))
}

// Centralized error handler
async function handleError(request: Request, error: any): Promise<Response> {
  const status = error instanceof HttpError ? error.status : 500
  const message =
    error instanceof ZodError ? 'Invalid data format' : error.message || 'Internal Server Error'

  return await cors(
    request,
    new Response(JSON.stringify({ error: message }), {
      status,
      headers: { 'content-type': 'application/json' }
    })
  )
}
