import { Chatbot } from '@/features/chatbot'
import { Comparison } from '@/features/comparison'
import { CallToAction } from '@/features/cta'
import { HealthPlans } from '@/features/health-plans'
import { Hero } from '@/features/hero'

export default function IndexPage() {
  return (
    <div className="no-class">
      <Hero />
      <HealthPlans />
      <Chatbot />
      <CallToAction />
      <Comparison />
    </div>
  )
}
