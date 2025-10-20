import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { env } from '@/env'

export async function POST(req: NextRequest) {
  try {
    // const body = await req.json()
    // const { email, password } = body || {}
    // if (!email || !password) {
    //   return NextResponse.json({ error: 'email and password required' }, { status: 400 })
    // }

    // const results = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/sign-in`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // })

    // const tokens = await results.json()
    // if (!tokens.success) {
    //   return NextResponse.json({ error: tokens }, { status: 400 })
    // }

    const res = NextResponse.json({ ok: true })

    res.cookies.delete({
      name: 'saas_microservices_authed_user'
    })

    res.cookies.delete({
      name: 'id_token'
    })

    res.cookies.delete({
      name: 'access_token'
    })

    res.cookies.delete({
      name: 'refresh_token'
    })

    return res
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
