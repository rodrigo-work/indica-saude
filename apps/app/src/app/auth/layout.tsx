import { createMetadata } from '@workspace/seo/metadata'
import { GalleryVerticalEnd } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { env } from '@/env'

export const metadata: Metadata = createMetadata({
  title: 'Authentication',
  description: 'Authentication application'
})

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link className="flex items-center gap-2 font-medium" href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
          <div className="w-full max-w-sm py-8">
            <p className="px-8 text-center text-muted-foreground text-sm">
              By clicking continue, you agree to our{' '}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                href={`${env.NEXT_PUBLIC_WEB_URL}/terms`}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                href={`${env.NEXT_PUBLIC_WEB_URL}/privacy`}
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        {/* <Image
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          height={720}
          src="/placeholder.svg"
          width={1280}
        /> */}
      </div>
    </div>
  )
}
