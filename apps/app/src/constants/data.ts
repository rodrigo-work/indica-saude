import { env } from '@/env'
import type { NavItem } from '@/types'

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navMainItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard'
  }
]

export const navManagementItems: NavItem[] = [
  {
    title: 'Referrals',
    url: '/dashboard/referrals',
    icon: 'logo'
  },
  {
    title: 'Users referrals',
    url: '/dashboard/referrals-user',
    icon: 'logo'
  }
]

export const navAccountItems: NavItem[] = [
  {
    title: 'Account',
    url: '/dashboard/settings',
    icon: 'user'
  }
  // {
  //   title: 'Security',
  //   url: '/dashboard/settings/security',
  //   icon: 'logo'
  // },
  // {
  //   title: 'Notifications',
  //   url: '/dashboard/settings/notifications',
  //   icon: 'logo'
  // },
  // {
  //   title: 'Privacy',
  //   url: '/dashboard/settings/privacy',
  //   icon: 'logo'
  // }
]

export const navSecondaryItems: NavItem[] = [
  {
    title: 'AWS',
    url: `https://us-east-1.admin.amplifyapp.com/admin/d17rog5e8ayxlh/dev`,
    icon: 'amazon',
    external: true
  },
  {
    title: 'Demo',
    url: 'https://indica-saude-copy-b0453b20.base44.app',
    icon: 'bookOff',
    external: true
  },
  {
    title: 'Website',
    url: `${env.NEXT_PUBLIC_WEB_URL}`,
    icon: 'world',
    external: true
  },

  {
    title: 'Documentation',
    url: `${env.NEXT_PUBLIC_WEB_URL}/docs/introduction`,
    icon: 'book',
    external: true
  }
]

export const settings = {
  navbar: {},
  site: {
    name: 'rodrigo.work',
    short_name: 'rodrigo-work',
    description: 'website, docs, packages, examples, solutions and others',
    url: 'https://rodrigo.work',
    email: 'me@rodrigo.work'
  },
  docs: {
    github: {
      owner: 'rodrigo-work',
      repo: 'rodrigo-work',
      branch: 'develop'
    }
  },
  cookies: {
    id_token: 'id_token',
    access_token: 'access_token',
    refresh_token: 'refresh_token'
  },
  PRIVACY_POLICY_AND_TERMS_OF_USE: {
    NAME: 'RODRIGO.WORK',
    EMAIL: 'me@rodrigo.work',
    CONTACT_NAME: 'Rodrigo Ribeiro',
    ADDRESS: {
      CITY: 'São José dos Campos',
      STATE: 'SP',
      COUNTRY: 'Brazil'
    },
    PRODUCTS: ['Auth Platform', 'API Platform', 'Serverless Platform'],
    LAST_UPDATED: '1984-02-23'
  },
  name: 'RODRIGO.WORK',
  title: ` rodrigo.work `,
  description: 'website, docs, packages, examples, solutions and others'
} as const
