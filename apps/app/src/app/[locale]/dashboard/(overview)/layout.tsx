import { IconTrendingUp } from '@tabler/icons-react'
import { Badge } from '@workspace/ui/components/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@workspace/ui/components/card'
import { Separator } from '@workspace/ui/components/separator'
import type React from 'react'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { formatCurrency } from '@/lib/utils'
import { fetchApi } from '@/services'
import { referralsSchema } from '../referrals/data/schema'

export default async function OverViewLayout({
  referrals,
  bar_stats
}: {
  referrals: React.ReactNode
  bar_stats: React.ReactNode
}) {
  const { data, meta } = await fetchApi('/api/referrals')

  const referral = referralsSchema.parse(data)
  const totalcommissionAmount = formatCurrency(
    referral.reduce((total, _referral) => total + (_referral.commissionAmount ?? 0), 0)
  )
  const totalpaymentAmount = formatCurrency(
    referral.reduce((total, _referral) => total + (_referral.paymentAmount ?? 0), 0)
  )

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 gap-4 flex-col space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Heading title="Hi, Welcome back 👋" />
        </div>
        <Separator />

        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3 dark:*:data-[slot=card]:bg-card">
          <HeaderCards key={totalpaymentAmount} title="Total Payment" value={totalpaymentAmount} />

          <HeaderCards
            key={totalcommissionAmount}
            title="Total Commission"
            value={totalcommissionAmount}
          />

          <HeaderCards
            key={meta.total.toString()}
            title="Total Referrals"
            value={meta.total.toString()}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">{bar_stats}</div>
          <div className="col-span-4 md:col-span-3">
            {/* referrals arallel routes */}
            {referrals}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

function HeaderCards({ title, value }: { title: string; value: string }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
            +4.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Steady performance increase <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground lowercase">{title} base on last 30 days</div>
      </CardFooter>
    </Card>
  )
}
