import { database } from '../lib/database.js'
import type { AuthenticatedUser, Role } from '../types/domain.types.js'
import type { ApiResponse, GetAllReferralsQuery } from '../types/dto.types.js'
import { AbstractService } from './abstract.service.js'

export class ReferralsService extends AbstractService {
  public async getAllReferrals(
    user: AuthenticatedUser,
    query: GetAllReferralsQuery = {}
  ): Promise<ApiResponse<unknown[]>> {
    // Define o filtro baseado na role
    const where: Record<string, unknown> = {}

    if (user.role === Role.INDICATOR) {
      where.indicatorId = user.id
    } else if (user.role === Role.PROFESSIONAL) {
      where.professionalId = user.id
    }
    // Se for ADMIN ou SUPERADMIN, where fica vazio = retorna todos

    // Aplica filtros adicionais da query
    if (query.status) {
      where.status = query.status
    }
    if (query.indicatorId) {
      where.indicatorId = query.indicatorId
    }
    if (query.professionalId) {
      where.professionalId = query.professionalId
    }

    const page = query.page || 1
    const limit = query.limit || 10
    const skip = (page - 1) * limit

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
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit
      }),
      database.referral.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return {
      meta: {
        success: true,
        module: 'referrals',
        role: user.role,
        total,
        page,
        totalPages,
        limit,
        timestamp: new Date().toISOString()
      },
      data: referrals
    }
  }
}
