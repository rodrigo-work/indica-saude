import { ZodError, z } from 'zod'
import { env } from '@/env'
import { getUserFromCookie } from '@/lib/auth'
import cors from '@/lib/cors'
import { database } from '@/lib/database'
import { HttpError } from '@/lib/errors'
import { delay } from '@/lib/utils'
import { validate } from '@/lib/validate'

// Runtime
export const runtime = 'nodejs'

// Schema de validação
const referralSchema = z.object({
  patientName: z.string(),
  patientEmail: z.string().email().optional(),
  patientPhone: z.string().optional(),
  professionalId: z.string(),
  scheduledDate: z.string(),
  scheduledTime: z.string(),
  notes: z.string().optional()
})

// GET /api/referrals
export async function GET(request: Request) {
  try {
    // const user = await getUserFromCookie()
    // if (!user) {
    //   throw new HttpError('Unauthorized', 401)
    // }

    // const where =
    //   user.role === 'INDICATOR'
    //     ? { indicatorId: user.id }
    //     : user.role === 'PROFESSIONAL'
    //       ? { professionalId: user.id }
    //       : {}

    const data = await database.referral.findMany({
      // where,
      include: {
        indicator: true,
        professional: true
      }
    })

    return cors(
      request,
      new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      }),
      {
        origin: env.NEXT_PUBLIC_APP_URL,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false
      }
    )
  } catch (err: any) {
    return handleError(request, err)
  }
}

// POST /api/referrals
export async function POST(request: Request) {
  try {
    await delay(1000)

    const user = await getUserFromCookie()
    if (!user || user.role !== 'INDICATOR') {
      throw new HttpError('Forbidden', 403)
    }

    const body = await request.json()
    const parsed = validate(referralSchema, body)

    const referral = await database.referral.create({
      // @ts-expect-error
      data: {
        ...parsed,
        indicatorId: user.id
      }
    })

    return cors(
      request,
      new Response(JSON.stringify({ data: referral }), {
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
