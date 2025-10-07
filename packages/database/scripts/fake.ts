import { base, Faker, pt_BR } from '@faker-js/faker'
import { NUM_INDICATORS, NUM_PROFESSIONALS, NUM_REFERRALS, SYSTEMSUERSADMINS } from './config'
import type {
  Attendance,
  AttendanceStatus,
  Commission,
  CommissionStatus,
  CommissionType,
  Payment,
  PaymentStatus,
  Referral,
  ReferralStatus,
  User,
  UserRole
} from './types'

const faker = new Faker({ locale: [pt_BR, base] })

export const fakeReferrals = {
  admins: [] as User[],
  indicators: [] as User[],
  professionals: [] as User[],
  referrals: [] as Referral[],
  attendances: [] as Attendance[],
  payments: [] as Payment[],
  commissions: [] as Commission[],

  initialize() {
    this.admins = SYSTEMSUERSADMINS.map((user) => ({
      id: faker.string.uuid(),
      name: user.name.replace('ROLE', user.role),
      email: user.email.replace('ROLE', user.role.toLowerCase()),
      role: user.role as UserRole
    }))

    this.indicators = SYSTEMSUERSADMINS.map((user) => ({
      id: faker.string.uuid(),
      name: `${user.name.replace('ROLE', `INDICATOR`)}`,
      email: `${user.email.replace('ROLE', `INDICATOR`).toLowerCase()}`,
      role: 'INDICATOR' as UserRole
    }))

    // this.indicators = Array.from({ length: NUM_INDICATORS }).map((_, i) => ({
    //   id: faker.string.uuid(),
    //   name: `${faker.person.fullName()}`,
    //   email: `indicator${i + 1}@fake.com`,
    //   role: 'INDICATOR' as UserRole
    // }))

    this.professionals = SYSTEMSUERSADMINS.map((user, i) => ({
      id: faker.string.uuid(),
      name: `Dr. ${user.name.replace('ROLE', `PROFESSIONAL`)} `,
      email: `${user.email.replace('ROLE', `PROFESSIONAL`).toLowerCase()}`,
      role: 'PROFESSIONAL' as UserRole
    }))

    // this.professionals = Array.from({ length: NUM_PROFESSIONALS }).map((_, i) => ({
    //   id: faker.string.uuid(),
    //   name: `Dr. ${faker.person.fullName()}`,
    //   email: `professional${i + 1}@fake.com`,
    //   role: 'PROFESSIONAL' as UserRole
    // }))

    const referralStatuses: ReferralStatus[] = ['PENDING', 'SCHEDULED', 'COMPLETED', 'CANCELLED']
    const attendanceStatuses: AttendanceStatus[] = [
      'SCHEDULED',
      'COMPLETED',
      'NO_SHOW',
      'CANCELLED'
    ]
    const commissionStatuses: CommissionStatus[] = ['PAID', 'PENDING', 'APPROVED']
    const commissionTypes: CommissionType[] = ['PERCENTAGE', 'FIXED']
    const paymentStatuses: PaymentStatus[] = ['PAID', 'PENDING', 'CANCELLED']

    for (let i = 0; i < NUM_REFERRALS; i++) {
      const possibleIndicators = [...this.indicators]
      const possibleProfessionals = [...this.professionals]
      const indicator = faker.helpers.arrayElement(possibleIndicators)
      const professional = faker.helpers.arrayElement(possibleProfessionals)
      const referralId = faker.string.uuid()
      const scheduledDate = faker.date.soon({ days: 30 })
      const scheduledTime = `${10 + (i % 5)}:00`
      const hour = Number.parseInt(scheduledTime)
      const commissionType = faker.helpers.arrayElement(commissionTypes)
      const paymentStatus = faker.helpers.arrayElement(paymentStatuses)
      const commissionStatus = faker.helpers.arrayElement(commissionStatuses)

      const patientName = faker.person.firstName() + ' ' + faker.person.lastName()

      // Referral
      this.referrals.push({
        id: referralId,
        indicator: { id: indicator.id },
        professional: { id: professional.id },
        patientName,
        patientEmail: `${patientName.replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase()}@example.com`, // faker.internet.email(),
        patientPhone: faker.phone.number('+55 11 9####-####'),
        reason: faker.lorem.words(3),
        specialty: faker.helpers.arrayElement(['Clínico Geral', 'Pediatria', 'Ortopedia']),
        notes: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(referralStatuses),
        scheduledDate: scheduledDate.toISOString().split('T')[0],
        scheduledTime
      })

      // Attendance
      this.attendances.push({
        referralId,
        professionalId: professional.id,
        date: scheduledDate.toISOString().split('T')[0],
        startTime: scheduledTime,
        endTime: `${hour + 1}:00`,
        status: faker.helpers.arrayElement(attendanceStatuses),
        notes: faker.lorem.sentence()
      })

      // Payment
      this.payments.push({
        referralId,
        totalAmount: faker.number.float({ min: 150, max: 300, precision: 0.01 }),
        commissionType,
        commissionValue: commissionType === 'PERCENTAGE' ? 10 : 50,
        status: paymentStatus,
        paymentDate:
          paymentStatus === 'PAID' ? faker.date.recent().toISOString().split('T')[0] : null,
        notes: faker.lorem.words(5)
      })

      // Commission
      this.commissions.push({
        referralId,
        indicatorId: indicator.id,
        amount: faker.number.float({ min: 20, max: 50, precision: 0.01 }),
        status: commissionStatus,
        generatedAt: faker.date.recent().toISOString().split('T')[0],
        notes: faker.lorem.words(3)
      })
    }
  },

  getFinalJson() {
    return {
      admins: this.admins,
      indicators: this.indicators,
      professionals: this.professionals,
      referrals: this.referrals,
      attendances: this.attendances,
      payments: this.payments,
      commissions: this.commissions
    }
  }
}
