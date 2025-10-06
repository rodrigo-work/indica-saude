import '@/styles/global.css'
import { Banner } from 'fumadocs-ui/components/banner'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin']
})

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Banner
          changeLayout={false}
          id="is-dev"
          rainbowColors={[
            'rgba(255,100,0, 0.5)',
            'rgba(255,100,0, 0.5)',
            'transparent',
            'rgba(255,100,0, 0.5)',
            'transparent',
            'rgba(255,100,0, 0.5)',
            'transparent'
          ]}
          variant="rainbow"
        >
          Hello World
        </Banner>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
