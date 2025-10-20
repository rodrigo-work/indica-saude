import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { env } from '@/env'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body || {}
    // biome-ignore lint/suspicious/noImplicitAnyLet: Needed
    let response

    response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const tokens = await response.json()
    if (tokens.success === false) {
      return NextResponse.json(tokens, { status: 400 })
    }

    response = NextResponse.json({ ok: true, tokens })

    response.cookies.set({
      name: 'saas_microservices_authed_user',
      value: tokens.IdToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 1 * 60// tokens.ExpiresIn || 3600
    })

    response.cookies.set({
      name: 'id_token',
      value: tokens.IdToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 1 * 60 // tokens.ExpiresIn || 3600
    })

    response.cookies.set({
      name: 'access_token',
      value: tokens.AccessToken,
      httpOnly: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1 * 60 // tokens.ExpiresIn || 3600
    })

    response.cookies.set({
      name: 'refresh_token',
      value: tokens.RefreshToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 1 * 60// tokens.ExpiresIn || 3600
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
