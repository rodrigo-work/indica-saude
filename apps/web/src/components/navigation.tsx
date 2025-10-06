'use client'

import { Button } from '@workspace/ui/components/button'
import { ShineBorder } from '@workspace/ui/components/magicui/shine-border'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { env } from '@/env'

export const Navigation = () => {
  // if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="relative mt-0 flex w-full max-w-[380px] flex-row items-center justify-between p-0">
      <div className="text-muted-foreground text-sm">
        <Link href={'/testes'}>Testes</Link>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => redirect(`${env.NEXT_PUBLIC_APP_URL}/auth/login`)}
          size="sm"
          variant="default"
        >
          Login
        </Button>

        <Button
          className="relative"
          onClick={() => redirect(`${env.NEXT_PUBLIC_APP_URL}/auth/sign-up`)}
          size="sm"
          variant="ghost"
        >
          <ShineBorder
            borderWidth={2}
            duration={8}
            shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
          />
          Signup
        </Button>
      </div>
    </div>
  )
}
