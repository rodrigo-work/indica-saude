import { prisma } from '@workspace/database'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromToken } from '@/lib/auth'

const paymentSchema = z.object({
  referralId: z.string(),
  totalAmount: z.number(),
  commissionType: z.enum(['PERCENTAGE', 'FIXED']),
  commissionValue: z.number(),
  status: z.enum(['PENDING', 'PAID']),
  paymentDate: z.string(),
  notes: z.string().optional()
})

export async function GET() {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const where = user.role === 'indicator' ? { referral: { indicatorId: user.id } } : {}
  const payments = await prisma.payment.findMany({ where, include: { referral: true } })
  return NextResponse.json(payments)
}

export async function POST(req: NextRequest) {
  const user = await getUserFromToken()
  if (!user || user.role !== 'admin')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const parsed = paymentSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

  const payment = await prisma.payment.create({ data: parsed.data })
  return NextResponse.json(payment)
}
