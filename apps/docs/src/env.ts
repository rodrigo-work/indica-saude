import { createEnv } from '@t3-oss/env-nextjs'
import { keys as core } from '@workspace/next-config/keys'

export const env = createEnv({
  extends: [core()],
  server: {},
  client: {},
  runtimeEnv: {}
})
