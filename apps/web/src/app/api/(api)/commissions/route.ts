import { prisma } from '@workspace/database'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromToken } from '@/lib/auth'

const commissionSchema = z.object({
  indicatorId: z.string(),
  referralId: z.string(),
  amount: z.number(),
  status: z.enum(['PENDING', 'PAID']),
  generatedAt: z.string(),
  notes: z.string().optional()
})

export async function GET() {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const where = user.role === 'indicator' ? { indicatorId: user.id } : {}
  const commissions = await prisma.commission.findMany({ where, include: { referral: true } })
  return NextResponse.json(commissions)
}

export async function POST(req: NextRequest) {
  const user = await getUserFromToken()
  if (!user || user.role !== 'admin')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const parsed = commissionSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

  const commission = await prisma.commission.create({ data: parsed.data })
  return NextResponse.json(commission)
}
