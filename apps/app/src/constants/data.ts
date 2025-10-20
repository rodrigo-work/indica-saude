import type { NavItem } from '@/types'

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navMainItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard'
  },
  {
    title: 'Website',
    url: 'https://indica-saude-copy-b0453b20.base44.app',
    icon: 'dashboard',
    external: true
  },
  {
    title: 'Documentation',
    url: 'https://is.rodrigo.work/docs/introduction',
    icon: 'dashboard',
    external: true
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: 'dashboard'
  },
  {
    title: 'Tasks',
    url: '/dashboard/tasks',
    icon: 'dashboard'
  }
]

export const navSecondaryItems: NavItem[] = [
  {
    title: 'Demo',
    url: 'https://indica-saude-copy-b0453b20.base44.app',
    icon: 'logo',
    external: true
  },
  {
    title: 'Documentation',
    url: 'https://indica-saude-docs.vercel.app',
    icon: 'logo',
    external: true
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

export const navUserProfileItems: NavItem[] = [
  {
    title: 'Account',
    url: '/dashboard/settings/account',
    icon: 'userPen'
  },
  {
    title: 'Security',
    url: '/dashboard/settings/security',
    icon: 'logo'
  },
  {
    title: 'Notifications',
    url: '/dashboard/settings/notifications',
    icon: 'logo'
  },
  {
    title: 'Privacy',
    url: '/dashboard/settings/privacy',
    icon: 'logo'
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
}
