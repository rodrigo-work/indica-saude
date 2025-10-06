import { ScrollArea } from '@workspace/ui/components/scroll-area'
import type { ReactNode } from 'react'

export default function PageContainer({
  children,
  scrollable = true
}: {
  children: ReactNode
  scrollable?: boolean
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-92px)] border-2 border-red-200">
          <div className="flex mx-auto-- max-w-6xl-- flex-1 p-4 md:px-6">{children}</div>
        </ScrollArea>
      ) : (
        <main className="h-[calc(100dvh-22px)] border-2 border-red-200">
          <div className="flex mx-auto-- max-w-6xl-- flex-1 p-4 md:px-6">{children}</div>
        </main>
      )}
    </>
  )
}
