import Image from 'next/image'
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider'
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur'
import { PARTNERS } from '@/data'

export function SectionPartnersLogo() {
  return (
    <section className="bg-background overflow-hidden py-16">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">Partner the best teams</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider gap={112} speed={40} speedOnHover={20}>
              {PARTNERS.map((partner) => (
                <div className="flex" key={partner.name}>
                  <Image
                    alt={partner.name}
                    className="mx-auto h-5 w-fit dark:invert"
                    height="20"
                    src={partner.image}
                    width="0"
                  />
                </div>
              ))}
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              blurIntensity={1}
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
            />
            <ProgressiveBlur
              blurIntensity={1}
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
