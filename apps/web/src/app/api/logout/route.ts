import { NextResponse } from 'next/server'

export function GET() {
  const response = NextResponse.redirect(new URL('/auth/login', 'http://localhost:3000'))
  response.cookies.set('token', '', { maxAge: 0, path: '/' })
  return response
}
