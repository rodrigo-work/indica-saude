import { type NextRequest, NextResponse } from 'next/server'

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const _locale = pathname.split('/')[1]

  // if (pathname === `/${locale}` || pathname === `/${locale}/`) {
  //   return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
  // }

  // if (req.cookies.has(settings.cookies.id_token) && !pathname.includes(`/${locale}/dashboard`)) {
  //   return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher:
    '/((?!api|legal|_next/static|_next/image|favicon.ico|manifest|icon.svg|apple-icon.png).*)'
}
