'use client'

import { CallToAction } from '@/components/layout/cta'
import { Footer } from '@/components/layout/footer'
import { SectionPartnersLogo } from '@/components/layout/partners-logo'
import { Hero } from './components/hero'

export default function Home() {
  // useEffect(() => {
  //   const scrollToSection = (event: MouseEvent) => {
  //     const target = event.currentTarget as HTMLAnchorElement
  //     event.preventDefault()

  //     const targetId = target.getAttribute('href')?.substring(1) ?? ''
  //     const targetElement = document.getElementById(targetId)

  //     if (targetElement) {
  //       window.scrollTo({
  //         top: targetElement.offsetTop,
  //         behavior: 'smooth'
  //       })
  //     }
  //   }

  //   const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
  //   links.forEach((link) => link.addEventListener('click', scrollToSection))

  //   return () => {
  //     links.forEach((link) => link.removeEventListener('click', scrollToSection))
  //   }
  // }, [])

  //shadcnexamples.com/multi-step-form

  https: return (
    <div className="container relative mx-auto grid gap-24 py-16 sm:gap-32">
      <Hero />
      <SectionPartnersLogo />
      <CallToAction />
      <Footer />
    </div>
  )
}
