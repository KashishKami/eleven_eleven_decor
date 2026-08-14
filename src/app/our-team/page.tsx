import React from 'react'
import type { Metadata } from 'next'
import { TeamSection } from '@/components/sections/TeamSection'
import { FooterCTA } from '@/components/sections/FooterCTA'

export const metadata: Metadata = {
  title: 'Our Team | 1111 Decor',
  description: 'Meet the creative directors, chefs, and event architects of 1111 Decor.',
}

export default function OurTeamPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <TeamSection />
      <FooterCTA />
    </div>
  )
}
