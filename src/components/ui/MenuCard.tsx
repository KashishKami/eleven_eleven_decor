'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MenuItem } from '@/data/menus'

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <div
      className="card-base card-menu"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'transform 0.4s ease, border-color 0.4s ease',
      }}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{ objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.3) 60%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, padding: '1.5rem' }}>
        <span className="label" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.75rem' }}>
          {item.category}
        </span>
        <h3 className="heading-sm" style={{ marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
          {item.title}
        </h3>
        <p className="body-sm" style={{ marginBottom: '1rem', color: '#b0a898' }}>
          {item.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.9375rem' }}>
            {item.price}
          </span>
          <Link
            href={`/menus/${item.slug}`}
            style={{
              color: 'var(--color-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderBottom: '1px solid var(--color-accent)',
            }}
          >
            View Menu →
          </Link>
        </div>
      </div>
    </div>
  )
}
