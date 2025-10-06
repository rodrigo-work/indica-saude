'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// Specifically used to handle the layout of the home page vs rest of the pages since all are rendered by the same layout
export function ConditionalContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  let isHomePage = pathname === '/'
  isHomePage = isHomePage || pathname === '/index'

  return <div className={isHomePage ? 'home' : ''}>{children}</div>
}
