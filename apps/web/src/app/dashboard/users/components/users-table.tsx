'use client'

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@workspace/ui/components/table'
import { cn } from '@workspace/ui/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { useTableUrlState } from '@/hooks/use-table-url-state'
import { roles } from '../data/data'
import type { User } from '../data/schema'
import { DataTableBulkActions } from './data-table-bulk-actions'
import { usersColumns as columns } from './users-columns'

type DataTableProps = {
  data: User[]
}

export function UsersTable({ data }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const searchParams = useSearchParams()
  const router = useRouter()

  const search = useMemo(() => {
    const entries = Object.fromEntries(searchParams.entries())
    return {
      ...entries,
      page: Number(entries.page ?? 1),
      pageSize: Number(entries.pageSize ?? 10),
      username: entries.username ?? '',
      status: entries.status ? entries.status.split(',') : [],
      role: entries.role ? entries.role.split(',') : []
    }
  }, [searchParams])

  const navigate = ({
    search: updater,
    replace
  }: {
    search: Record<string, unknown> | ((prev: Record<string, unknown>) => Record<string, unknown>)
    replace?: boolean
  }) => {
    const current = Object.fromEntries(searchParams.entries())
    const nextSearch =
      typeof updater === 'function' ? updater(current as Record<string, unknown>) : updater

    const params = new URLSearchParams()
    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.entries(nextSearch).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(','))
          }
        } else {
          params.set(key, String(value))
        }
      }
    })

    const url = `?${params.toString()}`
    replace ? router.replace(url) : router.push(url)
  }

  const {
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange
  } = useTableUrlState({
    search,
    navigate,
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: false },
    columnFilters: [
      { columnId: 'username', searchKey: 'username', type: 'string' },
      { columnId: 'status', searchKey: 'status', type: 'array' },
      { columnId: 'role', searchKey: 'role', type: 'array' }
    ]
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility
    },
    enableRowSelection: true,
    onPaginationChange,
    onColumnFiltersChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  useEffect(() => {
    ensurePageInRange(table.getPageCount())
  }, [table, ensurePageInRange])

  return (
    <div className='space-y-4 max-sm:has-[div[role="toolbar"]]:mb-16'>
      <DataTableToolbar
        filters={[
          {
            columnId: 'status',
            title: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Invited', value: 'invited' },
              { label: 'Suspended', value: 'suspended' }
            ]
          },
          {
            columnId: 'role',
            title: 'Role',
            options: roles.map((role) => ({ ...role }))
          }
        ]}
        searchKey="username"
        searchPlaceholder="Filter users..."
        table={table}
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="group/row" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className={cn(
                      'default-classes',
                      (header.column.columnDef.meta as any)?.className ?? ''
                    )}
                    // className={cn(
                    //   'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                    //   header.column.columnDef.meta?.className ?? ''
                    // )}
                    colSpan={header.colSpan}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="group/row"
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={cn(
                        'default-classes',
                        (cell.column.columnDef.meta as any)?.className ?? ''
                      )}
                      // className={cn(
                      //   'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                      //   cell.column.columnDef.meta?.className ?? ''
                      // )}
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
      <DataTableBulkActions table={table} />
    </div>
  )
}
