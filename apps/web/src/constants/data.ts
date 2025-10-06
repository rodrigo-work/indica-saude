import type { NavItem } from '@/types'

export type Product = {
  photo_url: string
  name: string
  description: string
  created_at: string
  price: number
  id: number
  category: string
  updated_at: string
}

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
    title: 'Commissions',
    url: '/dashboard/commissions',
    icon: 'logo'
  },
  {
    title: 'Referrals',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'logo',
    isActive: true,
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
    isActive: true,
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
    title: 'Indicators',
    url: '/dashboard/indicators',
    icon: 'logo',
    isActive: true,
    items: [
      {
        title: 'Home',
        url: '/dashboard/indicators',
        icon: 'logo'
      },
      {
        title: 'Referrals',
        url: '/dashboard/referrals',
        icon: 'logo'
      },
      {
        title: 'Commissions',
        url: '/dashboard/commissions',
        icon: 'logo'
      }
    ]
  },
  {
    title: 'Professionals',
    url: '/dashboard/professionals',
    icon: 'logo'
  }
]

export type SaleUser = {
  id: number
  name: string
  email: string
  amount: string
  image: string
  initials: string
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
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
