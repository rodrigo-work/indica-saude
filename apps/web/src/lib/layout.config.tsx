import { LogoIndicaSaude } from '@workspace/about'
import { Button } from '@workspace/ui/components/button'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Link from 'next/link'

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
    title: (
      // <Button className="text-left ml-0" variant="ghost">
      <LogoIndicaSaude />
      // </Button>
    ),
    transparentMode: 'none'
  }
}
