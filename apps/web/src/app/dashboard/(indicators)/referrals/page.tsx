import { createMetadata } from '@workspace/seo/metadata'
import { Separator } from '@workspace/ui/components/separator'
import type { Metadata } from 'next'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { Toolbar } from './components/ProjectToolbar'
import { ReferralsProvider } from './referrals-provider'
import { UsersDialogs } from './users-dialogs'
import { UsersPrimaryButtons } from './users-primary-buttons'

export const metadata: Metadata = createMetadata({
  title: 'Referrals',
  description: 'Manage referrals (Server side table functionalities.)'
})

export default async function ReferralsPage() {
  // const { data } = await getAllReferrals()

  return (
    <ReferralsProvider>
      <PageContainer scrollable>
        <div className="flex flex-1 flex-col space-y-4 mb-20">
          <div className="flex items-center justify-between gap-2">
            <Heading
              description="Manage referrals (Server side table functionalities.)"
              title="Referrals"
            />
            <UsersPrimaryButtons />
          </div>
          <Separator />

          {/* <ShowJsonData data={data} /> */}
          <Toolbar />
          {/*
          <ReferralCardView
            avatar="/doctor-ana-silva.jpg"
            date={'formatDateToPtBR(item.scheduledDate)'}
            doctorName={'item.professionalName'}
            key={'item.id'}
            location="Clínica São Paulo - Sala 302"
            patientEmail={'item.patientEmail'}
            patientName={'item.patientName'}
            patientPhone={'item.patientPhone'}
            specialty="Cardiologista"
            status={'item.status'}
            time="14:30"
            type="in-person"
          /> */}
          {/* <AppointmentList projects={data} /> */}
          {/* <DataTable columns={columns} data={users} /> */}
        </div>
      </PageContainer>

      <UsersDialogs />
    </ReferralsProvider>
  )
}
