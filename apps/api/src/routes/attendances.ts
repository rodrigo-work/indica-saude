import { type Request, type Response, Router } from 'express'
import { database } from '../lib/database.js'

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || 10

    const skip = (page - 1) * limit

    const [attendances, total] = await Promise.all([
      database.attendance.findMany({
        include: {
          referral: true,
          professional: true
        },
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }),
      database.attendance.count()
    ])

    const totalPages = Math.ceil(total / limit)

    res.json({
      meta: {
        success: true,
        timeStamp: new Date().toISOString(),
        total,
        page,
        totalPages,
        limit
      },
      data: attendances
    })
  } catch (error) {
    console.error('Error fetching attendances:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

export default router
