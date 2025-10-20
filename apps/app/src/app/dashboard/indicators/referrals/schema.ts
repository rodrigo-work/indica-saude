import { z } from 'zod'

export const userSchema2 = z.object({
  id: z.string(),
  name: z.string(),
  patientEmail: z.string(),
  patientPhone: z.string(),
  professionalId: z.string(),
  scheduledDate: z.string(),
  scheduledTime: z.string(),
  referralId: z.string(),
  amount: z.number(),
  // status: z.enum(['PENDING', 'PAID']),
  // generatedAt: z.string(),
  // notes: z.string().optional(),
  referral: z.object({
    id: z.string()
  })
})
export const userSchema = z.object({
  id: z.string(),
  patientName: z.string(),
  patientEmail: z.string(),
  patientPhone: z.string(),
  professionalId: z.string(),
  scheduledDate: z.string(),
  scheduledTime: z.string(),
  referralId: z.string(),
  amount: z.number(),
  status: z.string(),
  // status: z.enum(['PENDING', 'PAID']),
  // generatedAt: z.string(),
  // notes: z.string().optional(),
  referral: z.object({
    id: z.string()
  }),
  professional: z.object({
    id: z.string(),
    name: z.string()
  })
})
export type Referral = z.infer<typeof userSchema>

export const commissionsSchema = z.array(userSchema)
export type Referrals = z.infer<typeof commissionsSchema>
