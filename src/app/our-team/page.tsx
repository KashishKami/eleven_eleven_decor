import React from 'react'
import type { Metadata } from 'next'
import { TeamSection } from '@/components/sections/TeamSection'
import { FooterCTA } from '@/components/sections/FooterCTA'

export const metadata: Metadata = {
  title: 'Our Team | 11:11 Decor',
  description: 'Meet the creative directors, chefs, and event architects of 11:11 Decor.',
  openGraph: {
    title: 'Our Team | 11:11 Decor',
    description: 'Meet the creative directors, chefs, and event architects of 11:11 Decor.',
    url: 'https://1111decor.com/our-team/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://1111decor.com/our-team/',
  },
}

export default function OurTeamPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <TeamSection />
      <FooterCTA />
    </div>
  )
}
