import { openai } from '@ai-sdk/openai'
import { convertToModelMessages, streamText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  // const { messages }: { messages: UIMessage[] } = await req.json()
  const { messages } = await req.json()

  const modelMessages = convertToModelMessages(messages)

  const result = streamText({
    model: openai('gpt-4.1'),
    system: 'You are a helpful assistant.',
    messages: modelMessages
  })

  return result.toUIMessageStreamResponse()
}
