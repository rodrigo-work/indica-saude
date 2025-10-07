import { z } from 'zod'

export const authSignInSchema = z.object({
  email: z.email(),
  password: z.any()
})
export type AuthSignInSchema = z.infer<typeof authSignInSchema>

export const authSignUpSchema = z.object({
  firstName: z.string().min(3, { message: 'First name must be at least 3 characters.' }),
  lastName: z.string().min(3, { message: 'Last name must be at least 3 characters.' }),
  email: z.email(),
  password: z.any()
})
export type AuthSignUpSchema = z.infer<typeof authSignUpSchema>
