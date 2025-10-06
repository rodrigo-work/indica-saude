'use client'

import { track } from '@vercel/analytics'
import { usePromptInputController } from '@workspace/ui/components/ai-elements/prompt-input'
import { Button } from '@workspace/ui/components/button'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const command = 'Ask for help, referral using @indica_saude_bot'
const COPY_TIMEOUT = 500

export const Installer = () => {
  const router = useRouter()
  const controller = usePromptInputController()

  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    toast.success('Copied to clipboard')
    setCopied(true)

    track('Copied installer command')
    setTimeout(() => {
      setCopied(false)
      controller.textInput.setInput(command)

      router.push(`/?#agent`) // Navega para /about no cliente
    }, COPY_TIMEOUT)
  }

  const Icon = copied ? CheckIcon : CopyIcon

  return (
    <div className="flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-secondary py-2 pr-0.5 pl-4 text-foreground text-sm backdrop-blur-sm">
      <p className="pointer-events-none shrink-0 select-none text-muted-foreground">$</p>
      <div className="flex-1 truncate text-left font-mono">{command}</div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          aria-label="Copy"
          className="cursor-pointer rounded-[6px] hover:bg-background/50"
          disabled={copied}
          onClick={handleCopy}
          size="icon"
          variant="ghost"
        >
          <Icon className="text-muted-foreground" size={14} />
        </Button>
      </div>
    </div>
  )
}
