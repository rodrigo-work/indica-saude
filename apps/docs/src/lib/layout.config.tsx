import { Button } from '@workspace/ui/components/button'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { Icon } from '@/components/layout/logo'

export const baseOptions: BaseLayoutProps = {
  links: [
    {
      text: 'Home',
      url: '/',
      active: 'nested-url'
    },
    {
      text: 'Docs',
      url: '/docs/introduction',
      active: 'nested-url'
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
    },
    {
      text: 'Features',
      url: '#features',
      active: 'nested-url'
    }
  ],
  githubUrl: 'https://github.com/rodrigo-work/indica-saude',
  nav: {
    title: (
      <Button asChild variant="ghost">
        <span>
          <Icon className="size-7" />
          <div className="flex flex-col -gap-0.9 leading-none">
            <span className="font-semibold text-md tracking-tight">Indica Saúde</span>
            <span className="text-xs">Application Referral</span>
          </div>
        </span>
      </Button>
    )
  }
}
