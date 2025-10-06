import { ZodError } from 'zod'
import { env } from '@/env'
import { getUserFromServer, getUserFromToken } from '@/lib/auth'
import cors from '@/lib/cors'
import { database } from '@/lib/database'
import { HttpError } from '@/lib/errors'
import { delay } from '@/lib/utils'
import { validate } from '@/lib/validate'
import { paymentSchema, paymentsSchema } from './schema'

export const runtime = 'nodejs'

// Função que lista os pagamentos
async function payments() {
  const user = await getUserFromServer()

  if (!user) {
    throw new HttpError('Unauthorized', 401)
  }

  const where = user.role === 'INDICATOR' ? { referral: { indicatorId: user.id } } : {}

  const data = await database.payment.findMany({
    where,
    include: { referral: true }
  })

  return validate(paymentsSchema, data)
}

// GET /api/payments
export async function GET(request: Request) {
  try {
    await delay(1000)
    const data = await payments()

    const response = new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })

    return cors(request, response, {
      origin: env.NEXT_PUBLIC_APP_URL,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    })
  } catch (err: any) {
    return handleError(request, err)
  }
}

// POST /api/payments
export async function POST(request: Request) {
  try {
    await delay(1000)

    const user = await getUserFromToken()
    if (!user || user.role !== 'admin') {
      throw new HttpError('Forbidden', 403)
    }

    const body = await request.json()
    const parsed = validate(paymentSchema, body)

    // @ts-expect-error
    const payment = await database.payment.create({ data: parsed })

    return cors(
      request,
      new Response(JSON.stringify({ data: payment }), {
        status: 201,
        headers: { 'content-type': 'application/json' }
      })
    )
  } catch (err: any) {
    return handleError(request, err)
  }
}

// CORS preflight
export function OPTIONS(request: Request) {
  return cors(request, new Response(null, { status: 204 }))
}

// Erro centralizado
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
