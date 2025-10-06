import { prisma } from '@workspace/database'
import { type NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const referral = await prisma.referral.findUnique({ where: { id } })

  if (!referral) {
    return NextResponse.json(
      {
        error: {
          code: 404,
          message: 'Not found'
        }
      },
      { status: 404 }
    )
  }

  if (user.role === 'indicator' && referral.indicatorId !== user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  if (user.role === 'professional' && referral.professionalId !== user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  return NextResponse.json(referral)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const referral = await prisma.referral.findUnique({ where: { id } })

  if (!referral) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const updated = await prisma.referral.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  await prisma.referral.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
