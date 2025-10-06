import { prisma } from '@workspace/database'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getUserFromToken } from '@/lib/auth'

const attendanceSchema = z.object({
  referralId: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'NO_SHOW', 'CANCELLED']),
  notes: z.string().optional()
})

export async function GET() {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const where =
    user.role === 'professional' ? { professionalId: user.id } : user.role === 'indicator' ? {} : {} // admin vê todos

  const attendances = await prisma.attendance.findMany({
    where,
    include: { referral: true, professional: true }
  })

  return NextResponse.json(attendances)
}

export async function POST(req: NextRequest) {
  const user = await getUserFromToken()
  if (!user || user.role !== 'professional')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const parsed = attendanceSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

  const attendance = await prisma.attendance.create({
    data: {
      ...parsed.data,
      professionalId: user.id
    }
  })

  return NextResponse.json(attendance)
}
