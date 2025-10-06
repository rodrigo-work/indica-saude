import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type LogoProps = {
  title?: string
  size?: 'large' | 'medium' | 'smmall'
}

export const Logo = ({ title = 'Application Referral', size = 'medium' }: LogoProps) => (
  <div className="flex flex-row items-center gap-1" style={{ display: 'flex' }}>
    <Icon
      className={cn(
        'text-primary',
        size === 'large' && 'size-7.5',
        size === 'medium' && `size-6.5`,
        size === 'smmall' && `size-5.5`
      )}
    />
    <div className="-space-y-1 flex flex-col leading-none">
      <span
        className={cn(
          'font-semibold tracking-tight',
          size === 'large' && 'text-lg',
          size === 'medium' && `text-md`,
          size === 'smmall' && `text-sm`
        )}
      >
        Indica Saúde
      </span>
      <span
        className={cn(
          'text-muted-foreground text-xs',
          size === 'large' && 'text-md',
          size === 'medium' && `text-sm`,
          size === 'smmall' && `text-xs`
        )}
      >{`${title}`}</span>
    </div>
  </div>
)

export const Icon = (props: ComponentProps<'svg'>) => (
  <svg
    fill="none"
    height="182"
    viewBox="0 0 182 182"
    width="182"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Índica Saúde</title>
    <mask fill="#fff" id="a">
      <path d="M61 12c0-6.627 5.373-12 12-12h33c6.627 0 12 5.373 12 12v158c0 6.627-5.373 12-12 12H73c-6.627 0-12-5.373-12-12V12Z" />
    </mask>
    <path
      d="M61 12c0-6.627 5.373-12 12-12h33c6.627 0 12 5.373 12 12v158c0 6.627-5.373 12-12 12H73c-6.627 0-12-5.373-12-12V12Z"
      fill="#9FD9C3"
    />
    <path
      d="M61 12c0-7.18 5.82-13 13-13h31c7.18 0 13 5.82 13 13 0-6.075-5.373-11-12-11H73c-6.627 0-12 4.925-12 11Zm57 158c0 7.18-5.82 13-13 13H74c-7.18 0-13-5.82-13-13 0 6.075 5.373 11 12 11h33c6.627 0 12-4.925 12-11Zm-57 12V0v182ZM118 0v182V0Z"
      fill="#CCE1D7"
      mask="url(#a)"
    />
    <mask fill="#fff" id="b">
      <path d="M170 61c6.627 0 12 5.373 12 12v33c0 6.627-5.373 12-12 12H12c-6.627 0-12-5.373-12-12V73c0-6.627 5.373-12 12-12h158Z" />
    </mask>
    <path
      d="M170 61c6.627 0 12 5.373 12 12v33c0 6.627-5.373 12-12 12H12c-6.627 0-12-5.373-12-12V73c0-6.627 5.373-12 12-12h158Z"
      fill="#9FD9C3"
    />
    <path
      d="M170 61c7.18 0 13 5.82 13 13v31c0 7.18-5.82 13-13 13 6.075 0 11-5.373 11-12V73c0-6.627-4.925-12-11-12ZM12 118c-7.18 0-13-5.82-13-13V74c0-7.18 5.82-13 13-13-6.075 0-11 5.373-11 12v33c0 6.627 4.925 12 11 12ZM0 61h182H0Zm182 57H0h182Z"
      fill="#CCE1D7"
      mask="url(#b)"
    />
  </svg>
)
