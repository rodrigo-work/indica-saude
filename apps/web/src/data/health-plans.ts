import { z } from 'zod'

export const healthPlanSchema = z.object({
  name: z.string(),
  image: z.string()
})
export type HealthPlan = z.infer<typeof healthPlanSchema>

export const healthPlansSchema = z.array(healthPlanSchema)
export type HealthPlans = z.infer<typeof healthPlansSchema>

/**
 * Mock health plans data.
 */
export const HEALTH_PLANS: HealthPlans = [
  {
    name: 'Bradesco Saúde',
    image: '/images/health-plans/bradesco-saude.png'
  },
  {
    name: 'Amil',
    image: '/images/health-plans/amil.png'
  },
  {
    name: 'Hapvida',
    image: '/images/health-plans/hapvida.png'
  },
  {
    name: 'Golden Cross',
    image: '/images/health-plans/golden-cross.png'
  },
  {
    name: 'Prevent Senior',
    image: '/images/health-plans/prevent-senior.png'
  },
  {
    name: 'Qualicorp',
    image: '/images/health-plans/qualicorp.png'
  },
  {
    name: 'SulAmérica Saúde',
    image: '/images/health-plans/sulamerica-saude.png'
  },
  {
    name: 'Unimed',
    image: '/images/health-plans/unimed.png'
  },
  {
    name: 'Omint',
    image: '/images/health-plans/omint.png'
  }
]
