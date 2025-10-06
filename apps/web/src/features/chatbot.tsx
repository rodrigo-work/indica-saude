'use client'

import { GridCell } from '@/components/grid'
import { useIsMobile } from '@/hooks/use-mobile'
import { ChatbotComponent } from './components/chatbot'
import { SectionHeader } from './components/section-header'
import { IsolatedSuggestions } from './components/suggestions'

export const Chatbot = () => {
  const isMobile = useIsMobile()

  return (
    <GridCell className="col-span-2 scroll-mt-16" id="agent">
      <SectionHeader title={`Chatbot`} />

      <div className="grid h-fit w-full xs:gap-x-0 md:grid-cols-[260px_1fr_260px] md:gap-x-2">
        {!isMobile && (
          <div className="grid">
            <IsolatedSuggestions position="left" />
          </div>
        )}
        <div className="rounded-xl border border-gray-200 px-2 py-2 shadow-2xl sm:gap-x-0">
          <ChatbotComponent />
        </div>
        {!isMobile && (
          <div className="grid">
            <IsolatedSuggestions position="right" />
          </div>
        )}
      </div>
    </GridCell>
  )
}
