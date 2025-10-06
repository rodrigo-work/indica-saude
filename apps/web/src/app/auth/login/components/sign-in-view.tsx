import { buttonVariants } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SETTINGS } from '@/constants/data'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
}

export default function SignInViewPage({ stars = 0 }: { stars: number }) {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
        href="/examples/authentication"
      >
        Login {stars}
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center font-medium text-lg">
          <svg
            className="mr-2 h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Logo</title>
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          {SETTINGS.APP_NAME}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This starter template has saved me countless hours of work and helped me
              deliver projects to my clients faster than ever before.&rdquo;
            </p>
            <footer className="text-sm">Random Dude</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center justify-center p-4 lg:p-8">
        <div className="flex w-full max-w-md flex-col items-center justify-center space-y-6">
          {/* github link  */}
          <Link
            className={cn('group inline-flex hover:text-yellow-200')}
            href={'https://github.com/rodrigo-work/indica-saude'}
            target="_blank"
          >
            {/* <div className="flex items-center">
              <GitHubLogoIcon className="size-4" />
              <span className="ml-1 inline">Star on GitHub</span>{' '}
            </div> */}
            {/* <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <IconStar
                className="size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300"
                fill="currentColor"
              />
              <span className="font-display font-medium">{stars}</span>
            </div> */}
          </Link>
          <LoginForm />
          {/* <ClerkSignInForm
            initialValues={{
              emailAddress: 'your_mail+clerk_test@example.com'
            }}
          /> */}

          <p className="px-8 text-center text-muted-foreground text-sm">
            By clicking continue, you agree to our{' '}
            <Link className="underline underline-offset-4 hover:text-primary" href="/terms">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link className="underline underline-offset-4 hover:text-primary" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
