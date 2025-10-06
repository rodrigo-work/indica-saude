/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@workspace/ui/components/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@workspace/ui/components/chart'
import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

export const description = 'An interactive bar chart'

const chartConfig = {
  views: {
    label: 'Page Views'
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)'
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)'
  },
  error: {
    label: 'Error',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

export function BarGraph({ chartData }: { chartData: any }) {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('desktop')

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc: any, curr: any) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc: any, curr: any) => acc + curr.mobile, 0)
    }),
    []
  )

  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  React.useEffect(() => {
    if (activeChart === 'error') {
      throw new Error('Mocking Error')
    }
  }, [activeChart])

  if (!isClient) {
    return null
  }

  return (
    <Card className="@container/card !pt-3">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 !py-0">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">Total for the last 3 months</span>
            <span className="@[540px]/card:hidden">Last 3 months</span>
          </CardDescription>
        </div>
        <div className="flex">
          {['desktop', 'mobile', 'error'].map((key) => {
            const chart = key as keyof typeof chartConfig
            if (!chart || total[key as keyof typeof total] === 0) return null
            return (
              <button
                className="data-[active=true]:bg-primary/5 hover:bg-primary/5 relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left transition-colors duration-200 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                data-active={activeChart === chart}
                key={chart}
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">{chartConfig[chart].label}</span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer className="aspect-auto h-[250px] w-full" config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id="fillBar" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.8} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  }}
                  nameKey="views"
                />
              }
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
            />
            <Bar dataKey={activeChart} fill="url(#fillBar)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
