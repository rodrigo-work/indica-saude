'use client'

import type { Table } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { X } from 'lucide-react'
import { priorities, statuses } from '../../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const professionalColumn = table.getColumn('professional')
  const uniqueValues = professionalColumn?.getFacetedUniqueValues() || []

  const options = Array.from(uniqueValues.keys()).map((value) => ({
    label: value.slice(0, 15) + (value.length > 15 ? '...' : ''),
    value
  }))

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={(event) => table.getColumn('patientName')?.setFilterValue(event.target.value)}
          placeholder="Filter patients..."
          value={(table.getColumn('patientName')?.getFilterValue() as string) ?? ''}
        />
        {table.getColumn('professional') && (
          <DataTableFacetedFilter
            column={table.getColumn('professional')}
            options={options}
            title="Professional"
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            options={statuses}
            title="Status"
          />
        )}
        {isFiltered && (
          <Button
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
            variant="ghost"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
