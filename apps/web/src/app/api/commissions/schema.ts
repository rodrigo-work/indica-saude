import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  indicatorId: z.string(),
  referralId: z.string(),
  amount: z.number(),
  // status: z.enum(['PENDING', 'PAID']),
  // generatedAt: z.string(),
  // notes: z.string().optional(),
  referral: z.object({
    id: z.string()
  })
})
export type User = z.infer<typeof userSchema>

export const commissionsSchema = z.array(userSchema)
export type Users = z.infer<typeof commissionsSchema>
