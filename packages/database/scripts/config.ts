import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const NUM_ADMINS = 1
export const NUM_INDICATORS = 2
export const NUM_PROFESSIONALS = 3

export const NUM_REFERRALS = 12

export const FILE_NAME = 'fake.json'
export const __DIRNAME = path.dirname(fileURLToPath(import.meta.url))
