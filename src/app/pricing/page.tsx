import type { Metadata } from 'next'

import Pricing from '@/components/sections/pricing/Pricing'
import Faq from '@/components/sections/pricing/Faq'
import Cta from '@/components/sections/pricing/Cta'

export const metadata: Metadata = {
  title: 'Drongo',
  description: 'Welcome to Pricing',
}

export default function PricingPage() {
  return (
    <>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="faq">
        <Faq />
      </section>
      <section id="cta">
        <Cta />
      </section>
    </>
  )
}
