'use client'
// import { ClerkProvider } from '@clerk/nextjs'
// import { dark } from '@clerk/themes'
// import { useTheme } from 'next-themes'
import type { ReactNode } from 'react'
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider'
import { UserProvider } from '@/contexts/UserProvider'
import type { Profile } from '@/types/profile'
import { ActiveThemeProvider } from '../active-theme'

export default function Providers({
  children,
  initialUser,
  activeThemeValue
}: {
  children: ReactNode
  initialUser: Profile | null
  activeThemeValue?: string
}) {
  // we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
  // const { resolvedTheme } = useTheme()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <UserProvider initialUser={initialUser}>
          {/* <ClerkProvider
          appearance={{
            baseTheme: resolvedTheme === 'dark' ? dark : undefined
          }}
        > */}
          {children}
          {/* </ClerkProvider> */}
        </UserProvider>
      </ActiveThemeProvider>
    </ThemeProvider>
  )
}
