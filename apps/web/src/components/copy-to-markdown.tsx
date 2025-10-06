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
      className={'text-xs hidden sm:flex'}
      onClick={() => {
        void handleCopy()
      }}
      size="sm"
      variant="ghost"
    >
      {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
      Copy Markdown
    </Button>
  )
}
