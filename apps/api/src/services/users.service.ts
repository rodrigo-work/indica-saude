import { database } from '../lib/database.js'
import { AbstractService } from './abstract.service.js'

export class UsersService extends AbstractService {
  public async getAllUsers() {
    // const where =
    //   user.role === 'INDICATOR'
    //     ? { indicatorId: user.userId }
    //     : user.role === 'PROFESSIONAL'
    //       ? { professionalId: user.userId }
    //       : {}

    const [users, total] = await Promise.all([
      database.user.findMany({
        // where,
        // include: {
        //   indicator: true,
        //   professional: true,
        //   commissions: true,
        //   attendances: true
        // },

        orderBy: { updatedAt: 'desc' }
      }),
      database.user.count()
    ])

    return {
      meta: {
        success: true,
        timeStamp: new Date().toISOString(),
        total
      },
      data: users
    }
  }

  public async getUsersMe(user: any) {
    // const where =
    //   user.role === 'INDICATOR'
    //     ? { indicatorId: user.userId }
    //     : user.role === 'PROFESSIONAL'
    //       ? { professionalId: user.userId }
    //       : {}



    return {
      meta: {
        success: true,
        timeStamp: new Date().toISOString()
      },
      data: {
        ...user
      }
    }
  }
}
