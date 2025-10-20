import { NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'

export async function GET() {
  const user = await getUserFromCookie()
  if (!user || user.role !== 'SUPERADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const response = NextResponse.json({ data: user })

  return response
}
