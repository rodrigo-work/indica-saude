import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  indicatorId: z.string(),
  professionalId: z.string(),
  professionalName: z.string(),
  status: z.string(),
  scheduledDate: z.any(),
  scheduledTime: z.any()
})

export type Task = z.infer<typeof taskSchema>

export const tasksSchema = z.array(taskSchema)

export type Tasks = z.infer<typeof tasksSchema>

export const indicatorSchema = z.object({
  id: z.string()
})

export const referralSchema = z
  .object({
    id: z.string(),
    // indicatorId: z.string(),
    // professionalId: z.string(),
    patientName: z.string(),
    patientPhone: z.string(),
    patientEmail: z.string(),
    // professional: z.string().optional()
    status: z.string(),
    // scheduledDate: z.any(),
    // scheduledTime: z.any(),
    // totalAmount: z.number(),
    // amount: z.number(),
    indicator: z.object({
      name: z.string()
    }),
    professional: z.object({
      name: z.string()
    }),
    attendances: z
      .array(
        z.object({
          date: z.string(),
          startTime: z.string(),
          endTime: z.string(),
          status: z.string()
        })
      )
      .optional(),
    payments: z
      .array(
        z.object({
          totalAmount: z.number(),
          commissionType: z.string(),
          commissionValue: z.number(),
          status: z.string()
        })
      )
      .optional(),
    commissions: z
      .array(
        z.object({
          amount: z.number(),
          status: z.string()
        })
      )
      .optional()
  })
  .transform((data) => ({
    id: data.id,
    patientName: data.patientName,
    patientPhone: data.patientPhone,
    patientEmail: data.patientEmail,
    status: data.status,

    indicator: data.indicator.name,

    professional: data.professional.name,

    attendancedate: data.attendances?.[0]?.date ?? null,
    attendancestartTime: data.attendances?.[0]?.startTime ?? null,
    attendanceendTime: data.attendances?.[0]?.endTime ?? null,
    attendanceStatus: data.attendances?.[0]?.status ?? null,

    paymentAmount: data.payments?.[0]?.totalAmount ?? null,
    paymentType: data.payments?.[0]?.commissionType ?? null,
    paymentCommission: data.payments?.[0]?.commissionValue ?? null,
    paymentStatus: data.payments?.[0]?.status ?? null,

    commissionAmount: data.commissions?.[0]?.amount ?? null,
    commissionStatus: data.commissions?.[0]?.status ?? null
  }))
export type Referral = z.infer<typeof referralSchema>

export const referralsSchema = z.array(referralSchema)
export type Referrals = z.infer<typeof referralsSchema>
