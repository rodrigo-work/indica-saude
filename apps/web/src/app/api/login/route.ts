import { prisma } from '@workspace/database'
import { SignJWT } from 'jose'
import { type NextRequest, NextResponse } from 'next/server'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'chave-secreta')

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
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

  const response = NextResponse.json({ message: 'Login realizado com sucesso' })

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 2, // 2 horas
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  return response
}
