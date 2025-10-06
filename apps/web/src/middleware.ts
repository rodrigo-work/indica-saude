import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'chave-secreta')

// Quais rotas proteger
const protectedRoutes = ['/dashboard', '/admin']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  try {
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
