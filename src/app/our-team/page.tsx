import React from 'react'
import type { Metadata } from 'next'
import { TeamSection } from '@/components/sections/TeamSection'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import { generateTeamPageSchemaGraph } from '@/lib/schemaGenerators'

export const metadata: Metadata = {
  title: 'Our Team',
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
      <JsonLd data={generateTeamPageSchemaGraph()} />
      <TeamSection />
      <FooterCTA />
    </div>
  )
}
