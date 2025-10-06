import { ZodError, z } from 'zod'
import { env } from '@/env'
import { getUserFromCookie, getUserFromToken } from '@/lib/auth'
import cors from '@/lib/cors'
import { database } from '@/lib/database'
import { HttpError } from '@/lib/errors'
import { delay } from '@/lib/utils'
import { validate } from '@/lib/validate'

// Runtime para Node.js
export const runtime = 'nodejs'

// Zod schema
const attendanceSchema = z.object({
  referralId: z.string(),
  professionalId: z.string().optional(), // será sobrescrito no POST
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'NO_SHOW', 'CANCELLED']),
  notes: z.string().optional()
})

// GET /api/attendance
export async function GET(request: Request) {
  try {
    await delay(1000)

    const user = await getUserFromCookie()
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const where = user.role === 'PROFESSIONAL' ? { professionalId: user.id } : undefined

    const data = await database.attendance.findMany({
      where,
      include: {
        referral: true,
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
        credentials: true
      }
    )
  } catch (err: any) {
    return handleError(request, err)
  }
}

// POST /api/attendance
export async function POST(request: Request) {
  try {
    await delay(1000)

    const user = await getUserFromToken()
    if (!user || user.role !== 'PROFESSIONAL') {
      throw new HttpError('Forbidden', 403)
    }

    const body = await request.json()
    const parsed = validate(attendanceSchema, body)

    const attendance = await database.attendance.create({
      data: {
        ...parsed,
        professionalId: user.id // força a associação correta
      }
    })

    return cors(
      request,
      new Response(JSON.stringify({ data: attendance }), {
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
