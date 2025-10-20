'use client'

import { Button } from '@workspace/ui/components/button'
import { useRouter } from 'next/navigation'

type Status = 401 | 403 | 404

type StatusInfo = {
  title: string
  description: string
}

const statusMessages: Record<Status, StatusInfo> = {
  401: {
    title: 'Unauthorized',
    description: `You're not authorized to access this page.`
  },
  403: {
    title: 'Forbidden',
    description: 'This page could not be accessed.'
  },
  404: {
    title: `Something's missing`,
    description: `Sorry, the page you are looking for doesn't exist or has been moved.`
  }
}

export const ErrorTemplate = ({ error }: { error: Status }) => {
  const router = useRouter()

  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 mb-16 items-center justify-center text-center">
      <span className="bg-linear-to-b from-foreground to-transparent bg-clip-text font-extrabold text-[10rem] text-transparent leading-none">
        {error}
      </span>
      <h2 className="my-2 font-bold font-heading text-2xl">{statusMessages[error].title}</h2>
      <p>{statusMessages[error].description}</p>

      <div className="mt-8 flex justify-center gap-2">
        {error && error === 404 && (
          <Button onClick={() => router.back()} size="lg" variant="default">
            Go back
          </Button>
        )}
        <Button onClick={() => router.push('/')} size="lg" variant="outline">
          Back to Home
        </Button>
      </div>
    </div>
  )
}
