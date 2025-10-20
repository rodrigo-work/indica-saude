import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Separator } from '@workspace/ui/components/separator'
import type { Metadata } from 'next'
import Image from 'next/image'
import { z } from 'zod'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { ShowJsonData } from '@/lib/show-json-data'
import { fetchApi } from '@/services'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { UserNav } from './components/user-nav'
import { taskSchema } from './data/schema'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.'
}

// Simulate a database read for tasks.
async function getTasks() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  const data = await fs.readFile(path.join(__dirname, 'data', 'tasks.json'))

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function CommissionsPage() {
  const { data } = await fetchApi('/api/commissions')

  return (
    <PageContainer scrollable>
      <div className="flex flex-1 flex-col space-y-4 mb-20">
        <div className="flex items-center justify-between gap-2">
          <Heading
            description="Manage commissions (Server side table functionalities.)"
            title="Commissions"
          />
        </div>
        <Separator />
        <ShowJsonData data={data} />
        <DataTable columns={columns} data={data} />
      </div>
    </PageContainer>
  )
}
