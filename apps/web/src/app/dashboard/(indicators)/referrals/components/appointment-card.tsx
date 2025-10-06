import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@workspace/ui/components/card'
import { Calendar, Clock, MapPin, MoreVertical, Phone, Stethoscope, Video } from 'lucide-react'

type ReferralStatus = 'PENDING' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'

type StatusInfo = {
  style: string
  label: string
}

const referralStatus: Record<ReferralStatus, StatusInfo> = {
  PENDING: {
    style: 'bg-amber-50 text-amber-700 border-amber-200',
    label: 'Pendente'
  },
  SCHEDULED: {
    style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    label: 'Agendado'
  },
  COMPLETED: {
    style: 'bg-blue-50 text-blue-700 border-blue-200',
    label: 'Concluído'
  },
  CANCELLED: {
    style: 'bg-gray-100 text-gray-600 border-gray-200',
    label: 'Cancelado'
  }
}

interface AppointmentCardProps {
  doctorName: string
  specialty?: string
  date?: string
  time?: string
  location?: string
  type?: 'in-person' | 'video' | 'phone'
  status?: 'confirmed' | 'pending' | 'completed' | 'cancelled' | string
  avatar?: string
  patientName?: string
  patientEmail?: string
  patientPhone?: string
}

export function ReferralCardView({
  doctorName,
  specialty,
  date,
  time,
  location,
  type,
  status,
  avatar,
  patientName,
  patientEmail,
  patientPhone
}: AppointmentCardProps) {
  const statusColors = {
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    completed: 'bg-blue-50 text-blue-700 border-blue-200',
    cancelled: 'bg-gray-100 text-gray-600 border-gray-200'
  }

  const typeIcons = {
    'in-person': <MapPin className="size-4" />,
    video: <Video className="size-4" />,
    phone: <Phone className="size-4" />
  }

  const statusLabels = {
    confirmed: 'Confirmado',
    pending: 'Pendente',
    completed: 'Concluído',
    cancelled: 'Cancelado'
  }

  // status vindo dinamicamente (ex: de props ou backend)
  // const rStatus: string | undefined = 'PENDING'

  // Acesso direto, com fallback
  const rStatus = referralStatus[status as ReferralStatus]?.style ?? 'Desconhecido'
  const rLabel = referralStatus[status as ReferralStatus]?.label ?? 'Desconhecido'

  return (
    <Card className="group transition-all hover:shadow-md rounded-sm">
      <CardHeader className="pb-3 border-b">
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>

      <CardContent className="space-y-2 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Avatar className="h-10 w-10 rounded-lg">
                <AvatarImage alt={'user.name'} src={'/placeholder.svg'} />
                <AvatarFallback className="rounded-xs">RR</AvatarFallback>
              </Avatar>
            </span>
            <span>
              <h3 className="font-semibold text-sm">{patientName}</h3>
              <p className="text-xs text-muted-foreground">
                {patientPhone} - {patientEmail}
              </p>
            </span>
          </div>
          <Badge className={`${rStatus} w-fit text-xs`} variant="outline">
            {rLabel}
          </Badge>
          <Button className="size-8 -mr-2 -mt-1" size="icon" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </div>{' '}
        {/* <Badge className={`${statusColors[status]} w-fit text-xs`} variant="outline">
          {statusLabels[status]}
        </Badge> */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          <span>{date}</span> at <span>{time}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="font-semibold inline-flex items-center gap-2 text-blue-600">
            <Stethoscope className="size-3.5" />
            {doctorName}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5" />
            {location}
          </span>
        </div>
        {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {typeIcons[type]}
          <span className="capitalize">
            {type === 'in-person'
              ? location || 'Consultório'
              : type === 'video'
                ? 'Videochamada'
                : 'Telefone'}
          </span>
        </div> */}
      </CardContent>
      <CardFooter className="flex gap-2 pt-3 border-t">
        {status === 'confirmed' && (
          <Button className="flex-1 text-xs h-8 bg-transparent" size="sm" variant="outline">
            Ver Detalhes
          </Button>
        )}
        {status === 'pending' && (
          <Button className="flex-1 text-xs h-8" size="sm">
            Confirmar
          </Button>
        )}
        {status === 'completed' && (
          <Button className="w-full text-xs h-8 bg-transparent" size="sm" variant="outline">
            Ver Histórico
          </Button>
        )}
        {status === 'cancelled' && (
          <Button className="w-full text-xs h-8 bg-transparent" size="sm" variant="outline">
            Agendar Novamente
          </Button>
        )}{' '}
        <Button className="w-full text-xs h-8 bg-transparent" size="sm" variant="outline">
          Agendar Novamente
        </Button>{' '}
        <Button className="w-full text-xs h-8 bg-transparent" size="sm" variant="destructive">
          Agendar 878979
        </Button>
      </CardFooter>
    </Card>
  )
}
