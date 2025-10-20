import { createEnv } from '@t3-oss/env-nextjs'
import { keys as auth } from '@workspace/auth/keys'
import { keys as core } from '@workspace/next-config/keys'

export const env = createEnv({
  extends: [auth(), core()],
  server: {},
  client: {},
  runtimeEnv: {}
})
