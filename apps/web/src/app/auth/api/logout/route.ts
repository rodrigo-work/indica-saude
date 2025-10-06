import { type NextRequest, NextResponse } from 'next/server'
import { settings } from '@/constants/data'

export function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL('/', req.url))
  response.cookies.set(settings.cookies.id_token, '', { maxAge: 0, path: '/' })
  return response
}

// export async function POST(req: NextRequest) {
//   try {
//     const res = NextResponse.json({ ok: true })
//     res.cookies.delete('id_token', { path: '/' })
//     res.cookies.delete('refresh_token', { path: '/' })
//     return res
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
//   }
// }
