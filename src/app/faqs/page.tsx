import React from 'react'
import type { Metadata } from 'next'
import { FooterCTA } from '@/components/sections/FooterCTA'

export const metadata: Metadata = {
  title: 'FAQs | 1111 Decor',
  description: 'Frequently asked questions about 1111 Decor event design and catering reservations.',
}

export default function FaqsPage() {
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
        <span className="label">Help Center</span>
        <h1 className="heading-xl" style={{ marginTop: '0.5rem', color: 'var(--color-secondary)' }}>
          Frequently Asked Questions
        </h1>
      </div>
      <div className="section-padding container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#1b1b1b', padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="heading-sm" style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
              How far in advance should we reserve our event date?
            </h3>
            <p className="body-md">
              We recommend booking 6 to 12 months in advance for weddings and major corporate galas to ensure custom spatial rendering and floral sourcing priority.
            </p>
          </div>
          <div style={{ backgroundColor: '#1b1b1b', padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="heading-sm" style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
              Do you accommodate dietary requirements for custom menus?
            </h3>
            <p className="body-md">
              Yes! Our culinary team crafts bespoke vegan, gluten-free, kosher, and halal dining menus tailored to your guest preferences.
            </p>
          </div>
        </div>
      </div>
      <FooterCTA />
    </div>
  )
}
