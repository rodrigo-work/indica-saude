import { z } from 'zod'

export const referralSchema = z.object({
  patientName: z.string(),
  patientEmail: z.string().email().optional(),
  patientPhone: z.string().optional(),
  professionalId: z.string(),
  scheduledDate: z.string(),
  scheduledTime: z.string(),
  notes: z.string().optional()
})
