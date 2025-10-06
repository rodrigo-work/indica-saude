/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
import { prisma } from '@workspace/database'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromToken } from '@/lib/auth'

const referralSchema = z.object({
  patientName: z.string(),
  patientEmail: z.string().email(),
  patientPhone: z.string(),
  professionalId: z.string(),
  appointmentDate: z.string(),
  notes: z.string().optional()
})

export async function GET() {
  const user = await getUserFromToken()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const roleFilterMap: Record<string, object> = {
    INDICATOR: { indicatorId: user.id },
    PROFESSIONAL: { professionalId: user.id }
  }

  const where = roleFilterMap[user.role] ?? {}

  const referralsRaw = await prisma.referral.findMany({
    where,
    include: {
      // select:{
      // id: true,
      // patientName: true,
      // status: true,
      // scheduledDate: true,
      // scheduledTime: true,
      // indicatorId: true,
      // professionalId: true,
      professional: {
        select: {
          name: true
        }
      },
      indicator: {
        select: {
          name: true
        }
      }
    }
  })

  const referrals = referralsRaw.map((ref) => ({
    ...ref,
    professionalName: ref.professional?.name ?? null,
    indicatorName: ref.indicator?.name ?? null,
    professional: undefined,
    indicator: undefined
  }))

  return NextResponse.json({ data: referrals })
}

export async function POST(req: Request) {
  const user = await getUserFromToken()
  if (!user || user.role !== 'indicator') {
    return NextResponse.json(
      {
        error: 'Forbidden'
      },
      { status: 403 }
    )
  }

  const body = await req.json()
  const parsed = referralSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.format()
      },
      { status: 400 }
    )
  }

  const referral = await prisma.referral.create({
    data: { ...parsed.data, indicatorId: user.id } as any
  })

  return NextResponse.json(referral)
}
