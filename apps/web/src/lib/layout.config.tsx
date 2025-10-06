import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { Logo } from '@/components/logo'
import { Navigation } from '@/components/navigation'
import { NAVIGATION_LINKS } from '@/data'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      children: <Navigation />
    },
    links: [...NAVIGATION_LINKS]
  }
}
