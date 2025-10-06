import { createMetadata } from '@workspace/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ShowJsonData } from '@/lib/show-json-data'
import { getUsersDeveloperLogin } from './actions'
import { LoginForm } from './components/login-form'

export const metadata: Metadata = createMetadata({
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
})

export default async function AuthPage() {
  const data = await getUsersDeveloperLogin()

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* <ShowJsonData data={data} /> */}
        <LoginForm />
      </div>
      <div className="w-full max-w-sm">
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
  )
}
