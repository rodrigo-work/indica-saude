import { createMetadata } from '@workspace/seo/metadata'
import { Separator } from '@workspace/ui/components/separator'
import type { Metadata } from 'next'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { ShowJsonData } from '@/lib/show-json-data'
import { fetchApi } from './actions'
import { Toolbar } from './components/ProjectToolbar'
import { ReferralView } from './components/referral-view'
import { ReferralsProvider } from './referrals-provider'
import { UsersDialogs } from './users-dialogs'
import { UsersPrimaryButtons } from './users-primary-buttons'

export const metadata: Metadata = createMetadata({
  title: 'Referrals',
  description: 'Manage referrals (Server side table functionalities.)'
})

export default async function ReferralsPage() {
  const { data } = await fetchApi('/referrals')

  return (
    <PageContainer scrollable>
      <ReferralsProvider>
        <div className="flex flex-1 flex-col space-y-4 mb-20">
          <div className="flex items-center justify-between gap-2">
            <Heading
              description="Manage referrals (Server side table functionalities.)"
              title="Referrals"
            />
            <UsersPrimaryButtons />
          </div>
          <Separator />
          <ShowJsonData data={data} />
          {/* {JSON.stringify(data)} */}
          <Toolbar />
          <ReferralView data={data} />
        </div>

        <UsersDialogs />
      </ReferralsProvider>
    </PageContainer>
  )
}
