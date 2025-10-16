import { type NextRequest, NextResponse } from 'next/server'
import { settings } from './constants/data'
import { verifyIdToken } from './lib/jwt'

/**
 * Example middleware function to protect Next.js App Router pages.
 * Use it in apps/webapp/middleware.ts to call this shared function.
 */
export async function authMiddleware(req: NextRequest) {
  try {
    const token = req.cookies.get(settings.cookies.id_token)?.value
    if (!token) return NextResponse.redirect(new URL('/', req.url))
    await verifyIdToken(token)
    return NextResponse.next()
  } catch (error) {
    console.warn(error)
    return NextResponse.redirect(new URL('/', req.url))
  }
}
