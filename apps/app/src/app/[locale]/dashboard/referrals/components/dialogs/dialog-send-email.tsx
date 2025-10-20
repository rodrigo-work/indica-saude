'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@workspace/ui/components/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@workspace/ui/components/form'
import { Textarea } from '@workspace/ui/components/textarea'
import { MailIcon, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import type { Referral } from '../../data/schema'

const formSchema = z.object({
  email: z.email().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' })
})

type UserInviteForm = z.infer<typeof formSchema>

type UserInviteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Referral
}

export function SendDialog({ open, onOpenChange, currentRow }: UserInviteDialogProps) {
  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: currentRow.patientEmail,
      message: ''
    }
  })

  const onSubmit = (values: UserInviteForm) => {
    form.reset()
    showSubmittedData(values)
    onOpenChange(false)
  }

  return (
    <Dialog
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
      open={open}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-start">
          <DialogTitle className="flex items-center gap-2">
            <MailIcon /> Send Email
          </DialogTitle>
          <DialogDescription>
            Send an email to <span className="font-semibold">{currentRow.patientName}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" id="user-invite-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Type your message here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="user-invite-form" type="submit">
            Send <Send />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
