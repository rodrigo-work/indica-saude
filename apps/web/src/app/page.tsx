'use client'

import { Button } from '@workspace/ui/components/button'
import { Spinner } from '@workspace/ui/components/spinner'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/user-context'

export default function Page() {
  const router = useRouter()
  const { user, loading } = useUser()

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-2xl">Hello World</h1>
        <Button onClick={() => router.push('/dashboard')} size="sm">
          Dashboard
        </Button>
        {loading && loading ? (
          <div className="flex items-center gap-2">
            <Spinner />
          </div>
        ) : (
          <pre className="whitespace-pre-wrap rounded-md border border-yellow-400 bg-yellow-200 p-4 text-xs">
            {JSON.stringify(user, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
