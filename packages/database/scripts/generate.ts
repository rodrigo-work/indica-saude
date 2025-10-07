import fs from 'node:fs'
import path from 'node:path'
import { __DIRNAME, FILE_NAME } from './config'
import { fakeReferrals } from './fake'

fakeReferrals.initialize()

const json = fakeReferrals.getFinalJson()

const filePath = path.resolve(__DIRNAME, FILE_NAME)

fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf-8')

console.log(`✅ referrals.json gerado em ${filePath}`)
