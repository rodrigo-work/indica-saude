import { database } from '../lib/database.js'
import { AbstractService } from './abstract.service.js'

export class AttendancesService extends AbstractService {
  public async getAllAttendances(user: any) {
    // Define o filtro baseado na role
    let where = {}

    if (user.role === 'PROFESSIONAL') {
      where = { professionalId: user.id }
    } else if (user.role === 'INDICATOR') {
      throw new Error('FORBIDDEN')
    }
    // se for outro role (ex: ADMIN), where fica vazio = retorna todos
    const [attendances, total] = await Promise.all([
      database.attendance.findMany({
        where,
        include: {
          referral: true,
          professional: true
        },

        orderBy: { updatedAt: 'desc' }
      }),
      database.attendance.count({
        where
      })
    ])

    return {
      meta: {
        success: true,
        module: 'attendances',
        role: user.role,
        total
      },
      data: attendances
    }
  }
}
