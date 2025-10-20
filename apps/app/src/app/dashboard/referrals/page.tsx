import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Separator } from '@workspace/ui/components/separator'
import type { Metadata } from 'next'
import Image from 'next/image'
import { z } from 'zod'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { fetchApi } from '@/services'
import { MyTable } from './components/csv'
import { columns } from './components/table/columns'
import { DataTable } from './components/table/data-table'
import { referralSchema, referralsSchema, taskSchema, tasksSchema } from './data/schema'
import { UsersDialogs } from './users-dialogs'
import { UsersPrimaryButtons } from './users-primary-buttons'
import { UsersProvider } from './users-provider'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.'
}

export default async function ReferralsPage() {
  const { data } = await fetchApi('/api/referrals')

  const referrals = referralsSchema.parse(data)

  return (
    <PageContainer scrollable={true}>
      <UsersProvider>
        <div className="flex flex-1 flex-col space-y-4 mb-20">
          <div className="flex items-center justify-between gap-2">
            <Heading
              description="Manage referrals (Server side table functionalities.)"
              title="Referrals"
            />
            <UsersPrimaryButtons />
          </div>
          <Separator />

          {/* <MyTable columns={columns} data={referrals} /> */}

          <DataTable columns={columns} data={referrals} />
        </div>

        <UsersDialogs />
      </UsersProvider>
    </PageContainer>
  )
}
