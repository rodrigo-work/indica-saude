import { createMetadata } from '@workspace/seo/metadata'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ConditionalContainer } from '@/components/conditional-container'
import { baseOptions } from '@/lib/layout.config'
import { source } from '@/lib/source'

type DocLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = createMetadata({
  title: '',
  description: 'Indica Saúde, a digital health platform.'
})

export default function DocLayout({ children }: DocLayoutProps) {
  return (
    <ConditionalContainer>
      <DocsLayout
        {...baseOptions}
        containerProps={{}}
        nav={{
          ...baseOptions.nav,
          mode: 'top'
        }}
        sidebar={{ collapsible: false }}
        tabMode="navbar"
        themeSwitch={{ enabled: false }}
        tree={source.pageTree}
      >
        {children}
      </DocsLayout>
    </ConditionalContainer>
  )
}
