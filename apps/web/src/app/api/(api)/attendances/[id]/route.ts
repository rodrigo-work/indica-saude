import { prisma } from '@workspace/database'
import { type NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const attendance = await prisma.attendance.findUnique({ where: { id } })
  if (!attendance) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(attendance)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const attendance = await prisma.attendance.findUnique({ where: { id } })
  if (!attendance) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Professional pode atualizar status de suas próprias atendimentos, Admin todos
  if (user.role !== 'admin' && attendance.professionalId !== user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const updated = await prisma.attendance.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromToken()
  if (!user || user.role !== 'admin')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  await prisma.attendance.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
