import { IconBrandGithub } from '@tabler/icons-react'
import { Button } from '@workspace/ui/components/button'

export default function CtaGithub() {
  return (
    <Button asChild className="hidden sm:flex" size="sm" variant="ghost">
      <a
        className="dark:text-foreground"
        href="https://github.com/rodrigo-work/indica-saude"
        rel="noopener noreferrer"
        target="_blank"
      >
        <IconBrandGithub />
      </a>
    </Button>
  )
}
