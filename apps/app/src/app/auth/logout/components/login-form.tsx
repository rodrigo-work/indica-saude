'use client'

import { Spinner } from '@workspace/ui/components/spinner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { env } from '@/env'

export function LogoutForm() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      await fetch('/auth/logout/api', { method: 'POST' })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          toast('You submitted the following values:', {
            description: (
              <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
            position: 'bottom-right',
            classNames: {
              content: 'flex flex-col gap-2'
            },
            style: {
              '--border-radius': 'calc(var(--radius)  + 4px)'
            } as React.CSSProperties
          })
        })
        .then((result) => {
          // if (result?.ok) {
          router.push(`${env.NEXT_PUBLIC_WEB_URL}`)
          // }
        })
        .catch(() => {})
    }, 2500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col w-full sm:max-w-md gap-6">
      <div className="w-full">
        <div className="flex flex-1 justify-center">
          <Spinner />
        </div>
      </div>
    </div>
  )
}
