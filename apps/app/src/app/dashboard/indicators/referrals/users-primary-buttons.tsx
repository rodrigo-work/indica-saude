'use client'

import { Button } from '@workspace/ui/components/button'
import { Plus, UserPlus } from 'lucide-react'
import { useReferrals } from './referrals-provider'

export function UsersPrimaryButtons() {
  const { setOpen, setCurrentRow } = useReferrals()
  return (
    <div className="flex gap-4">
      <Button className="space-x-1" onClick={() => setOpen('invite')} variant="outline">
        <span>Invite</span> <Plus size={18} />
      </Button>
      <Button className="space-x-1" onClick={() => setOpen('add')} variant="outline">
        <span>New refferal</span> <Plus size={18} />
      </Button>
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen('delete')
          setCurrentRow({
            name: 'Rodrig Ribeiro',
            role: 'INDICATOR'
          })
        }}
      >
        <span>Add User</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
