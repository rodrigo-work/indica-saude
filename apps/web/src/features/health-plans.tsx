'use client'

import { Marquee } from '@workspace/ui/components/magicui/marquee'
import Image from 'next/image'
import { GridCell } from '@/components/grid'
import { HEALTH_PLANS, type HealthPlan } from '@/data'
import { cn } from '@/lib/utils'
import { SectionHeader } from './components/section-header'

const HealthPlanItem = ({ name, image }: HealthPlan) => {
  return (
    <figure
      className={cn(
        'relative h-full w-42 cursor-pointer overflow-hidden rounded-xl',
        // light styles
        'border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5',
        // dark styles
        'dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15'
      )}
    >
      <Image
        alt={name}
        className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
        height={2048}
        sizes="75vh"
        src={image}
        style={{
          width: 'auto',
          height: '100%'
        }}
        width={2048}
      />
    </figure>
  )
}

const HALF = Math.ceil(HEALTH_PLANS.length / 2)
const firstRow = HEALTH_PLANS.slice(0, HALF)
// const secondRow = HEALTH_PLANS.slice(HALF)

export const HealthPlans = () => {
  return (
    <GridCell className="col-span-2 space-y-6">
      <SectionHeader
        description={`Compare different health plans, find options that match your profile, and ensure protection for you and your family.`}
        // title={`Health Plans`}
      />

      <div className="flex h-full w-full items-center justify-center">
        <div className="relative flex max-w-6xl flex-col overflow-hidden">
          <Marquee className="[--duration:20s]" pauseOnHover={false}>
            {firstRow.map((items) => (
              <HealthPlanItem key={items.name} {...items} />
            ))}
          </Marquee>
          {/* <Marquee className="[--duration:20s]" pauseOnHover={false} reverse>
            {secondRow.map((items) => (
              <HealthPlanItem key={items.name} {...items} />
            ))}
          </Marquee> */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2/4 bg-linear-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-2/4 bg-linear-to-l from-background"></div>
        </div>
      </div>
    </GridCell>
  )
}
