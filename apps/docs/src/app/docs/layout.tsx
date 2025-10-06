import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      containerProps={{
        style: {
          '--fd-layout-width': '1400px'
        } as object
      }}
      sidebar={{
        collapsible: false
      }}
      themeSwitch={{ mode: 'light-dark-system' }}
    >
      {children}
    </DocsLayout>
  )
}
