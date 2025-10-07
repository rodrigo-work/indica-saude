import 'dotenv/config'
import app from './app.js'
import { env } from './env.js'

if (process.env.NODE_ENV !== 'production') {
  const port = env.PORT

  app.listen(port, () => {
    console.log(`🚀 Api running on http://localhost:${port}`)
  })
}

export default app
