import { Installer } from '@/components/installer'
import { SectionHeader } from './components/section-header'

export const CallToAction = () => (
  <section className="flex w-full flex-col gap-12 bg-zinc-50" id="call-to-action">
    <div className="mx-auto max-w-5xl">
      <SectionHeader title="CTA" />
      <div className="-space-x-px isolate mx-auto flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:gap-0">
        <div className="mx-auto w-full max-w-md">
          <Installer />
        </div>
      </div>
    </div>
  </section>
)
