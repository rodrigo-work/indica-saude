import { IconPlus } from '@tabler/icons-react'
import { buttonVariants } from '@workspace/ui/components/button'
import { Separator } from '@workspace/ui/components/separator'
// import { searchParamsCache, serialize } from '@/lib/searchparams'
import { cn } from '@workspace/ui/lib/utils'
import Link from 'next/link'
// import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { Heading } from '@/components/heading'
import PageContainer from '@/components/layout/page-container'
import { UsersDialogs } from './components/users-dialogs'
import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'
// import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton'
// import ProductListingPage from '@/features/products/components/product-listing'
import { users } from './data/users'

// export const metadata = {
//   title: 'Dashboard: Products'
// }

type pageProps = {
  searchParams?: Promise<string>
}

export default function Page() {
  // const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  // searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <UsersProvider>
      <PageContainer scrollable={false}>
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              description="Manage products (Server side table functionalities.)"
              title="Products"
            />
            <Link
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
              href="/dashboard/product/new"
            >
              <IconPlus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </div>
          <Separator />
          <Suspense
          // key={key}
          // fallback={<DataTableSkeleton columnCount={5} filterCount={2} rowCount={8} />}
          >
            {/* <ProductListingPage /> */}
            <UsersTable data={users} />
          </Suspense>
        </div>
      </PageContainer>

      <UsersDialogs />
    </UsersProvider>
  )
}
