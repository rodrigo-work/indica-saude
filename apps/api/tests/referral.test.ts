import express from 'express'
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import router from '../src/routes/referrals.js'

const app = express()
app.use('/', router)

describe('GET /referrals', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    console.log(JSON.stringify(res.body.data, null, 2))
  })
})
