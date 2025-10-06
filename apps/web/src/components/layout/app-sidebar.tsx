'use client'

// import { useUser } from '@clerk/nextjs'
import { IconLogout, IconPhotoUp } from '@tabler/icons-react'
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
import Link from 'next/link'
// import { UserAvatarProfile } from '@/components/user-avatar-profile'
import { navMainItems, navSecondaryItems } from '@/constants/data'
import { useUser } from '@/hooks/user-context'
// import { useMediaQuery } from '@/hooks/use-media-query'
import { NavMain } from './nav-main'
import { NavSecondary } from './nav-secondary'
// import { OrgSwitcher } from '../org-switcher'

export const company = {
  name: 'Acme Inc',
  logo: IconPhotoUp,
  plan: 'Enterprise'
}

// const tenants = [
//   { id: '1', name: 'Acme Inc' },
//   { id: '2', name: 'Beta Corp' },
//   { id: '3', name: 'Gamma Ltd' }
// ]

export default function AppSidebar() {
  // const pathname = usePathname()
  // const { isOpen } = useMediaQuery()

  const { user, loading } = useUser()

  // const router = useRouter()

  // const handleSwitchTenant = (_tenantId: string) => {
  // Tenant switching functionality would be implemented here
  // }

  // const activeTenant = tenants[0]

  // React.useEffect(() => {
  // Side effects based on sidebar state changes
  // }, [isOpen])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconLogout className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <OrgSwitcher
          defaultTenant={activeTenant}
          onTenantSwitch={handleSwitchTenant}
          tenants={tenants}
        /> */}
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <NavMain items={navMainItems} />
        <NavSecondary className="mt-auto" items={navSecondaryItems} />
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-current border-b-2" />
            <span>Loading...</span>
          </div>
        ) : (
          <pre>{JSON.stringify(user)}</pre>
        )}

        {/* <NavUser user={user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
