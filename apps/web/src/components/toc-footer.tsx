import Link from 'next/link'
import { Logo } from '@/components/logo'

export const TocFooter = () => {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="my-8 w-full max-w-6xl- rounded-md border border-red-400 px-4 py-4 dark:bg-transparent">
      <div className="flex justify-center">
        <Link aria-label="go home" className="block size-fit" href="/">
          <Logo />
        </Link>
      </div>
    </div>
  )
}
