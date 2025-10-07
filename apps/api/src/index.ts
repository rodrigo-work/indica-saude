import 'dotenv/config'
import express from 'express'
import { env } from './env.js'
import attendancesRouter from './routes/attendances.js'
import commissionsRouter from './routes/commissions.js'
import paymentsRouter from './routes/payments.js'
import referralsRouter from './routes/referrals.js'
import usersRouter from './routes/users.js'

const app = express()
const PORT = env.PORT

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/referrals', referralsRouter)
app.use('/api/attendances', attendancesRouter)
app.use('/api/commissions', commissionsRouter)

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
