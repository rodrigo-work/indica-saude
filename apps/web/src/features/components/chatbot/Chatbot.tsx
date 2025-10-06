'use client'

import { toast } from 'sonner'
import { models, SUGGESTIONS } from '@/data'
import { MessageList } from './MessageList'
import { PromptInputBar } from './PromptInputBar'
import { SuggestionsBar } from './SuggestionsBar'
import { useChatbotState } from './useChatbotState'

export const ChatbotComponent = () => {
  const {
    model,
    setModel,
    modelSelectorOpen,
    setModelSelectorOpen,
    text,
    setText,
    useWebSearch,
    setUseWebSearch,
    useMicrophone,
    setUseMicrophone,
    status,
    setStatus,
    messages,
    addUserMessage
  } = useChatbotState()

  // biome-ignore lint/suspicious/noExplicitAny: NextJS
  const handleSubmit = (message: any) => {
    const hasText = Boolean(message.text)
    const hasAttachments = Boolean(message.files?.length)

    if (!(hasText || hasAttachments)) {
      return
    }

    setStatus('submitted')

    if (message.files?.length) {
      toast.success('Files attached', {
        description: `${message.files.length} file(s) attached to message`
      })
    }

    addUserMessage(message.text || 'Sent with attachments')
    setText('')
  }

  const handleSuggestionClick = (suggestion: string) => {
    setStatus('submitted')
    addUserMessage(suggestion)
  }

  return (
    <div className="relative flex w-full flex-col divide-y overflow-hidden">
      <div className="flex-1 overflow-y-hidden">
        <MessageList messages={messages} />
      </div>
      <div className="grid shrink-0 gap-4 pt-4">
        <SuggestionsBar onSuggestionClick={handleSuggestionClick} suggestions={SUGGESTIONS} />
        <PromptInputBar
          handleSubmit={handleSubmit}
          model={model}
          modelSelectorOpen={modelSelectorOpen}
          models={models}
          setModel={setModel}
          setModelSelectorOpen={setModelSelectorOpen}
          setText={setText}
          setUseMicrophone={setUseMicrophone}
          setUseWebSearch={setUseWebSearch}
          status={status}
          text={text}
          useMicrophone={useMicrophone}
          useWebSearch={useWebSearch}
        />
      </div>
    </div>
  )
}
