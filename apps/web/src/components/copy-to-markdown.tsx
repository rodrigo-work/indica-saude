'use client'

import { Button } from '@workspace/ui/components/button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export const CopyToMarkdown = ({ markdownContent }: { markdownContent: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdownContent)
    setCopied(true)

    // Reset back to copy icon after 2 seconds
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Button
      className={'hidden text-xs sm:flex'}
      onClick={() => {
        void handleCopy()
      }}
      size="sm"
      variant="ghost"
    >
      {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
      Copy Markdown
    </Button>
  )
}
