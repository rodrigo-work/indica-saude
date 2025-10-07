import {
  AttendanceStatus,
  CommissionStatus,
  CommissionType,
  PaymentStatus,
  PrismaClient,
  ReferralStatus,
  Role
} from '../generated/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding iniciando…')

  // Usuários
  const usersData = [
    { name: 'Super Admin', email: 'superadmin@example.com', role: Role.SUPERADMIN },
    { name: 'Admin User', email: 'admin@example.com', role: Role.ADMIN },
    { name: 'Indicator One', email: 'indicator1@example.com', role: Role.INDICATOR },
    { name: 'Indicator Two', email: 'indicator2@example.com', role: Role.INDICATOR },
    { name: 'Professional One', email: 'professional1@example.com', role: Role.PROFESSIONAL },
    { name: 'Professional Two', email: 'professional2@example.com', role: Role.PROFESSIONAL }
  ]

  const users = await Promise.all(
    usersData.map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: {
          name: u.name,
          email: u.email,
          role: u.role
        }
      })
    )
  )

  const indicator1 = users.find((u) => u.email === 'indicator1@example.com')!
  const indicator2 = users.find((u) => u.email === 'indicator2@example.com')!
  const professional1 = users.find((u) => u.email === 'professional1@example.com')!
  const professional2 = users.find((u) => u.email === 'professional2@example.com')!

  // Referrals múltiplos
  const referralsData = [
    {
      indicatorId: indicator1.id,
      professionalId: professional1.id,
      patientName: 'Alice Silva',
      patientEmail: 'alice.silva@example.com',
      patientPhone: '11999990001',
      reason: 'Consulta preventiva',
      specialty: 'Dermatologia',
      scheduledDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      scheduledTime: '09:00'
    },
    {
      indicatorId: indicator2.id,
      professionalId: professional2.id,
      patientName: 'Bruno Souza',
      patientEmail: 'bruno.souza@example.com',
      patientPhone: '11999990002',
      reason: 'Acompanhamento cardiológico',
      specialty: 'Cardiologia',
      scheduledDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      scheduledTime: '14:30'
    }
  ]

  const referrals = await Promise.all(
    referralsData.map((r) =>
      prisma.referral.create({
        data: {
          indicatorId: r.indicatorId,
          professionalId: r.professionalId,
          patientName: r.patientName,
          patientEmail: r.patientEmail,
          patientPhone: r.patientPhone,
          reason: r.reason,
          specialty: r.specialty,
          status: ReferralStatus.PENDING,
          scheduledDate: r.scheduledDate,
          scheduledTime: r.scheduledTime,
          notes: `Referral criado por seed para ${r.patientName}`
        }
      })
    )
  )

  // Para cada referral, criar attendance, payment e commission
  for (const referral of referrals) {
    // Attendance
    await prisma.attendance.create({
      data: {
        referralId: referral.id,
        professionalId: referral.professionalId,
        date: referral.scheduledDate,
        startTime: referral.scheduledTime,
        endTime: '00:00', // ou calcular +X mins
        status: AttendanceStatus.SCHEDULED,
        notes: 'Agendado via seed',
        attachments: null
      }
    })

    // Payment
    const amount = 200.0
    const commissionPerc = 0.1 // 10%
    await prisma.payment.create({
      data: {
        referralId: referral.id,
        totalAmount: amount,
        commissionType: CommissionType.PERCENTAGE,
        commissionValue: amount * commissionPerc,
        status: PaymentStatus.PENDING,
        paymentDate: null,
        notes: 'Pagamento pendente via seed'
      }
    })

    // Commission
    await prisma.commission.create({
      data: {
        indicatorId: referral.indicatorId,
        referralId: referral.id,
        amount: amount * commissionPerc,
        status: CommissionStatus.PENDING,
        notes: 'Comissão criada via seed'
      }
    })
  }

  console.log('Seeding finalizado.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
