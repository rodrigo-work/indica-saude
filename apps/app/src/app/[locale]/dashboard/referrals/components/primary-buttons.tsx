'use client'

import { Button } from '@workspace/ui/components/button'
import { Plus } from 'lucide-react'
import { useDialogs } from './dialogs/dialog-provider'

export function PrimaryButtons() {
  const { setOpen } = useDialogs()
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen('add')} variant="outline">
        <span>New refferal</span> <Plus size={18} />
      </Button>
    </div>
  )
}
