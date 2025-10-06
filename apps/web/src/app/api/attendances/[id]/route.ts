import { NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'
import { database as prisma } from '@/lib/database'

export async function GET(req: Request) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = (req as any).params || {}
  const attendance = await prisma.attendance.findUnique({ where: { id } })
  if (!attendance) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(attendance)
}

export async function PUT(req: Request) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = (req as any).params || {}
  const attendance = await prisma.attendance.findUnique({ where: { id } })
  if (!attendance) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (user.role !== 'ADMIN' && attendance.professionalId !== user.id)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await req.json()
  const updated = await prisma.attendance.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request) {
  const user = await getUserFromToken()
  if (!user || user.role !== 'ADMIN')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = (req as any).params || {}
  await prisma.attendance.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
