'use client'

// import { useUser } from '@clerk/nextjs'
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
import { navMainItems, navManagementItems, navSecondaryItems } from '@/constants/data'
import { IndicaSaudeIcon } from '../logo'
// import { useMediaQuery } from '@/hooks/use-media-query'
import { NavMain } from './nav-main'
import { NavSecondary } from './nav-secondary'
import { NavUser } from './nav-user'

export default function AppSidebar() {
  // const pathname = usePathname()
  // const { isOpen } = useMediaQuery()

  // const router = useRouter()

  // React.useEffect(() => {
  // Side effects based on sidebar state changes
  // }, [isOpen])

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="sm">
              {/* <RepoLogo /> */}
              {/* <IndicaSaudeIcon width={42} /> */}
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary-- text-sidebar-primary-foreground">
                  {/* <IconLogout className="size-4" /> */}
                  <IndicaSaudeIcon height={120} width={120} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Indica Saúde</span>
                  <span className="">Application Referral System</span>
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
        <NavMain items={navManagementItems} title="Management" />

        <NavSecondary className="mt-auto" items={navSecondaryItems} title="Others" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
