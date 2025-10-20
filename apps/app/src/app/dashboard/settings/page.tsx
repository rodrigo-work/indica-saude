import { createMetadata } from '@workspace/seo/metadata'
import { Separator } from '@workspace/ui/components/separator'
import type { Metadata } from 'next'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { ShowJsonData } from '@/lib/show-json-data'
import SettingsPage from './page copy'

export const metadata: Metadata = createMetadata({
  title: 'Referrals',
  description: 'Manage referrals (Server side table functionalities.)'
})

export default async function ReferralsPage() {
  return (
    <PageContainer scrollable>
      <div className="flex flex-1 flex-col space-y-4 mb-20">
        <div className="flex items-center justify-between gap-2">
          <Heading
            description="Manage referrals (Server side table functionalities.)"
            title="Referrals"
          />
        </div>
        <Separator />
        <SettingsPage />
        {/* {JSON.stringify(data)} */}
      </div>
    </PageContainer>
  )
}
