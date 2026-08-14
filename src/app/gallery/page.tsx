import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { FooterCTA } from '@/components/sections/FooterCTA'

export const metadata: Metadata = {
  title: 'Visual Gallery | 1111 Decor',
  description: 'Immerse in visual inspiration of our bespoke floral staging, tablescapes, and gala setups.',
}

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop',
]

export default function GalleryPage() {
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
        <span className="label">Visual Portfolio</span>
        <h1 className="heading-xl" style={{ marginTop: '0.5rem', color: 'var(--color-secondary)' }}>
          Luxury Gallery
        </h1>
      </div>
      <div className="section-padding container">
        <div className="grid-responsive-3">
          {GALLERY_IMAGES.map((src, idx) => (
            <div key={idx} className="card-base" style={{ height: '320px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image src={src} alt={`1111 Decor Event Showcase ${idx + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
      <FooterCTA />
    </div>
  )
}
