'use client'

import { usePromptInputController } from '@workspace/ui/components/ai-elements/prompt-input'
import Link from 'next/link'
import { MOCK_AI_RESPONSES, SUGGESTIONS } from '@/data'
import { cn } from '@/lib/utils'

export function IsolatedSuggestions({ position }: { position: 'left' | 'right' }) {
  const HALF = Math.ceil(SUGGESTIONS.length / 2)
  const data = position === 'right' ? SUGGESTIONS.slice(0, HALF) : SUGGESTIONS.slice(HALF)

  const controller = usePromptInputController()

  const handleClick = (text: string) => {
    // alert(text)
    controller.textInput.setInput(text)
    return false
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-md',
        position === 'left' ? 'justify-evenly' : 'justify-evenly'
      )}
    >
      {data.map((item, index) => (
        <Link
          className={cn(
            'line-clamp-1 shrink-0 rounded-md p-2 font-medium text-xs',
            index % 2 !== 0 ? 'text-right' : 'text-left',
            index % 2 !== 0
              ? 'bg-linear-to-l from-zinc-100 to-zinc-50 hover:from-zinc-50 hover:to-transparent'
              : 'bg-linear-to-r from-zinc-100 to-zinc-50 hover:from-zinc-50 hover:to-transparent'
          )}
          href="?#agent"
          key={`${item}-${index}`}
          onClick={() => handleClick(item)}
        >
          <div
            className={cn(
              'line-clamp-1 shrink-0 font-medium text-xs',
              index % 2 !== 0 ? 'text-right' : 'text-left'
            )}
          >
            {`${position === 'left' ? `${index + 1}` : `${HALF + index}`}. ${item}`}
          </div>
          <div
            className={cn(
              'line-clamp-2 text-muted-foreground text-xs',
              index % 2 !== 0 ? 'text-right' : 'text-left'
            )}
          >
            {MOCK_AI_RESPONSES[item]}
          </div>
        </Link>
      ))}
    </div>
  )
}
