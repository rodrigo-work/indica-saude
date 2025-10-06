/** biome-ignore-all lint/suspicious/noExplicitAny: No type available */

// import {
//   ModelSelector,
//   ModelSelectorContent,
//   ModelSelectorEmpty,
//   ModelSelectorGroup,
//   ModelSelectorInput,
//   ModelSelectorItem,
//   ModelSelectorList,
//   ModelSelectorLogo,
//   ModelSelectorLogoGroup,
//   ModelSelectorName,
//   ModelSelectorTrigger
// } from '@workspace/ui/components/ai-elements/model-selector'
// import { CheckIcon, GlobeIcon, MicIcon } from 'lucide-react'
import {
  PromptInput,
  // PromptInputActionAddAttachments,
  // PromptInputActionMenu,
  // PromptInputActionMenuContent,
  // PromptInputActionMenuTrigger,
  PromptInputBody,
  // PromptInputButton,
  PromptInputFooter,
  // PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools
} from '@workspace/ui/components/ai-elements/prompt-input'

export function PromptInputBar({
  text,
  setText,
  status,
  handleSubmit
  // useMicrophone,
  // setUseMicrophone,
  // useWebSearch,
  // setUseWebSearch,
  // modelSelectorOpen,
  // setModelSelectorOpen,
  // models,
  // model
  // setModel
}: any) {
  // const selectedModelData = models.find((m: any) => m.id === model)

  return (
    <PromptInput globalDrop multiple onSubmit={handleSubmit}>
      <div className="flex w-full flex-col px-2">
        {/* <PromptInputHeader className="flex">
          PromptInputHeader
           <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
        </PromptInputHeader>   */}
        <PromptInputBody className="flex">
          <PromptInputTextarea
            className="w-fit resize-none rounded-md text-black transition"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
        </PromptInputBody>
        <PromptInputFooter className="flex">
          <PromptInputTools className="flex items-center gap-2">
            {/* <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu> */}
            {/*       <PromptInputButton
              className="flex items-center gap-1"
              onClick={() => setUseMicrophone(!useMicrophone)}
              variant={useMicrophone ? 'default' : 'ghost'}
            >
              <MicIcon size={16} />
              <span className="sr-only">Microfone</span>
            </PromptInputButton>
            <PromptInputButton
              className="flex items-center gap-1"
              onClick={() => setUseWebSearch(!useWebSearch)}
              variant={useWebSearch ? 'default' : 'ghost'}
            >
              <GlobeIcon size={16} />
              <span>Buscar</span>
            </PromptInputButton> */}
            {/* <ModelSelector onOpenChange={setModelSelectorOpen} open={modelSelectorOpen}>
              <ModelSelectorTrigger asChild>
                <PromptInputButton className="flex items-center gap-2">
                  {selectedModelData?.chefSlug && (
                    <ModelSelectorLogo provider={selectedModelData.chefSlug} />
                  )}
                  {selectedModelData?.name && (
                    <ModelSelectorName>{selectedModelData.name}</ModelSelectorName>
                  )}
                </PromptInputButton>
              </ModelSelectorTrigger>
              <ModelSelectorContent>
                <ModelSelectorInput placeholder="Buscar modelos..." />
                <ModelSelectorList>
                  <ModelSelectorEmpty>Nenhum modelo encontrado.</ModelSelectorEmpty>
                  {['OpenAI', 'Anthropic', 'Google'].map((chef) => (
                    <ModelSelectorGroup heading={chef} key={chef}>
                      {models
                        .filter((m: any) => m.chef === chef)
                        .map((m: any) => (
                          <ModelSelectorItem
                            key={m.id}
                            onSelect={() => {
                              setModel(m.id)
                              setModelSelectorOpen(false)
                            }}
                            value={m.id}
                          >
                            <ModelSelectorLogo provider={m.chefSlug} />
                            <ModelSelectorName>{m.name}</ModelSelectorName>
                            <ModelSelectorLogoGroup>
                              {m.providers.map((provider: string) => (
                                <ModelSelectorLogo key={provider} provider={provider} />
                              ))}
                            </ModelSelectorLogoGroup>
                            {model === m.id ? (
                              <CheckIcon className="ml-auto size-4" />
                            ) : (
                              <div className="ml-auto size-4" />
                            )}
                          </ModelSelectorItem>
                        ))}
                    </ModelSelectorGroup>
                  ))}
                </ModelSelectorList>
              </ModelSelectorContent>
            </ModelSelector> */}
          </PromptInputTools>

          <PromptInputSubmit
            className="size-8"
            disabled={!(text.trim() || status) || status === 'streaming'}
            status={status}
            variant="default"
          />
        </PromptInputFooter>
      </div>
    </PromptInput>
  )
}
