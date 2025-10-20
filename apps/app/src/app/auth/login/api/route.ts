import { verifyIdToken } from '@workspace/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body || {}
    if (!email || !password) {
      return NextResponse.json({ error: 'email and password required' }, { status: 400 })
    }

    const results = await fetch('http://localhost:5001/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const tokens = await results.json()
    // if (!tokens.success) {
    //   return NextResponse.json({ error: tokens }, { status: 400 })
    // }

    const res = NextResponse.json({ ok: true })

    res.cookies.set({
      name: 'saas_microservices_authed_user',
      value: tokens.IdToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.ExpiresIn || 3600
    })

    res.cookies.set({
      name: 'id_token',
      value: tokens.IdToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 2 * 60 // tokens.ExpiresIn || 3600
    })

    res.cookies.set({
      name: 'access_token',
      value: tokens.AccessToken,
      httpOnly: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 2 * 60 // tokens.ExpiresIn || 3600
    })

    res.cookies.set({
      name: 'refresh_token',
      value: tokens.RefreshToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.ExpiresIn || 3600
    })

    return res
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
