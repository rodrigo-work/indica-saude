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
  console.log('Start seeding …')

  // 1. Usuários iniciais
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@example.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'superadmin@example.com',
      role: Role.SUPERADMIN
    }
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      role: Role.ADMIN
    }
  })

  const indicator = await prisma.user.upsert({
    where: { email: 'indicator@example.com' },
    update: {},
    create: {
      name: 'Indicator User',
      email: 'indicator@example.com',
      role: Role.INDICATOR
    }
  })

  const professional = await prisma.user.upsert({
    where: { email: 'professional@example.com' },
    update: {},
    create: {
      name: 'Professional User',
      email: 'professional@example.com',
      role: Role.PROFESSIONAL
    }
  })

  // 2. Referral de exemplo
  const referral = await prisma.referral.create({
    data: {
      indicatorId: indicator.id,
      professionalId: professional.id,
      patientName: 'John Doe',
      patientEmail: 'johndoe@example.com',
      patientPhone: '1234567890',
      reason: 'Consulta de rotina',
      specialty: 'Cardiologia',
      notes: 'Observações iniciais',
      status: ReferralStatus.PENDING,
      scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // daqui 7 dias
      scheduledTime: '10:00'
    }
  })

  // 3. Attendance de exemplo ligado ao referral
  const attendance = await prisma.attendance.create({
    data: {
      referralId: referral.id,
      professionalId: professional.id,
      date: referral.scheduledDate,
      startTime: '10:00',
      endTime: '10:30',
      status: AttendanceStatus.SCHEDULED,
      notes: 'Preparar sala',
      attachments: null
    }
  })

  // 4. Payment de exemplo ligado ao referral
  const payment = await prisma.payment.create({
    data: {
      referralId: referral.id,
      totalAmount: 150.0,
      commissionType: CommissionType.PERCENTAGE,
      commissionValue: 10.0, // 10% por exemplo
      status: PaymentStatus.PENDING,
      paymentDate: null,
      notes: 'Pagamento pendente'
    }
  })

  // 5. Commission de exemplo
  const commission = await prisma.commission.create({
    data: {
      indicatorId: indicator.id,
      referralId: referral.id,
      amount: 15.0, // 10% de 150
      status: CommissionStatus.PENDING,
      notes: 'Comissão a liberar'
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
