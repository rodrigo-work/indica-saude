import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared'
import { Newspaper, Rss, Tags, User } from 'lucide-react'
import { IndicaSaudeIcon, RepoLogo } from '@/components/logo'

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <IndicaSaudeIcon height={32} width={32} />
        </>
      )
    },
    githubUrl: 'https://github.com/rodrigo-work/indica-saude'
  }
}

export const linkItems: LinkItemType[] = [
  {
    icon: <Newspaper />,
    text: 'Docs',
    url: '/docs',
    active: 'url'
  },
  {
    text: 'Dashboard',
    url: '/dashboard',
    active: 'nested-url',
    external: true
  }
  // {
  //   type: 'custom',
  //   secondary: true,
  //   children: (
  //     <>
  //       <p>Indica Saúde</p>
  //     </>
  //   )
  // }
]
