import { z } from 'zod'

export const attendanceSchema = z.object({
  referralId: z.string(),
  professionalId: z.string().optional(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'NO_SHOW', 'CANCELLED']),
  notes: z.string().optional()
})
