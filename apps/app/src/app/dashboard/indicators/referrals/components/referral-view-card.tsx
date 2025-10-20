import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Card, CardContent } from '@workspace/ui/components/card'
import { Separator } from '@workspace/ui/components/separator'
import { Calendar, Clock, Mail, MoreVertical, Stethoscope } from 'lucide-react'
import { formatDateToPtBR } from '@/lib/date'
import type { Referral } from '../schema'

export function ReferralViewCard({ data }: { data: Referral }) {
  return (
    <Card className="group transition-all hover:shadow-md rounded-sm">
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Avatar>
                <AvatarFallback>
                  {data.patientName[0]?.toLocaleUpperCase()}
                  {data.patientName[1]?.toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
            </span>
            <div>
              <h3 className="font-semibold text-sm">{data.patientName}</h3>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Stethoscope className="size-3.5" />
                {data.patientPhone}
                <Mail className="size-3.5" />
                {data.patientEmail}
              </span>
            </div>
          </div>

          <Button className="size-8 -mr-2 -mt-1" size="icon" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </div>
        <Separator />
        <DateCard date={data.scheduledDate} time={data.scheduledTime} />
        <ProfessionalCard professional={data.professional.name} />
        <Separator />
        <div className="flex w-full justify-end gap-4">
          <Badge className={`w-fit text-xs`} variant="outline">
            {`service price`.toLocaleUpperCase()}
          </Badge>
          <Badge className={`w-fit text-xs`} variant="outline">
            {`commission %`.toLocaleUpperCase()}
          </Badge>
          <Badge className={`w-fit text-xs`} variant="outline">
            {data.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export function ReferralViewList({ data }: { data: Referral }) {
  return (
    <Card className="group transition-all hover:shadow-md rounded-sm">
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Avatar>
                <AvatarFallback>
                  {data.patientName[0]?.toLocaleUpperCase()}
                  {data.patientName[1]?.toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-sm">{data.patientName}</h3>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Stethoscope className="size-3.5" />
                {data.patientPhone}
                <Mail className="size-3.5" />
                {data.patientEmail}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <DateCard date={data.scheduledDate} time={data.scheduledTime} />
            <ProfessionalCard professional={data.professional.name} />
          </div>
          <div className="flex  gap-4">
            <Badge className={`w-fit text-xs`} variant="outline">
              {`service price`.toLocaleUpperCase()}
            </Badge>
            <Badge className={`w-fit text-xs`} variant="outline">
              {`commission %`.toLocaleUpperCase()}
            </Badge>
            <Badge className={`w-fit text-xs`} variant="outline">
              {data.status}
            </Badge>
          </div>
          <Button className="size-8 -mr-2 -mt-1" size="icon" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const ProfessionalCard = ({ professional }: { professional?: string }) => {
  return (
    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <Stethoscope className="size-3.5" />
        {professional}
      </span>
    </div>
  )
}

const DateCard = ({ date, time }: { date?: string; time?: string }) => {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <Calendar className="size-3.5" />
        {formatDateToPtBR(date)}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="size-3.5" />
        {time}
      </span>
    </div>
  )
}
