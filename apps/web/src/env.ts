import { createEnv } from '@t3-oss/env-nextjs'
import { keys as database } from '../../../packages/database/keys'
import { keys as core } from '../../../packages/next-config/keys'

export const env = createEnv({
  extends: [core(), database()],
  server: {},
  client: {},
  runtimeEnv: {}
})
