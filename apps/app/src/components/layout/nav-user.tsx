'use client'

import { IconUserCircle } from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@workspace/ui/components/sidebar'
import { Skeleton } from '@workspace/ui/components/skeleton'
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react'
import { RedirectType, redirect, useRouter } from 'next/navigation'
import { logout } from '@/lib/utils'
import type { Profile } from '@/types/profile'

export function NavUser({ user, isLoading }: { user: Profile | null; isLoading: boolean }) {
  const router = useRouter()
  const { isMobile } = useSidebar()

  const handleLogout = async () => {
    // await logout(setUser)
    // router.push('/login')
  }

  return (
    <SidebarMenu className="data-[state=open]:bg-sidebar-primary data-[state=open]:text-sidebar-primary-foreground">
      <SidebarMenuItem>
        <DropdownMenu modal={true}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              {!isLoading ? (
                <div className="flex items-center">
                  <Skeleton className="h-9 w-9 rounded-full bg-zinc-200" /> {/* Avatar */}
                  <div className="ml-4 space-y-1">
                    <Skeleton className="h-4 w-[120px] bg-zinc-200" /> {/* Name */}
                    <Skeleton className="h-4 w-40 bg-zinc-200" /> {/* Email */}
                  </div>
                </div>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage alt={user?.name} src={user?.picture || `/images/user.png`} />
                    <AvatarFallback className="rounded-lg bg-white">
                      <IconUserCircle className="h-8 w-8" />
                      {/* {user?.name?.slice(0, 2)?.toUpperCase() || 'CN'} */}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={user?.name} src={user?.picture ?? `images/user.png`} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                by https://rodrigo.work
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = '/dashboard/settings'
                }}
              >
                <BadgeCheck />
                Account / Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                redirect('/auth/logout', RedirectType.replace)
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
