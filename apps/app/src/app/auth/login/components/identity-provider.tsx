'use client'

import { Button } from '@workspace/ui/components/button'
import { Field, FieldGroup, FieldSeparator } from '@workspace/ui/components/field'
import { Spinner } from '@workspace/ui/components/spinner'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { delay } from '@/lib/utils'

export function IdentdyProviderForm({ className, ...props }: React.ComponentProps<'form'>) {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  async function handleLoginIdp(provider: 'google' | 'apple') {
    startTransition(async () => {
      await delay(2000)

      try {
        // const res = await fetch('/auth/login/api', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(parsedValues)
        // })

        // const data = await res.json()

        toast('You submitted the following values:', {
          description: (
            <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
              <code>{JSON.stringify({ provider: provider }, null, 2)}</code>
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
      } catch (_error) {
        // setError(err.message || String(err))
      }

      // router.refresh()
    })
  }

  return (
    <div className="flex flex-col w-full sm:max-w-md mt-1 gap-6">
      <FieldGroup className="w-full">
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field className="grid gap-4 sm:grid-cols-1">
          <Button
            disabled={isPending}
            onClick={() => handleLoginIdp('google')}
            type="button"
            variant="outline"
          >
            {isPending ? (
              <Spinner />
            ) : (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>Google</title>
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
            )}
            Continue with Google
          </Button>
        </Field>
      </FieldGroup>
    </div>
  )
}
