// import SearchInput from '../search-input'
import { Separator } from '@workspace/ui/components/separator'
import { SidebarTrigger } from '@workspace/ui/components/sidebar'
import { Breadcrumbs } from '../breadcrumbs'
import CtaGithub from '../cta-github'
import { ThemeSelector } from '../theme-selector'
import { ModeToggle } from './ThemeToggle/theme-toggle'
// import { UserNav } from './user-nav'

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="mr-2 h-4" orientation="vertical" />
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2 px-4">
        <CtaGithub />
        <div className="hidden md:flex">{/* <SearchInput /> */}</div>
        {/* <UserNav /> */}
        <ModeToggle />
        <ThemeSelector />
      </div>
    </header>
  )
}
