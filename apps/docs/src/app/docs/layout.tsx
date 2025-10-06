import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { getLinks } from 'fumadocs-ui/layouts/shared'
import { Header } from '@/components/header'
import { baseOptions, linkItems } from '@/lib/layout.shared'
import { source } from '@/lib/source'

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const { nav, ...base } = baseOptions()

  return (
    <DocsLayout
      containerProps={{
        style: {
          '--fd-page-width': '80%'
          // '--fd-layout-width': '1200px'
          // '--spacing-fd-container': '1120px'
        } as object
      }}
      tree={source.pageTree}
      {...base}
      links={linkItems}
      nav={{
        ...nav
        // mode: 'top',
        // component: <Header finalLinks={getLinks(linkItems, base.githubUrl)} {...base} />
      }}
      sidebar={{
        collapsible: false
      }}
      // tabMode={'navbar'}
    >
      {children}
    </DocsLayout>
  )
}
