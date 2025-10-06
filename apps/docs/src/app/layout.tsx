import { Footer } from '@/components/footer'
import '@/styles/global.css'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin']
})

export default function LayoutRoot({ children }: { children: ReactNode }) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-dvh">
        {/* <Banner changeLayout={true} id="is-dev">
          Hello World
        </Banner> */}
        <RootProvider>
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  )
}
