'use client'

import React, { type ReactNode, useContext, useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import type { Referral } from '../../data/schema'

type DialogType = 'send' | 'invite' | 'add' | 'edit' | 'delete'

type ContextType = {
  open: DialogType | null
  setOpen: (str: DialogType | null) => void
  currentRow: Referral | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Referral | null>>
}

const Context = React.createContext<ContextType | null>(null)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useDialogState<DialogType>(null)
  const [currentRow, setCurrentRow] = useState<Referral | null>(null)

  return <Context value={{ open, setOpen, currentRow, setCurrentRow }}>{children}</Context>
}

export const useDialogs = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useDialogs has to be used within <useContext>')
  }

  return context
}
