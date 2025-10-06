import { Toaster } from '@workspace/ui/components/sonner'
import '@/styles/globals.css'
import { PromptInputProvider } from '@workspace/ui/components/ai-elements/prompt-input'
import { cn } from 'fumadocs-ui/utils/cn'
import type { Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: 'variable'
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: 'variable'
})

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
}

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
}

type RootLayoutProps = {
  readonly children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={cn('touch-manipulation font-sans antialiased', sans.variable, mono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
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
      <body className="flex min-h-screen flex-col bg-background">
        <Providers>
          <PromptInputProvider initialInput="">{children}</PromptInputProvider>

          <Toaster duration={6} position="top-center" />
        </Providers>
      </body>
    </html>
  )
}
