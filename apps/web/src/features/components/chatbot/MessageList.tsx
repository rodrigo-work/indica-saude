import {
  Conversation,
  ConversationContent,
  ConversationScrollButton
} from '@workspace/ui/components/ai-elements/conversation'
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse
} from '@workspace/ui/components/ai-elements/message'
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger
} from '@workspace/ui/components/ai-elements/reasoning'
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger
} from '@workspace/ui/components/ai-elements/sources'
import type { MessageType } from '@/data'

export function MessageList({ messages }: { messages: MessageType[] }) {
  return (
    <Conversation className="h-[420px]">
      <ConversationContent>
        {messages.map(({ versions, ...message }) => (
          <MessageBranch defaultBranch={0} key={message.key}>
            <MessageBranchContent>
              {versions.map((version) => (
                <Message from={message.from} key={`${message.key}-${version.id}`}>
                  <div>
                    {message.sources?.length && (
                      <Sources>
                        <SourcesTrigger count={message.sources.length} />
                        <SourcesContent>
                          {message.sources.map((source) => (
                            <Source href={source.href} key={source.href} title={source.title} />
                          ))}
                        </SourcesContent>
                      </Sources>
                    )}
                    {message.reasoning && (
                      <Reasoning duration={message.reasoning.duration}>
                        <ReasoningTrigger />
                        <ReasoningContent>{message.reasoning.content}</ReasoningContent>
                      </Reasoning>
                    )}
                    <MessageContent>
                      <MessageResponse>{version.content}</MessageResponse>
                    </MessageContent>
                  </div>
                </Message>
              ))}
            </MessageBranchContent>
            {versions.length > 1 && (
              <MessageBranchSelector from={message.from}>
                <MessageBranchPrevious />
                <MessageBranchPage />
                <MessageBranchNext />
              </MessageBranchSelector>
            )}
          </MessageBranch>
        ))}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  )
}
