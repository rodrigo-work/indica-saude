'use client'

import { IconCsv, IconFileExcel, IconFileExport, IconPdf } from '@tabler/icons-react'
import type { Table } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import { Settings2 } from 'lucide-react'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  const isSelectedFiltered = table.getFilteredSelectedRowModel().rows

  return (
    <div className="flex items-center gap-2">
      {isSelectedFiltered && isSelectedFiltered.length > 0 ? (
        <Button
          className="ml-auto hidden h-8 lg:flex data-[state=open]:bg-muted"
          size="sm"
          variant="outline"
        >
          Actions
        </Button>
      ) : null}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="ml-auto hidden h-8 lg:flex data-[state=open]:bg-muted"
            size="sm"
            variant="outline"
          >
            <IconFileExport />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>
            <IconCsv />
            CSV format
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPdf />
            PDF format
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconFileExcel />
            XLS format
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-auto hidden h-8 lg:flex" size="sm" variant="outline">
            <Settings2 />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  checked={column.getIsVisible()}
                  className="capitalize"
                  key={column.id}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
