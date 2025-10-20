/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
'use client'

import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

// import type { User } from '../data/schema'

type UsersViewModeType = 'grid' | 'list'
type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete'

type UsersContextType = {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: any | null //User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<any | null>>
  viewMode: UsersViewModeType
  setViewMode: React.Dispatch<React.SetStateAction<UsersViewModeType>>
}

const UsersContext = React.createContext<UsersContextType | null>(null)

export function ReferralsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<any | null>(null)
  const [viewMode, setViewMode] = useState<UsersViewModeType>('list')

  return (
    <UsersContext value={{ open, setOpen, currentRow, setCurrentRow, viewMode, setViewMode }}>
      {children}
    </UsersContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useReferrals = () => {
  const usersContext = React.useContext(UsersContext)

  if (!usersContext) {
    throw new Error('useReferrals has to be used within <UsersContext>')
  }

  return usersContext
}
