import React from 'react'
import type { Metadata } from 'next'
import { EventCategories } from '@/components/sections/EventCategories'
import { FooterCTA } from '@/components/sections/FooterCTA'

export const metadata: Metadata = {
  title: 'All Events | 1111 Decor',
  description: 'Browse luxury corporate galas, royal weddings, social soirees, and private dinner experiences.',
}

export default function EventPage() {
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
        <span className="label">Event Archives</span>
        <h1 className="heading-xl" style={{ marginTop: '0.5rem', color: 'var(--color-secondary)' }}>
          Luxury Events & Celebrations
        </h1>
      </div>
      <EventCategories />
      <FooterCTA />
    </div>
  )
}
