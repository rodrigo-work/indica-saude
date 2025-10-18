import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Metadata } from 'next'
import Image from 'next/image'
import { z } from 'zod'
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

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="md:hidden">
        <Image
          alt="Playground"
          className="block dark:hidden"
          height={998}
          src="/examples/tasks-light.png"
          width={1280}
        />
        <Image
          alt="Playground"
          className="hidden dark:block"
          height={998}
          src="/examples/tasks-dark.png"
          width={1280}
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable columns={columns} data={tasks} />
      </div>
    </>
  )
}
