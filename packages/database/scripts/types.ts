export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'INDICATOR' | 'PROFESSIONAL'

export type ReferralStatus = 'PENDING' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'

export type AttendanceStatus = 'SCHEDULED' | 'COMPLETED' | 'NO_SHOW' | 'CANCELLED'

export type CommissionStatus = 'PENDING' | 'APPROVED' | 'PAID'

export type CommissionType = 'PERCENTAGE' | 'FIXED'

export type PaymentStatus = 'PENDING' | 'PAID' | 'CANCELLED'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface Referral {
  id: string
  indicator: { id: string }
  professional: { id: string }
  patientName: string
  patientEmail?: string
  patientPhone?: string
  reason: string
  specialty: string
  notes?: string
  status: ReferralStatus
  scheduledDate: string
  scheduledTime: string
}

export interface Attendance {
  referralId: string
  professionalId: string
  date: string
  startTime: string
  endTime: string
  status: AttendanceStatus
  notes?: string
}

export interface Payment {
  referralId: string
  totalAmount: number
  commissionType: CommissionType
  commissionValue: number
  status: PaymentStatus
  paymentDate?: string | null
  notes?: string
}

export interface Commission {
  referralId: string
  indicatorId: string
  amount: number
  status: CommissionStatus
  generatedAt: string
  notes?: string
}
