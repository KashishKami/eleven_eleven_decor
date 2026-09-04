import React from 'react'
import type { Metadata } from 'next'
import { MenusSection } from '@/components/sections/MenusSection'
import { FooterCTA } from '@/components/sections/FooterCTA'

export const metadata: Metadata = {
  title: 'Our Menu | 11:11 Decor',
  description: 'Explore gourmet catering menus, multi-course tasting banquets, and artisanal dishes by 11:11 Decor.',
  openGraph: {
    title: 'Our Menu | 11:11 Decor',
    description: 'Explore gourmet catering menus, multi-course tasting banquets, and artisanal dishes by 11:11 Decor.',
    url: 'https://1111decor.com/menu/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://1111decor.com/menu/',
  },
}

export default function MenuPage() {
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
        <span className="label">Culinary Offerings</span>
        <h1 className="heading-xl" style={{ marginTop: '0.5rem', color: 'var(--color-secondary)' }}>
          Our Gastronomy & Catering Menus
        </h1>
      </div>
      <MenusSection />
      <FooterCTA />
    </div>
  )
}
