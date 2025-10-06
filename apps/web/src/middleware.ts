import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { settings } from './constants/data'

// import { verifyToken } from './lib/verifyToken'

const COOKIE_IDP_NAME = settings.cookies.id_token

export const config = {
  matcher: [
    '/((?!api|dashboard/*|auth/*|_next/static|_next/image|images|manifest.*|favicon.ico|icon.svg|apple-icon.png|sw.js).*)'
  ]
}

export async function middleware(req: NextRequest) {
  // let lang

  // if (req.cookies.has(COOKIE_NAME)) lang = acceptLanguage.get(req.cookies.get(COOKIE_NAME)?.value)
  // if (!lang) lang = acceptLanguage.get(req.headers.get('Accept-Language'))
  // if (!lang) lang = DEFAULT_LANGUAGE

  // if (
  //   !LANGUAGES.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
  //   !req.nextUrl.pathname.startsWith('/_next')
  // ) {
  //   return NextResponse.redirect(new URL(`/${lang}${req.nextUrl.pathname}`, req.url))
  // }

  if (req.url) {
    const refererUrl = new URL(req.url ?? '')
    // const langInReferer = LANGUAGES.find((l) => refererUrl.pathname.startsWith(`/${l}`))

    // const token = req.cookies.get(settings.cookies.id_token)?.value
    // if (!token) {
    //   return NextResponse.redirect(new URL(`/auth/login`, req.url))
    // }

    // const payload = await verifyToken(token)
    // if (!payload) {
    //   return NextResponse.redirect(new URL(`/auth/login`, req.url))
    // }

    if (!req.cookies.has(COOKIE_IDP_NAME) && !req.nextUrl.pathname.includes(`/auth`)) {
      // const response = NextResponse.redirect(new URL(`/${langInReferer ?? lang}/auth/login`, req.url))
      const response = NextResponse.redirect(new URL(`/auth/login`, req.url))

      // if (langInReferer) response.cookies.set(COOKIE_NAME, langInReferer)
      return response
    }

    if (req.cookies.has(COOKIE_IDP_NAME) && !req.nextUrl.pathname.includes(`/dashboard`)) {
      // const response = NextResponse.redirect(new URL(`/${langInReferer ?? lang}/app`, req.url))
      const response = NextResponse.redirect(new URL(`/dashboard`, req.url))

      // if (langInReferer) response.cookies.set(COOKIE_NAME, langInReferer)

      return response
    }

    const response = NextResponse.next()

    if (req.cookies.has(COOKIE_IDP_NAME))
      response.cookies.set(COOKIE_IDP_NAME, req.cookies.get(COOKIE_IDP_NAME)?.value ?? '')

    return response
  }

  if (!req.cookies.has(COOKIE_IDP_NAME) && !req.nextUrl.pathname.includes(`/auth`)) {
    return NextResponse.redirect(new URL(`/auth/login`, req.url))
  }

  if (req.cookies.has(COOKIE_IDP_NAME) && !req.nextUrl.pathname.includes(`/dashboard`)) {
    return NextResponse.redirect(new URL(`/dashboard`, req.url))
  }

  return NextResponse.next()
}

// export const config = {
//   matcher: [
//     '/((?!api/*|auth/*|dashboard/*|_next/static|_next/image|manifest.*|favicon.ico|icon.svg|apple-icon.png|sw.js).*)'
//   ]
// }
