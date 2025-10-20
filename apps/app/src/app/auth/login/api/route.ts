import { passwordGrant, verifyIdToken } from '@workspace/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password } = body || {}
    if (!username || !password) {
      return NextResponse.json({ error: 'username and password required' }, { status: 400 })
    }

    const tokens = await passwordGrant(username, password)

    if (tokens.AccessToken) {
      try {
        await verifyIdToken(tokens.IdToken)
      } catch (error) {
        return NextResponse.json({ error: 'id_token invalid after grant' }, { status: 500 })
      }
    }

    const res = NextResponse.json({ ok: true })

    res.cookies.set({
      name: 'id_token',
      value: tokens.IdToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.ExpiresIn || 3600
    })

    res.cookies.set({
      name: 'access_token',
      value: tokens.AccessToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.ExpiresIn || 3600
    })

    res.cookies.set({
      name: 'refresh_token',
      value: tokens.RefreshToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.ExpiresIn || 3600
    })

    // if (tokens.refresh_token) {
    //   res.cookies.set({
    //     name: 'refresh_token',
    //     value: tokens.refresh_token,
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     path: '/',
    //     maxAge: 60 * 60 * 24 * 30
    //   })
    // }

    return res
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
