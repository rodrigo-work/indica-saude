import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IconPlus } from '@tabler/icons-react'
import { createMetadata } from '@workspace/seo/metadata'
import { buttonVariants } from '@workspace/ui/components/button'
import { Separator } from '@workspace/ui/components/separator'
import { cn } from '@workspace/ui/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { ShowJsonData } from '@/lib/show-json-data'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import UsersDataTable from './data-table'

export const metadata: Metadata = createMetadata({
  title: 'Users',
  description: 'A task and issue tracker build using Tanstack Table.'
})
async function getUsers() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const data = await readFileSync(path.join(__dirname, 'data.json'))
  return JSON.parse(data.toString())
}

// <UserNav />
export default async function UsersPage() {
  const users = await getUsers()

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 mb-20">
        <div className="flex items-start justify-between">
          <Heading description="Manage users (Server side table functionalities.)" title="Users" />
          <Link className={cn(buttonVariants(), 'text-xs md:text-sm')} href="#">
            <IconPlus className="mr-2 h-4 w-4" /> Add New
          </Link>
          {/* <UsersPrimaryButtons /> */}
        </div>
        <Separator />
        <Suspense
        // key={key}
        // fallback={<DataTableSkeleton columnCount={5} filterCount={2} rowCount={8} />}
        >
          {/* <ShowJsonData data={users} /> */}
          <UsersDataTable data={users} />

          {/* <DataTable columns={columns} data={users} /> */}
        </Suspense>
      </div>
    </PageContainer>
  )
}
