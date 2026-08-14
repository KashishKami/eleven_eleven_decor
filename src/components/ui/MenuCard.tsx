'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MenuItem } from '@/data/menus'

interface MenuCardProps {
  menu: MenuItem
}

export function MenuCard({ menu }: MenuCardProps) {
  if (!menu) return null

  const imageSrc =
    menu.image ||
    'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop'
  const priceDisplay = menu.price.includes('/ guest') || menu.price.includes('/ person')
    ? menu.price
    : `${menu.price} / guest`

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={imageSrc}
          alt={menu.title || 'Menu Item'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            color: '#c9a96e',
            fontWeight: 600,
            fontSize: '0.875rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            border: '1px solid rgba(201, 169, 110, 0.3)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {priceDisplay}
        </div>
      </div>

      <div
        style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            color: '#c9a96e',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          {menu.category}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: '#1a1a1a',
            marginBottom: '0.75rem',
            fontWeight: 600,
          }}
        >
          {menu.title}
        </h3>

        <p
          style={{
            color: '#5a544c',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            flexGrow: 1,
          }}
        >
          {menu.description}
        </p>

        <Link
          href={`/menus/${menu.slug || 'menu-detail'}`}
          style={{
            color: '#c9a96e',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          Explore Menu &rarr;
        </Link>
      </div>
    </div>
  )
}
