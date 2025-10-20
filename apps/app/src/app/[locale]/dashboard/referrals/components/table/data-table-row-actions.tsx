'use client'

import type { Row } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import type { Referral } from '../../data/schema'
import { useDialogs } from '../dialogs/dialog-provider'

interface DataTableRowActionsProps<TData> {
  row: Row<TData | Referral>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original)
  const { setOpen, setCurrentRow } = useDialogs()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex h-8 w-8 p-0 data-[state=open]:bg-muted" variant="ghost">
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => {
            setCurrentRow(row.original as Referral)
            setOpen('delete')
          }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
