import type { Metadata } from 'next'

import Hero from '@/components/sections/home/Hero'
import Features from '@/components/sections/home/Features'

export const metadata: Metadata = {
  title: 'Drongo',
  description: 'Welcome to Home',
}

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
    </>
  )
}
