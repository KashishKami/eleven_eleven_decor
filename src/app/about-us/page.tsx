import React from 'react'
import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/AboutSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { FooterCTA } from '@/components/sections/FooterCTA'

export const metadata: Metadata = {
  title: 'About Us | 1111 Decor',
  description: 'Learn about 1111 Decor, our creative story, 15+ years of luxury event styling and catering mastery.',
}

export default function AboutUsPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <div
        style={{
          backgroundColor: '#121212',
          paddingBlock: '4rem 3rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(201, 169, 110, 0.2)',
        }}
      >
        <span className="label">1111 Decor Narrative</span>
        <h1 className="heading-xl" style={{ marginTop: '0.5rem', color: 'var(--color-secondary)' }}>
          About Our Creative Studio
        </h1>
      </div>
      <AboutSection />
      <TeamSection />
      <StatsSection />
      <FooterCTA />
    </div>
  )
}
