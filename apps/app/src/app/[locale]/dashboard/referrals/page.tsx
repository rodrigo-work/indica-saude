import { createMetadata } from '@workspace/seo/metadata'
import { Separator } from '@workspace/ui/components/separator'
import type { Metadata } from 'next'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { fetchApi } from '@/services'
import { DialogProvider } from './components/dialogs/dialog-provider'
import { Dialogs } from './components/dialogs/dialogs'
import { PrimaryButtons } from './components/primary-buttons'
import { columns } from './components/table/columns'
import { DataTable } from './components/table/data-table'
import { referralsSchema } from './data/schema'

export const metadata: Metadata = createMetadata({
  title: 'Referrals',
  description: 'Manage referrals (Server side table functionalities.)'
})

export default async function ReferralsPage() {
  const { data } = await fetchApi('/api/referrals')

  const referrals = referralsSchema.parse(data)

  return (
    <PageContainer scrollable={false}>
      <DialogProvider>
        <div className="mb-20 flex flex-1 flex-col space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Heading
              description="Manage referrals (Server side table functionalities.)"
              title="Referrals"
            />
            <PrimaryButtons />
          </div>
          <Separator />

          <DataTable columns={columns} data={referrals} />
        </div>

        <Dialogs />
      </DialogProvider>
    </PageContainer>
  )
}
