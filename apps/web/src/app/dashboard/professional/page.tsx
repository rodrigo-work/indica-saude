import { IconPlus } from '@tabler/icons-react'
import { buttonVariants } from '@workspace/ui/components/button'
import { Separator } from '@workspace/ui/components/separator'
import { cn } from '@workspace/ui/lib/utils'
import Link from 'next/link'
import { Suspense } from 'react'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { AppointmentList } from './components/appointment-list'

export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            description="Manage professionals (Server side table functionalities.)"
            title="Professional"
          />
          <Link className={cn(buttonVariants(), 'text-xs md:text-sm')} href="#">
            <IconPlus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <Suspense
        // key={key}
        // fallback={<DataTableSkeleton columnCount={5} filterCount={2} rowCount={8} />}
        >
          <AppointmentList />
        </Suspense>
      </div>
    </PageContainer>
  )
}
