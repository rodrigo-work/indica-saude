'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@workspace/ui/components/badge'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { Calendar, Clock, Mail, Stethoscope } from 'lucide-react'
import { cn } from '@/lib/utils'
import { labels, priorities, statuses } from '../../data/data'
import type { Referral } from '../../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Referral>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        className="translate-y-0.5"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        className="translate-y-0.5"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue('id').slice(-4)}</div>,
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'professional',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Professional" />,
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-sm">{row.getValue('professional')}</h3>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="size-3.5" />
            {row.original?.attendancedate}
            <Clock className="size-3.5" />
            {row.original?.attendancestartTime}
            {row.original?.attendanceendTime}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'patientName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Patient" />,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-sm">{row.getValue('patientName')}</h3>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Stethoscope className="size-3.5" />
            {row.original?.patientPhone}
            <Mail className="size-3.5" />
            {row.original?.patientEmail}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'paymentAmount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-sm">{row.getValue('paymentAmount')}</h3>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Stethoscope className="size-3.5" />
            {row.original?.paymentType}
            <Mail className="size-3.5" />
            {row.original?.commissionAmount}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'))

      if (!status) {
        return <span>{row.getValue('status')}</span>
      }

      return (
        <div className="flex w-[100px] items-center text-sm">
          {status.icon && (
            <status.icon
              className={cn('mr-2 h-4 w-4', status.color ? status.color : 'text-muted-foreground')}
            />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
