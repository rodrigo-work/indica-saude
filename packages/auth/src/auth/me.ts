import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { settings } from '@/constants/data'
import { verifyIdToken } from '../lib/jwt'

/**
 * GET /api/auth/me
 */

export const AuthMe = async () => {
  const cookieStore = await cookies()

  try {
    const token = cookieStore.get(settings.cookies.id_token)?.value
    if (!token) return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
    const payload = await verifyIdToken(token)
    return NextResponse.json({ user: payload })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
