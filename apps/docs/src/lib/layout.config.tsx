import { Button } from '@workspace/ui/components/button'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { Logo } from '@/components/layout/logo'

export const baseOptions: BaseLayoutProps = {
  links: [
    {
      text: 'Home',
      url: '/',
      active: 'url'
    },
    {
      text: 'Docs',
      url: '/docs/introduction',
      active: 'nested-url'
    },
    {
      text: 'Admin',
      url: '/admin',
      active: 'url'
    },
    {
      type: 'custom',
      children: (
        <span>
          <Button size="sm" variant="default">
            Login
          </Button>
        </span>
      ),
      secondary: true
    }
  ],
  githubUrl: 'https://github.com/rodrigo-work/indica-saude',
  nav: {
    title: (
      <>
        <Logo />
      </>
    )
  }
}
