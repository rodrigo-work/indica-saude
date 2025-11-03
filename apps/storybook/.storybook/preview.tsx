// import { ThemeProvider } from '@repo/design-system/providers/theme'
import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react'
import { Toaster } from '@workspace/ui/components/sonner'
import { TooltipProvider } from '@workspace/ui/components/tooltip'

import '@workspace/ui/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    chromatic: {
      modes: {
        light: {
          theme: 'light',
          className: 'light'
        },
        dark: {
          theme: 'dark',
          className: 'dark'
        }
      }
    }
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark'
      },
      defaultTheme: 'light'
    }),
    (Story) => (
      <div className="bg-background">
        {/* <ThemeProvider> */}
        <TooltipProvider>
          <Story />
        </TooltipProvider>
        <Toaster />
        {/* </ThemeProvider> */}
      </div>
    )
  ]
}

export default preview
