import { CallToAction } from '@/components/layout/cta'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/layout/hero'
import { TestimonialsSection } from '@/components/layout/testimonials'

export default function Home() {
  return (
    <div className="container-- relative-- mx-auto-- grid-- gap-24-- py-16-- sm:gap-32--">
      {/* <Hero /> */}
      {/* <Logos /> */}
      {/* <Comparison /> */}
      {/* <ContentSection /> */}
      <HeroSection />
      <CallToAction />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
