import { type NextRequest, NextResponse } from 'next/server'
import { settings } from '@/constants/data'
import { verifyToken } from '@/lib/verifyToken'
import type { Profile } from '@/types/profile'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(settings.cookies.id_token)?.value

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const payload: Profile | any = await verifyToken(token)

    return NextResponse.json(payload)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
