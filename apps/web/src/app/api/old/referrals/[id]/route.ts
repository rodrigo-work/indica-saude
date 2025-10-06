import { NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'
import { database as prisma } from '@/lib/database'

export async function GET(req: Request) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = (req as any).params || {}
  const referral = await prisma.referral.findUnique({ where: { id } })
  if (!referral) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (user.role === 'INDICATOR' && referral.indicatorId !== user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (user.role === 'PROFESSIONAL' && referral.professionalId !== user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  return NextResponse.json(referral)
}

export async function PUT(req: Request) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = (req as any).params || {}
  const body = await req.json()
  const updated = await prisma.referral.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request) {
  const user = await getUserFromToken()
  if (!user || user.role !== 'ADMIN')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = (req as any).params || {}
  await prisma.referral.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
