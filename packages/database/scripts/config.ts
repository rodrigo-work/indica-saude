import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const NUM_INDICATORS = 0 // [Matheus, Rodrigo] SUPERADMIN
export const NUM_PROFESSIONALS = 2

export const NUM_REFERRALS = 5

export const FILE_NAME = 'fake.json'
export const __DIRNAME = path.dirname(fileURLToPath(import.meta.url))

export const SYSTEMSUERSADMINS = [
  {
    name: 'Rodrigo Ribeiro - ROLE',
    email: 'me+indica-saude+ROLE@rodrigo3d.com',
    role: 'SUPERADMIN'
  },
  {
    name: 'Matheus Leite Praça - ROLE',
    email: 'mathleitepraca+indica-saude+ROLE@gmail.com',
    role: 'ADMIN'
  }
]
