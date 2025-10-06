// // import { AnalyticsProvider } from '@repo/analytics';
// // import { AuthProvider } from '@repo/auth/provider';
// import type { ThemeProviderProps } from 'next-themes'
// import { TailwindIndicator } from './components/tailwind-indicator'
// // import { Toaster } from './components/ui/sonner'
// import { TooltipProvider } from './components/ui/tooltip'

// // import ActiveThemeProvider from './providers/active-theme'
// // import { ThemeProvider } from './providers/theme'

// type DesignSystemProviderProperties = ThemeProviderProps & {
//   privacyUrl?: string
//   termsUrl?: string
//   helpUrl?: string
//   activeThemeValue?: string
// }

// export const DesignSystemProvider = ({
//   children,
//   // privacyUrl,
//   // termsUrl,
//   // helpUrl,
//   activeThemeValue,
//   ...properties
// }: DesignSystemProviderProperties) => (
//   <>
//     <ThemeProvider {...properties}>
//       {/* <AuthProvider
//         privacyUrl={privacyUrl}
//         termsUrl={termsUrl}
//         helpUrl={helpUrl}
//       > */}
//       {/* <AnalyticsProvider> */}

//       {/* <ActiveThemeProvider activeThemeValue={activeThemeValue as string}> */}
//         {/* <TooltipProvider skipDelayDuration={500}> */}
//         {children}
//         {/* </TooltipProvider> */}
//         {/* <Toaster /> */}
//       </ActiveThemeProvider>

//       {/* </AnalyticsProvider> */}
//       {/* </AuthProvider> */}
//     </ThemeProvider>
//   </>
// )

import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { RootProvider } from 'fumadocs-ui/provider/next'
import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { TailwindIndicator } from './tailwind-indicator'

export const Providers = ({ children, ...properties }: ThemeProviderProps) => (
  <RootProvider
    search={{
      enabled: false
    }}
  >
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      {...properties}
    >
      {children}
      <VercelAnalytics />
      <TailwindIndicator />
    </NextThemeProvider>
  </RootProvider>
)
