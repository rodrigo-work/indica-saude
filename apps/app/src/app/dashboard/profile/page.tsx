import { Separator } from '@workspace/ui/components/separator'
import type { Metadata } from 'next'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import ProfileContent from './components/profile-content'
import ProfileHeader from './components/profile-header'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.'
}

export default async function ReferralsPage() {
  // const { data } = await fetchApi('/api/referrals')

  // const referrals = referralsSchema.parse(data)

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4 mb-20">
        <div className="flex items-center justify-between gap-2">
          <Heading
            description="Manage referrals (Server side table functionalities.)"
            title="Referrals"
          />
        </div>
        <Separator />

        <ProfileHeader />
        <ProfileContent />
      </div>
    </PageContainer>
  )
}
