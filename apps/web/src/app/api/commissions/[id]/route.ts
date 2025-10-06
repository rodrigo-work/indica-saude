import { ZodError } from 'zod'
import cors from '@/lib/cors'
import { database as prisma } from '@/lib/database'

export const runtime = 'nodejs'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(request.url)
  const { id } = await params

  // We sometimes artificially delay a reponse for demo purposes.
  // Don't do this in real life :)
  const delay = searchParams.get('delay')
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)))
  }

  return cors(
    request,
    new Response(JSON.stringify({ data: await commissions() }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    })
  )
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)

  // We sometimes artificially delay a reponse for demo purposes.
  // Don't do this in real life :)
  const delay = searchParams.get('delay')
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)))
  }

  return cors(
    request,
    new Response(JSON.stringify({ data: await commissions() }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    })
  )
}

export function OPTIONS(request: Request) {
  return cors(
    request,
    new Response(null, {
      status: 204
    })
  )
}

const commissions = async () => {
  // const user = await getUserFromToken()
  // if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // const where = user.role === 'indicator' ? { indicatorId: user.id } : {}

    const data = await prisma.commission.findMany({
      // where,
      // include: { referral: true }
    })

    // validate data with Zod
    return data // usersSchema.parse(data)
  } catch (error) {
    if (error instanceof ZodError && error.name === 'ZodError') {
      return {
        success: false,
        status: 400,
        message: JSON.parse(error.message)
      }
    }

    return {
      success: false,
      status: 500,
      message: 'Error internal server'
    }
  }
}
