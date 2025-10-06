import type { LinkItemType } from 'fumadocs-ui/layouts/links'

export const NAVIGATION_LINKS: LinkItemType[] = [
  {
    text: 'Home',
    url: '/',
    active: 'nested-url'
  },
  {
    text: 'How it Works',
    url: '/?#how-it-works',
    active: 'nested-url'
  },
  {
    text: 'Agent',
    url: '/?#agent',
    active: 'nested-url'
  },
  {
    text: 'Docs',
    url: '/docs/introduction',
    active: 'nested-url'
  }
]
