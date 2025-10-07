import { database } from '../lib/database.js'
import { AbstractService } from './abstract.service.js'

export class PaymentsService extends AbstractService {
  public async getAllPayments(user: any) {
    let where = {}

    if (user.role === 'INDICATOR') {
      where = {
        referral: {
          indicatorId: user.id
        }
      }
    }
    // se for outro role (ex: ADMIN), where fica vazio = retorna todos
    const [payments, total] = await Promise.all([
      database.payment.findMany({
        where,
        include: {
          referral: true
        },

        orderBy: { updatedAt: 'desc' }
      }),
      database.payment.count({
        where
      })
    ])

    return {
      meta: {
        success: true,
        module: 'payments',
        role: user.role,
        total
      },
      data: payments
    }
  }

  // Define o filtro baseado na role
  // let where = {}

  // if (user.role === 'INDICATOR') {
  //   where = { indicatorId: user.id }
  // }

  // se for outro role (ex: ADMIN), where fica vazio = retorna todos
  //   const [payments, total] = await Promise.all([
  //     database.payment.findMany({
  //       include: {
  //         referral: true
  //       },

  //       orderBy: { updatedAt: 'desc' }
  //     }),
  //     database.payment.count()
  //   ])

  //   return {
  //     meta: {
  //       success: true,
  //       module: 'payments',
  //       role: user.role,
  //       total
  //     },
  //     data: payments
  //   }
  // }
}
