import { createMetadata } from '@workspace/seo/metadata'
import type { Metadata } from 'next'
import SettingsPage from './page copy'

export const metadata: Metadata = createMetadata({
  title: 'Referrals',
  description: 'Manage referrals (Server side table functionalities.)'
})

export default async function ReferralsPage() {
  return (
    <div className="flex flex-1 flex-col space-y-4 mb-20">
      {/* <Separator /> */}
      <SettingsPage />
      {/* {JSON.stringify(data)} */}
    </div>
  )
}
