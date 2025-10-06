import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import type { ReactNode } from 'react'
import { ConditionalContainer } from '@/components/conditional-container'
import { Footer } from '@/components/footer'
import { baseOptions } from '@/lib/layout.config'
import { source } from '@/lib/source'

type DocsLayoutProps = {
  children: ReactNode
}

export default async function DocLayout({ children }: DocsLayoutProps) {
  const { nav } = baseOptions()

  return (
    <ConditionalContainer>
      <DocsLayout
        containerProps={{
          style: {
            // '--fd-page-width': '100%',
            // '--fd-layout-width': '1400px'
            // '--spacing-fd-container': '1120px'
          } as object
        }}
        {...baseOptions()}
        nav={{
          ...nav,
          mode: 'top'
        }}
        sidebar={{ collapsible: false }}
        tabMode="navbar"
        themeSwitch={{
          enabled: true,
          mode: 'light-dark-system'
        }}
        tree={source.pageTree}
      >
        {children}
      </DocsLayout>

      <Footer />
    </ConditionalContainer>
  )
}
