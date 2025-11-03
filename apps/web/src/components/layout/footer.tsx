import { LogoIndicaSaude } from '@workspace/about'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'
import { Logo } from '@/components/layout/logo'
import { footerLinks } from '../../data'

export function Footer() {
  return (
    <footer className="border-b pt-20 dark:bg-transparent">
      <div className="mx-auto max-w-5xl-- px-6 flex-wrap">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Button className="text-left" variant="ghost">
              <LogoIndicaSaude />
            </Button>{' '}
            <Link aria-label="go home" className="block size-fit" href="/"></Link>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:grid-cols-3 md:col-span-3">
            {footerLinks.map((link) => (
              <div className="space-y-4 text-sm w-max-xs" key={link.group}>
                <span className="block font-medium">{link.group}</span>
                {link.items.map((item) => (
                  <Link
                    className="text-muted-foreground hover:text-primary block duration-150"
                    href={item.href}
                    key={item.title}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} <span className="font-semibold">{`//rodrigo.work`}</span>,
            All rights reserved.
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            <span className="text-muted-foreground block text-center text-sm md:text-left">
              <span>status</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
