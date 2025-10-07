import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const NUM_INDICATORS = 0 // [Matheus, Rodrigo] SUPERADMIN
export const NUM_PROFESSIONALS = 2

export const NUM_REFERRALS = 9

export const FILE_NAME = 'fake.json'
export const __DIRNAME = path.dirname(fileURLToPath(import.meta.url))

export const SYSTEMSUERSADMINS = [
  {
    name: 'Rodrigo Ribeiro',
    email: 'me+is+ROLE@rodrigo3d.com',
    role: 'SUPERADMIN'
  },
  {
    name: 'Matheus Leite Praça',
    email: 'mathleitepraca+is+ROLE@gmail.com',
    role: 'ADMIN'
  }
]
