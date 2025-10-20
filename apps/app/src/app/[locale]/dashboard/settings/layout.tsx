import { Separator } from '@workspace/ui/components/separator'
import type { Metadata } from 'next'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { SidebarNav } from './sidebar-nav'

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.'
}

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/examples/forms'
  },
  {
    title: 'Account',
    href: '/examples/forms/account'
  },
  {
    title: 'Appearance',
    href: '/examples/forms/appearance'
  },
  {
    title: 'Notifications',
    href: '/examples/forms/notifications'
  },
  {
    title: 'Display',
    href: '/examples/forms/display'
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 mb-20">
        <div className="flex items-center justify-between gap-2">
          <Heading
            description="Manage referrals (Server side table functionalities.)"
            title="Referrals"
          />
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-5xl">{children}</div>
        </div>
        {/* <SettingsPage /> */}
        {/* {JSON.stringify(data)} */}
      </div>
    </PageContainer>
  )
}
