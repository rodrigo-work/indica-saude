import { Separator } from '@workspace/ui/components/separator'
import { Suspense } from 'react'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { getUsersFakeLogin } from './actions'
import { AppointmentList } from './components/appointment-list'
import { UsersPrimaryButtons } from './users-primary-buttons'
import { UsersProvider } from './users-provider'

export default async function CommissionsPage() {
  // const { user, loading } = useAuth()

  const data = await getUsersFakeLogin()

  return (
    <UsersProvider>
      <PageContainer scrollable>
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              description="Manage commissions (Server side table functionalities.)"
              title="Commissions"
            />
            <UsersPrimaryButtons />
          </div>
          <Separator />
          <Suspense
          // key={key}
          // fallback={<DataTableSkeleton columnCount={5} filterCount={2} rowCount={8} />}
          >
            {JSON.stringify(data)}
            <AppointmentList />
          </Suspense>
        </div>
      </PageContainer>
    </UsersProvider>
  )
}
