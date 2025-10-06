import { createEnv } from '@t3-oss/env-nextjs'
import { keys as database } from '@workspace/database/keys'
import { keys as core } from '@workspace/next-config/keys'
import z from 'zod'

export const env = createEnv({
  extends: [core(), database()],
  server: {
   COGNITO_ISSUER: z.string().optional(),
   COGNITO_CLIENT_ID: z.string().optional()
  },
  client: {},
  runtimeEnv: {
    COGNITO_ISSUER: process.env.COGNITO_ISSUER,
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID
  }
})
