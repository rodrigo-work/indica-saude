import { prisma } from '@workspace/database'
import { SignJWT } from 'jose'
import { type NextRequest, NextResponse } from 'next/server'
import { settings } from '@/constants/data'
import { env } from '@/env'

const secret = new TextEncoder().encode(env.JWT_SECRET)

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || user.password !== password) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
  }

  const token = await new SignJWT({
    sub: user.id,
    role: user.role,
    name: user.name,
    email: user.email
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)

  const response = NextResponse.json({ success: true, message: 'Login was successful' })

  response.cookies.set({
    name: settings.cookies.id_token,
    value: token,
    httpOnly: true,
    maxAge: 60 * 2, // 60 * 60 * 2, // 2 hora
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })

  return response
}
