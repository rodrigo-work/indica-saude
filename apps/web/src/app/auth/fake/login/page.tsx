import { createMetadata } from '@workspace/seo/metadata'
import type { Metadata } from 'next'
import PageContainer from '@/components/layout/page-container'
import { getUsersFakeLogin } from './components/actions'
import { LoginForm } from './components/login-form'

export const metadata: Metadata = createMetadata({
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
})

type User = {
  name: string
  email: string
}

export default async function AuthPage() {
  const { data } = await getUsersFakeLogin()
  const users = data.map((user: User) => {
    return {
      name: user.name,
      email: user.email
    }
  })

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 min-h-lvh---">
        <div className="bg-background flex flex-col h-full items-center justify-center gap-6 p-6 md:p-10">
          <div className="w-full max-w-sm flex h-full justify-center">
            <LoginForm users={users} />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
