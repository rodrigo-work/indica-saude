import '@/styles/globals.css'

import { createMetadata } from '@workspace/seo/metadata'
import { Toaster } from '@workspace/ui/components/sonner'
import { cn } from '@workspace/ui/lib/utils'
import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'
import Providers from '@/components/layout/providers'
import { settings } from '@/constants/data'
import { fontVariables } from '@/lib/fonts'
import { verifyToken } from '@/lib/verifyToken'
import type { Profile } from '@/types/profile'

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
}

export const metadata: Metadata = createMetadata({
  // title: '',
  description: 'Indica Saúde, a digital health platform.'
})

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const activeThemeValue = cookieStore.get('active_theme')?.value
  const isScaled = activeThemeValue?.endsWith('-scaled')

  const cookieIDP = cookieStore.get(settings.cookies.id_token)?.value || ''

  let user: Profile | any | null = null

  if (cookieIDP) {
    try {
      const payload: Profile | any = await verifyToken(cookieIDP)
      user = payload
    } catch {
      user = null
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: No need to escape
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'overflow-hidden overscroll-none bg-background font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        <NextTopLoader color="var(--primary)" showSpinner={false} />

        <Providers activeThemeValue={activeThemeValue as string} initialUser={user}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
