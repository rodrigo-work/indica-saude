'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@workspace/ui/components/sidebar'
import { RedirectType, redirect } from 'next/navigation'
import { useEffect } from 'react'
import {
  navAccountItems,
  navMainItems,
  navManagementItems,
  navSecondaryItems
} from '@/constants/data'
import { useUser } from '@/contexts/UserProvider'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Logo } from '../logo'
import { NavMain } from './nav-main'
import { NavSecondary } from './nav-secondary'
import { NavUser } from './nav-user'

export default function AppSidebar() {
  // const pathname = usePathname()
  const { isOpen } = useMediaQuery()

  const { user, isLoading } = useUser()

  const handlerLogo = () => {
    redirect('/', RedirectType.replace)
  }

  useEffect(() => {
    if (isOpen) {
      alert('open')
    }
    // Side effects based on sidebar state changes
  }, [isOpen])

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => handlerLogo()} size="lg" variant="default">
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <NavMain items={navMainItems} />
        <NavMain items={navManagementItems} title="Management" />

        <NavMain items={navAccountItems} title="User Account" />

        <NavSecondary className="mt-auto" items={navSecondaryItems} title="Others" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser isLoading={isLoading} user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
