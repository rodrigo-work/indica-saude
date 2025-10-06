import { Button } from '@workspace/ui/components/button'
import type { ComponentProps } from 'react'

export const Logo = (props: ComponentProps<'div'>) => (
  <div {...props}>
    <Button asChild variant="ghost">
      <span>
        <Icon className="size-7" />
        <div className="flex flex-col -gap-0.9 leading-none">
          <span className="font-semibold text-md tracking-tight">Indica Saúde</span>
          <span className="text-xs">Application Referral</span>
        </div>
      </span>
    </Button>
  </div>
)

export const Logo2 = (props: ComponentProps<'svg'>) => (
  <svg fill="none" viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Ultracite</title>
    <path d="M105 315H210L315 210V0H420V250L250 420H0V0H105V315Z" fill="currentColor" />
    <path d="M420 420H335V335H420V420Z" fill="currentColor" />
  </svg>
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
