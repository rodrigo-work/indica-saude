import { IconPlus } from '@tabler/icons-react'
import { prisma } from '@workspace/database'
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

export const metadata: Metadata = createMetadata({
  title: 'Dashboard',
  description: 'A task and issue tracker build using Tanstack Table.'
})

// <UserNav />
export default async function UsersPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
      active: true,
      createdAt: true,
      updatedAt: true
    }
  })

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
          <ShowJsonData data={users} />

          {/* <DataTable columns={columns} data={users} /> */}
        </Suspense>
      </div>
    </PageContainer>
  )
}
