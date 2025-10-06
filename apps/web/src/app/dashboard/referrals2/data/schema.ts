import { z } from 'zod'

export const referralSchema = z
  .object({
    id: z.string(),
    indicatorId: z.string(),
    professionalId: z.string(),
    patientName: z.string(),
    patientPhone: z.string(),
    patientEmail: z.string(),
    professional: z.any(),
    reason: z.string(),

    status: z.literal(['PENDING', 'SCHEDULED', 'COMPLETED', 'CANCELLED']),
    scheduledDate: z.string(),
    scheduledTime: z.string(),
    professionalName: z.string()
  })
  .strip()
export type Referral = z.infer<typeof referralSchema>

export const referralsSchema = z.array(referralSchema)
export type Referrals = z.infer<typeof referralsSchema>

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended')
])
export type UserStatus = z.infer<typeof userStatusSchema>
