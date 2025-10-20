import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@workspace/ui/components/card'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import type { Referrals } from '../../data'

export function RecentReferrals({ referralData }: { referralData: Referrals }) {
  return (
    <Card className="@container/card h-full">
      <CardHeader>
        <CardTitle>Recent Referrals</CardTitle>
        <CardDescription>
          You made {referralData.length} referrals in the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {referralData
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          .slice(0, 4)
          .map((item) => (
            <div
              className="flex items-center border-b py-4 last:border-none"
              key={item.patientName || item.patientEmail}
            >
              <Avatar className="h-9 w-9">
                <AvatarImage alt="Avatar" src={'item.avatar'} />
                <AvatarFallback className="uppercase">
                  {item.patientName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="font-medium text-sm leading-none">{item.patientName}</p>
                <p className="text-muted-foreground text-sm">{item.patientEmail}</p>
              </div>
              <div className="ml-auto font-medium">{formatCurrency(item.paymentAmount)}</div>
            </div>
          ))}
        {referralData.length > 3 && (
          <div className="flex items-center justify-center mt-4">
            <Link
              className="underline hover:text-primary text-muted-foreground text-sm"
              href="/referrals"
            >
              more {referralData.length - 4} referrals
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
