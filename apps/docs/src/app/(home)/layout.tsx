import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { getLinks } from 'fumadocs-ui/layouts/shared'
import type { ReactNode } from 'react'
import { Header } from '@/components/header'
import { baseOptions, linkItems } from '@/lib/layout.shared'

export default function LayoutHome({ children }: { children: ReactNode }) {
  const { ...base } = baseOptions()

  return (
    <HomeLayout
      {...base}
      nav={{
        component: <Header finalLinks={getLinks(linkItems, base.githubUrl)} {...base} />
      }}
    >
      {children}
    </HomeLayout>
  )
}
