/**
 * DTO Types - Data Transfer Objects tipados
 * Define estruturas de dados para Request/Response
 */

import type { Role, ReferralStatus, AttendanceStatus, CommissionStatus, PaymentStatus } from './domain.types.js'

/**
 * DTOs de Request
 */
export interface CreateReferralDto {
  professionalId: string
  patientName: string
  patientEmail?: string
  patientPhone?: string
  reason: string
  specialty: string
  notes?: string
  scheduledDate: Date
  scheduledTime: string
}

export interface UpdateReferralDto {
  status?: ReferralStatus
  notes?: string
  scheduledDate?: Date
  scheduledTime?: string
}

export interface CreateAttendanceDto {
  referralId: string
  date: Date
  startTime: string
  endTime: string
  status?: AttendanceStatus
  notes?: string
  attachments?: string
}

export interface CreatePaymentDto {
  referralId: string
  totalAmount: number
  commissionType: 'PERCENTAGE' | 'FIXED'
  commissionValue: number
  paymentDate?: Date
  notes?: string
}

export interface CreateCommissionDto {
  indicatorId: string
  referralId: string
  amount: number
  status?: CommissionStatus
  notes?: string
}

/**
 * Query Params tipados
 */
export interface GetAllReferralsQuery {
  page?: number
  limit?: number
  status?: ReferralStatus
  indicatorId?: string
  professionalId?: string
}

export interface GetAllAttendancesQuery {
  page?: number
  limit?: number
  status?: AttendanceStatus
  referralId?: string
  professionalId?: string
}

export interface GetAllPaymentsQuery {
  page?: number
  limit?: number
  status?: PaymentStatus
  referralId?: string
}

export interface GetAllCommissionsQuery {
  page?: number
  limit?: number
  status?: CommissionStatus
  indicatorId?: string
  referralId?: string
}

/**
 * Response Types
 */
export interface ApiResponse<T> {
  meta: {
    success: boolean
    module: string
    role?: Role
    total?: number
    page?: number
    totalPages?: number
    limit?: number
    timestamp: string
  }
  data: T
}

export interface PaginatedResponse<T> {
  meta: {
    success: boolean
    total: number
    page: number
    totalPages: number
    limit: number
    timestamp: string
  }
  data: T[]
}

