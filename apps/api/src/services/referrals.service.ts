import { database } from '../lib/database.js'
import { AbstractService } from './abstract.service.js'

export class ReferralsService extends AbstractService {
  public async getAllReferrals(user: any) {
    // Define o filtro baseado na role
    let where = {}

    if (user.role === 'INDICATOR') {
      where = { indicatorId: user.id }
    } else if (user.role === 'PROFESSIONAL') {
      where = { professionalId: user.id }
    }
    // se for outro role (ex: ADMIN), where fica vazio = retorna todos
    const [referrals, total] = await Promise.all([
      database.referral.findMany({
        where,
        include: {
          indicator: true,
          professional: true,
          commissions: true,
          attendances: true,
          payments: true
        },

        orderBy: { updatedAt: 'desc' }
      }),
      database.referral.count({
        where
      })
    ])

    const _results = referrals.map((referral) => {
      const { indicator, professional, payments, ...rest } = referral
      return {
        ...rest
        // indicator: referral.indicator,
        // professional: referral.professional,
        // indicatorName: indicator ? indicator.name : null,
        // professionalName: professional ? professional.name : null,
        // referralValue: payments ? payments.totalAmount : null
      }
    })

    return {
      meta: {
        success: true,
        module: 'referrals',
        role: user.role,
        total
      },
      data: referrals
    }
  }
}
