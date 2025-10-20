import { z } from 'zod'

export const profileSchema = z
  .object({
    sub: z.string(),
    email: z.string(),
    name: z.string(),
    family_name: z.string(),
    picture: z.string().optional()
  })
  .transform((data) => ({
    // ...data,
    sub: data.sub,
    name: `${data.name} ${data.family_name}`,
    email: data.email,
    picture: data.picture
  }))

export type Profile = z.infer<typeof profileSchema>

export interface Profile2 {
  exp: number
  iat: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: string
  azp: string
  session_state: string
  acr: string
  realm_access: RealmAccess
  resource_access: ResourceAccess
  scope: string
  sid: string
  email_verified: boolean
  userRealmRole: string[]
  name: string | any
  preferred_username: string
  groupMembership: any[]
  given_name: string
  family_name: string
  email: string | any
  picture: string | any

  status: string
  message: string
}

export interface RealmAccess {
  roles: string[]
}

export interface ResourceAccess {
  account: Account
}

export interface Account {
  roles: string[]
}
