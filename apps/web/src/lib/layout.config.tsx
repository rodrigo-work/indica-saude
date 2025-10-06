import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Link from 'next/link'
import { Logo } from '@/components/layout/logo'

export const baseOptions: BaseLayoutProps = {
  links: [
    {
      text: 'About',
      url: '/#about',
      active: 'url'
    },
    {
      text: 'How It Works',
      url: '/#how-it-works',
      active: 'url'
    },
    {
      text: 'Contact',
      url: '/#contact',
      active: 'url'
    },
    {
      text: 'Documentation',
      url: '/docs/introduction',
      active: 'nested-url'
    }
    // {
    //   type: 'custom',
    //   children: (
    //     <Link className="text-xs" href="/auth/login">
    //       LOGIN
    //     </Link>
    //   ),
    //   secondary: true
    // }
  ],
  nav: {
    title: <Logo />,
    transparentMode: 'none'
  }
}
