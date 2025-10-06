import { IconPlus } from '@tabler/icons-react'
import { buttonVariants } from '@workspace/ui/components/button'
import { Separator } from '@workspace/ui/components/separator'
import { cn } from '@workspace/ui/lib/utils'
import Link from 'next/link'
import { Suspense } from 'react'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { formatDateToPtBR } from '@/lib/date'
import { ShowJsonData } from '@/lib/show-json-data'
import { ReferralCardView } from './components/appointment-card'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider } from './components/users-provider'
import { type Referrals, referralsSchema } from './data/schema'

const getReferrals = async () => {
  const res = await fetch('http://localhost:3000/api/referrals', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return await res.json()
}

// const appointments = [
//   {
//     doctorName: 'Dr. Ana Silva',
//     specialty: 'Cardiologista',
//     date: '15 de Janeiro, 2025',
//     time: '14:30',
//     location: 'Clínica São Paulo - Sala 302',
//     type: 'in-person' as const,
//     status: 'confirmed' as const,
//     avatar: '/doctor-ana-silva.jpg'
//   },
//   {
//     doctorName: 'Dr. Carlos Mendes',
//     specialty: 'Dermatologista',
//     date: '18 de Janeiro, 2025',
//     time: '10:00',
//     type: 'video' as const,
//     status: 'pending' as const,
//     avatar: '/doctor-carlos-mendes.jpg'
//   },
//   {
//     doctorName: 'Dra. Maria Santos',
//     specialty: 'Pediatra',
//     date: '12 de Janeiro, 2025',
//     time: '16:00',
//     location: 'Hospital Central',
//     type: 'in-person' as const,
//     status: 'completed' as const,
//     avatar: '/doctor-maria-santos.jpg'
//   },
//   {
//     doctorName: 'Dr. João Oliveira',
//     specialty: 'Ortopedista',
//     date: '20 de Janeiro, 2025',
//     time: '09:30',
//     type: 'phone' as const,
//     status: 'confirmed' as const
//   },
//   {
//     doctorName: 'Dra. Patricia Lima',
//     specialty: 'Oftalmologista',
//     date: '10 de Janeiro, 2025',
//     time: '11:00',
//     location: 'Clínica Visão',
//     type: 'in-person' as const,
//     status: 'cancelled' as const
//   },
//   {
//     doctorName: 'Dr. Roberto Costa',
//     specialty: 'Neurologista',
//     date: '22 de Janeiro, 2025',
//     time: '15:00',
//     type: 'video' as const,
//     status: 'pending' as const
//   }
// ]

export default async function ReferralsPage() {
  const { data } = await getReferrals()
  const referrals: Referrals = referralsSchema.parse(data)

  return (
    <UsersProvider>
      <PageContainer scrollable={true}>
        <div className="flex flex-1 flex-col space-y-4 mb-20">
          <div className="flex items-start justify-between">
            <Heading
              description="Manage referrals (Server side table functionalities.)"
              title="Referrals"
            />
            <Link className={cn(buttonVariants(), 'text-xs md:text-sm')} href="#">
              <IconPlus className="mr-2 h-4 w-4" /> Add New
            </Link>
            <UsersPrimaryButtons />
          </div>
          <Separator />
          <Suspense
          // key={key}
          // fallback={<DataTableSkeleton columnCount={5} filterCount={2} rowCount={8} />}
          >
            <ShowJsonData data={referrals} />
            {/* <ReferralList data={data} /> */}

            {/* {referrals.map((item) => (
            <ReferralListView
              avatar="/doctor-ana-silva.jpg"
              date={formatDateToPtBR(item.scheduledDate)}
              doctorName={item.professionalName}
              key={item.id}
              location="Clínica São Paulo - Sala 302"
              patientEmail={item.patientEmail}
              patientName={item.patientName}
              patientPhone={item.patientPhone}
              specialty="Cardiologista"
              status={item.status}
              time="14:30"
              type="in-person"
            />
          ))} */}

            <div className="grid gap-6 w-full grid-cols-3">
              {referrals.map((item) => (
                <ReferralCardView
                  avatar="/doctor-ana-silva.jpg"
                  date={formatDateToPtBR(item.scheduledDate)}
                  doctorName={item.professionalName}
                  key={item.id}
                  location="Clínica São Paulo - Sala 302"
                  patientEmail={item.patientEmail}
                  patientName={item.patientName}
                  patientPhone={item.patientPhone}
                  specialty="Cardiologista"
                  status={item.status}
                  time="14:30"
                  type="in-person"
                />
                // <ReferralListView
                //   avatar="/doctor-ana-silva.jpg"
                //   date={formatDateToPtBR(item.scheduledDate)}
                //   doctorName={item.professionalName}
                //   key={item.id}
                //   location="Clínica São Paulo - Sala 302"
                //   patientEmail={item.patientEmail}
                //   patientName={item.patientName}
                //   patientPhone={item.patientPhone}
                //   specialty="Cardiologista"
                //   status={item.status}
                //   time="14:30"
                //   type="in-person"
                // />
              ))}
            </div>
            {/* <div className="grid gap-6 w-full grid-cols-4 "> */}
            {/* <ReferralCard
              avatar="/doctor-ana-silva.jpg"
              date="15 de Janeiro, 2025"
              doctorName="Dr.dddddddddddddd Ana Silva"
              location="Clínica São Paulo - Sala 302"
              specialty="Cardiologista"
              status="confirmed"
              time="14:30"
              type="in-person"
            />
            <AppointmentCard
              avatar="/doctor-ana-silva.jpg"
              date="15 de Janeiro, 2025"
              doctorName="Dr. Ana Silva"
              location="Clínica São Paulo - Sala 302"
              specialty="Cardiologista"
              status="confirmed"
              time="14:30"
              type="in-person"
            />
          </div>
          <AppointmentsGrid appointments={appointments} />
          <AppointmentsGrid2 appointments={appointments} /> */}
          </Suspense>
        </div>
      </PageContainer>

      <UsersDialogs />
    </UsersProvider>
  )
}
