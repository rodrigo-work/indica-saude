// import { Separator } from '@workspace/ui/components/separator'
// import { Suspense } from 'react'
// import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { ChartAreaInteractive } from './components/chart-area-interactive'
import { SectionCards } from './components/section-cards'
// import { AppointmentList } from './components/appointment-list'
// import { UsersPrimaryButtons } from './users-primary-buttons'
import { UsersProvider } from './users-provider'

export default function CommissionsPage() {
  // const { user, loading } = useAuth()

  // const data = getCommissionByIndicatorId()

  return (
    <UsersProvider>
      <PageContainer scrollable={true}>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">{/* <ChartAreaInteractive /> */}</div>
            {/* <DataTable data={data} /> */}
          </div>
        </div>
      </PageContainer>
    </UsersProvider>
  )
}
