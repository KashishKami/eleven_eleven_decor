import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import pageVisibility from '../../../php-admin/data/page-visibility.json'
import { FooterCTA } from '@/components/sections/FooterCTA'

export const metadata: Metadata = {
  title: 'Venues Archive | 1111 Decor',
  description: 'Explore premier partner venues and exclusive historic estates styled by 1111 Decor.',
}

export default function VenuePage() {
  if (!pageVisibility.venues) {
    notFound()
  }
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
        <span className="label">Exclusive Locations</span>
        <h1 className="heading-xl" style={{ marginTop: '0.5rem', color: 'var(--color-secondary)' }}>
          Partner Venues Archive
        </h1>
      </div>
      <div className="section-padding container">
        <p className="body-lg" style={{ textAlign: 'center' }}>
          Discover our curated collection of luxury estates, historic ballrooms, and oceanfront pavilions available for your event.
        </p>
      </div>
      <FooterCTA />
    </div>
  )
}
