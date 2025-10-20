import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@workspace/ui/components/card'

type SaleProps = {
  name: string
  email: string
  avatar: string
  fallback: string
  amount: string
}

export function RecentSales({ salesData }: { salesData: SaleProps[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {salesData.map((sale) => (
            <div className="flex items-center" key={sale.name || sale.email}>
              <Avatar className="h-9 w-9">
                <AvatarImage alt="Avatar" src={sale.avatar} />
                <AvatarFallback>{sale.fallback}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="font-medium text-sm leading-none">{sale.name}</p>
                <p className="text-muted-foreground text-sm">{sale.email}</p>
              </div>
              <div className="ml-auto font-medium">{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
