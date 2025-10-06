import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { IndicaSaudeIcon } from '@/components/logo'

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/rodrigo-work/indica-saude',
    nav: {
      title: (
        <>
          <IndicaSaudeIcon height={38} width={38} />
          <span className="whitespace-pre-line text-sm leading-tight">{`Indica Saúde\nDocumentation`}</span>
        </>
      )
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: []
  }
}
