import { z } from 'zod'

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  email_verified: z.boolean().default(false),
  role: z.string(), // z.enum(['SUPERUSER', 'ADMIN', 'USER']),
  active: z.boolean(),
  updatedAt: z.date()
})
export type User = z.infer<typeof userSchema>

export const usersSchema = z.array(userSchema)
export type Users = z.infer<typeof usersSchema>
