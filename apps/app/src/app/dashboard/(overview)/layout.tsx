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
import type React from 'react'
import PageContainer from '@/components/layout/page-container'
import { fetchApi } from '@/services'

export default async function OverViewLayout({
  sales,
  bar_stats
}: {
  sales: React.ReactNode
  bar_stats: React.ReactNode
}) {
  // const { data, meta } = await fetchApi('/api/referrals')
  // console.log(meta)

  // const referrals = referralsSchema.parse(data)

  // const totalcommissionAmount = formatCurrency(
  //   referrals.reduce((total, referral) => total + (referral.commissionAmount ?? 0), 0)
  // )

  // const totalpaymentAmount = formatCurrency(
  //   referrals.reduce((total, referral) => total + (referral.paymentAmount ?? 0), 0)
  // )

  // const dashboardData = {
  //   title: referrals,
  //   totalcommissionAmount
  // }

  //     commissionAmount: data.commissions?.reduce((sum, commission) => sum + commission.amount, 0) ?? 0

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 gap-4 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="font-bold text-2xl tracking-tight">Hi, Welcome back 👋</h2>
          {/* <pre>{JSON.stringify(dashboardData, null, 2)}</pre> */}
        </div>

        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3 dark:*:data-[slot=card]:bg-card">
          {/* <HeaderCards title="Total Payment" value={'totalpaymentAmount'} /> */}
          {/*     <HeaderCards
            key={totalcommissionAmount}
            title="Total Commission"
            value={totalcommissionAmount}
          /> */}

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Growth Rate</CardDescription>
              <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
                4.5%
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
              <div className="text-muted-foreground">Meets growth projections</div>
            </CardFooter>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">{bar_stats}</div>
          <div className="col-span-4 md:col-span-3">
            {/* sales arallel routes */}
            {sales}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
