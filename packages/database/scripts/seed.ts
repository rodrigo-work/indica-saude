import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { __DIRNAME, FILE_NAME } from './config'
import { PrismaClient } from '@workspace/database/generated/client'

const prisma = new PrismaClient()

export async function seed() {
  const filePath = path.join(__DIRNAME,  FILE_NAME)
  const fileContent = await readFile(filePath, 'utf-8')
  const { admins, indicators, professionals, referrals, attendances, payments, commissions } =
    JSON.parse(fileContent)

  // Upsert admins
  for (const user of admins) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: '123123',
        role: user.role,
        active: true
      }
    })
  }

  // Upsert indicators
  for (const user of indicators) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: '123123',
        role: user.role,
        active: true
      }
    })
  }

  // Upsert professionals
  for (const user of professionals) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: '123123',
        role: user.role,
        active: true
      }
    })
  }

  // Create referrals and related records
  for (const referral of referrals) {
    const attendance = attendances.find((a: { referralId: any }) => a.referralId === referral.id)
    const payment = payments.find((p: { referralId: any }) => p.referralId === referral.id)
    const commission = commissions.find((c: { referralId: any }) => c.referralId === referral.id)

    await prisma.referral.create({
      data: {
        id: referral.id,
        indicatorId: referral.indicator.id,
        professionalId: referral.professional.id,
        patientName: referral.patientName,
        patientEmail: referral.patientEmail || null,
        patientPhone: referral.patientPhone || null,
        reason: referral.reason,
        specialty: referral.specialty,
        notes: referral.notes || null,
        status: referral.status,
        scheduledDate: new Date(referral.scheduledDate),
        scheduledTime: referral.scheduledTime,

        // Relations
        attendances: attendance
          ? {
              create: {
                date: new Date(attendance.date),
                startTime: attendance.startTime,
                endTime: attendance.endTime,
                status: attendance.status,
                notes: attendance.notes || null,
                professionalId: attendance.professionalId
              }
            }
          : undefined,

        payments: payment
          ? {
              create: {
                totalAmount: payment.totalAmount,
                commissionType: payment.commissionType,
                commissionValue: payment.commissionValue,
                status: payment.status,
                paymentDate: payment.paymentDate ? new Date(payment.paymentDate) : null,
                notes: payment.notes || null
              }
            }
          : undefined,

        commissions: commission
          ? {
              create: {
                indicatorId: commission.indicatorId,
                amount: commission.amount,
                status: commission.status,
                generatedAt: new Date(commission.generatedAt),
                notes: commission.notes || null
              }
            }
          : undefined
      }
    })
  }

  console.log('✅ Seed completed successfully!')
}

seed()
  .catch(async (e) => {
    console.error('❌ Error seeding the database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
