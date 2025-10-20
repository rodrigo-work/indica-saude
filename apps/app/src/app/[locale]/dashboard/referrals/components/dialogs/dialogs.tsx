'use client'

import { AddEditDialog } from './dialog-add-edit'
import { DeleteDialog } from './dialog-delete'
import { useDialogs } from './dialog-provider'
import { SendDialog } from './dialog-send-email'

export function Dialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useDialogs()
  return (
    <>
      <AddEditDialog key="add-dialog" onOpenChange={() => setOpen('add')} open={open === 'add'} />

      {/* <AddEditDialog
        key="user-invite"
        onOpenChange={() => setOpen('invite')}
        open={open === 'invite'}
      /> */}

      {currentRow && (
        <>
          {/* <UsersActionDialog
            currentRow={currentRow}
            key={`user-edit-${currentRow.id}`}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            open={open === 'edit'}
          /> */}

          <SendDialog
            currentRow={currentRow}
            key={`send-${currentRow.id}`}
            onOpenChange={() => {
              setOpen('send')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            open={open === 'send'}
          />

          <DeleteDialog
            currentRow={currentRow}
            key={`user-delete-${currentRow.id}`}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            open={open === 'delete'}
          />
        </>
      )}
    </>
  )
}
