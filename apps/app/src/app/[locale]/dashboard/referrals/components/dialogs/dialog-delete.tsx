'use client'

import { Alert, AlertDescription, AlertTitle } from '@workspace/ui/components/alert'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'
import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { showSubmittedData } from '@/lib/show-submitted-data'
import type { Referral } from '../../data/schema'

type UserDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Referral
}

export function DeleteDialog({ open, onOpenChange, currentRow }: UserDeleteDialogProps) {
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.id) {
      return
    }

    onOpenChange(false)
    showSubmittedData(currentRow, 'The following user has been deleted:')
  }

  return (
    <ConfirmDialog
      confirmText="Delete"
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{' '}
            <span className="font-bold">{currentRow.patientName}</span>
            ?
            <br />
            This action will permanently remove the user with the role of{' '}
            <span className="font-bold">{currentRow.patientName}</span> from the systeis This cannot
            be undone.
          </p>

          <Label className="my-2">
            Username:
            <Input
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter username to confirm deletion."
              value={value}
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      destructive
      disabled={value.trim() !== currentRow.id}
      handleConfirm={handleDelete}
      onOpenChange={onOpenChange}
      open={open}
      title={
        <span className="text-destructive">
          <AlertTriangle className="me-1 inline-block stroke-destructive" size={18} /> Delete User
        </span>
      }
    />
  )
}
