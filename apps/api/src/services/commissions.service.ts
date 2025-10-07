import { database } from '../lib/database.js'
import { AbstractService } from './abstract.service.js'

export class CommissionsService extends AbstractService {
  public async getAllCommissions(user: any) {
    // Define o filtro baseado na role
    let where = {}

    if (user.role === 'INDICATOR') {
      where = { indicatorId: user.id }
    }
    // se for outro role (ex: ADMIN), where fica vazio = retorna todos
    const [commissions, total] = await Promise.all([
      database.commission.findMany({
        where,
        include: {
          referral: true,
          indicator: true
        },

        orderBy: { generatedAt: 'desc' }
      }),
      database.commission.count({
        where
      })
    ])

    return {
      meta: {
        success: true,
        module: 'commissions',
        role: user.role,
        total
      },
      data: commissions
    }
  }
}
