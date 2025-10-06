'use client'

import { useCallback, useState } from 'react'
import { initialMessages, type MessageType, models } from '@/data'

export function useChatbotState() {
  const [model, setModel] = useState<string>(models[0].id)
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false)
  const [text, setText] = useState<string>('')
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false)
  const [useMicrophone, setUseMicrophone] = useState<boolean>(false)
  const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready')
  const [messages, setMessages] = useState<MessageType[]>(initialMessages)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)

  // Simula a resposta do chatbot, streamando a resposta letra por letra
  const streamResponse = useCallback(async (messageId: string, content: string) => {
    setStatus('streaming')
    setStreamingMessageId(messageId)

    const words = content.split(' ')
    let currentContent = ''

    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? ' ' : '') + words[i]

      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.versions.some((v) => v.id === messageId)) {
            return {
              ...msg,
              versions: msg.versions.map((v) =>
                v.id === messageId ? { ...v, content: currentContent } : v
              )
            }
          }
          return msg
        })
      )

      await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 50))
    }

    setStatus('ready')
    setStreamingMessageId(null)
  }, [])

  const addUserMessage = useCallback(
    async (content: string) => {
      // 1️⃣ Adiciona mensagem do usuário
      const userMessageId = `user-${Date.now()}`
      const userMessage: MessageType = {
        key: userMessageId,
        from: 'user',
        versions: [{ id: userMessageId, content }]
      }
      setMessages((prev) => [...prev, userMessage])

      // 2️⃣ Cria placeholder para a resposta do assistente
      const assistantMessageId = `assistant-${Date.now()}`
      const assistantMessage: MessageType = {
        key: `assistant-${Date.now()}`,
        from: 'assistant',
        versions: [{ id: assistantMessageId, content: '' }]
      }
      setMessages((prev) => [...prev, assistantMessage])

      // 3️⃣ Chama a API /api/chat
      let response = ''
      try {
        const res = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content })
        })
        const data = await res.json()
        console.log('Resposta da API /api/chat', data)
        response = data.text
      } catch (err) {
        console.error('Erro ao chamar /api/chat', err)
        response = 'Desculpe, não consegui processar a resposta.'
      }

      // 4️⃣ Stream da resposta letra por letra
      streamResponse(assistantMessageId, response)
    },
    [streamResponse]
  )

  return {
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
    setMessages,
    streamingMessageId,
    setStreamingMessageId,
    streamResponse,
    addUserMessage
  }
}
