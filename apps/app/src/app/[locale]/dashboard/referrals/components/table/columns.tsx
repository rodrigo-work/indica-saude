'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { Calendar, Check, Clock, Mail, PercentIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Referral } from '../../data/schema'
import { useDialogs } from '../dialogs/dialog-provider'
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
  {
    accessorKey: 'patientName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Patient" />,
    cell: ({ row }) => {
      const { setOpen, setCurrentRow } = useDialogs()

      return (
        <div className="flex flex-col space-y-1">
          <span className="text-sm">{row.getValue('patientName')}</span>

          <div className="flex gap-4 text-muted-foreground text-xs">
            <span className="flex items-center gap-1">
              <PhoneIcon className="size-3" />
              {row.original?.patientPhone}
            </span>
            <Link
              className="flex items-center gap-1 hover:underline"
              href={`#`}
              onClick={(e) => {
                e.preventDefault()
                setOpen('send')
                setCurrentRow(row.original)
              }}
            >
              <Mail className="size-3" />
              {row.original?.patientEmail}
            </Link>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'professional',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Professional" />,
    cell: ({ row }) => {
      // biome-ignore lint/suspicious/noExplicitAny: Needed
      const original: Referral | any = row.original
      if (!original) {
        return null
      }

      return (
        <div className="flex flex-col space-y-1">
          <span className="text-sm">{row.getValue('professional')}</span>

          <div className="flex gap-4 text-muted-foreground text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {formatDate(original.attendancedate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {row.original?.attendancestartTime}
              {' - '}
              {row.original?.attendanceendTime}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'paymentAmount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
    cell: ({ row }) => {
      // biome-ignore lint/suspicious/noExplicitAny: Needed
      const original: Referral | any = row.original
      if (!original) {
        return null
      }

      return (
        <div className="flex flex-col space-y-1">
          <span className="text-sm">{formatCurrency(row.getValue('paymentAmount'))}</span>

          <div className="flex gap-4 text-muted-foreground text-xs">
            <span className="flex items-center gap-1">
              {original.paymentType === 'PERCENTAGE' && <PercentIcon className="size-3" />}
              {formatCurrency(original.commissionAmount)}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      // const status = statuses.find((status) => status.value === row.getValue('status'))

      // if (!status) {
      //   return <span>{row.getValue('status')}</span>
      // }

      return (
        <div className="flex w-[100px] items-center space-y-1">
          {/* {status.icon && (
            <status.icon
              className={cn('mr-2 h-4 w-4', status.color ? status.color : 'text-muted-foreground')}
            />
          )} */}
          <span className="flex items-center gap-1 text-sm lowercase italic">
            <Check className="size-3 text-red-500" />
            {row.getValue('status')}
          </span>
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
