import { z } from 'zod'

export const paymentSchema = z.object({
  id: z.string()
})
export type Payment = z.infer<typeof paymentSchema>

export const paymentsSchema = z.array(paymentSchema)
export type Payments = z.infer<typeof paymentsSchema>
