import { type NextRequest, NextResponse } from 'next/server';
export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const _locale = pathname.split('/')[1];
    return NextResponse.next();
}
export const config = {
    matcher: '/((?!api|auth|_next/static|_next/image|favicon.ico|manifest|icon.svg|apple-icon.png).*)'
};
