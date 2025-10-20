import type { NavItem } from '@/types'

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navMainItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Testes',
    url: '/dashboard/testes',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },

  {
    title: 'Referrals',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'logo',
    isActive: false,
    items: [
      {
        title: 'Tasks',
        url: '/dashboard/tasks',
        icon: 'userPen'
      },
      {
        title: 'Listing',
        url: '/dashboard/referrals'
      },
      {
        title: 'Logout',
        url: '/api/logout',
        icon: 'logo'
      }
    ]
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'logo',
    isActive: false,
    items: [
      {
        title: 'Users',
        url: '/dashboard/users',
        icon: 'userPen'
      },
      {
        title: 'Login',
        url: '/auth/login',
        icon: 'login'
      },
      {
        title: 'Logout',
        url: '/auth/api/logout',
        icon: 'logo'
      }
    ]
  }
]

export const navSecondaryItems: NavItem[] = [
  {
    title: 'Auth',
    url: '/auth',
    icon: 'logo'
  },
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
    title: 'Attendances',
    url: '/dashboard/attendances',
    icon: 'logo'
  },
  {
    title: 'Payments',
    url: '/dashboard/payments',
    icon: 'userPen'
  },
  {
    title: 'Commissions',
    url: '/dashboard/commissions',
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
    id_token: 'id_token'
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
