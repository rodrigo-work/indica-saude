import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@workspace/ui/components/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@workspace/ui/components/tooltip'
import { InfoIcon } from 'lucide-react'
import { FEATURES } from '@/data'
import { cn } from '@/lib/utils'
import { SectionHeader } from './components/section-header'

export const Comparison = () => (
  <section className="grid w-full max-w-5xl-- justify-center gap-12">
    <div className="mx-auto max-w-5xl">
      <SectionHeader description="Comparison" title="Comparison" />
    </div>

    <div className="-space-x-px isolate mx-auto flex w-full flex-col items-center gap-4 lg:flex-row lg:gap-0">
      {FEATURES.map((feature, index) => (
        <Card
          className={cn(
            'z-10 flex-1 rounded-xl border p-12 shadow-xl',
            'lg:last:rounded-l-none lg:first:rounded-r-none',
            index === 1 && 'z-20 border-emerald-500'
          )}
          key={feature.label}
        >
          <CardHeader className="p-0">
            {feature.avatar}
            <CardTitle className="mt-4 font-medium text-lg tracking-tight">
              {feature.label}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              {feature.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-0">
            <div className="flex flex-col gap-3">
              {feature.items.map((item) => (
                <div className="flex items-center gap-3" key={item.text}>
                  <item.icon className={cn('size-5 shrink-0', item.color)} />
                  <div className="flex flex-1 items-center gap-4">
                    <span className="flex-1 font-medium text-sm">{item.text}</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="size-6 shrink-0 text-muted-foreground/50" />
                      </TooltipTrigger>
                      <TooltipContent>{item.caption}</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
)
