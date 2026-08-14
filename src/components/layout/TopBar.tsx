import React from 'react'
import Link from 'next/link'

export function TopBar() {
  return (
    <div
      id="top-bar"
      style={{
        backgroundColor: '#141414',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#a0a0a0',
        fontSize: '0.8125rem',
        paddingBlock: '0.5rem',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>📍 1111 Decor Avenue, Luxury District</span>
          <span>📞 +1 (555) 111-1111</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--color-accent)' }}>1111 Decor & Event Styling</span>
          <Link
            href="/contact"
            className="label"
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-accent)',
              textDecoration: 'underline',
            }}
          >
            Get a Quote →
          </Link>
        </div>
      </div>
    </div>
  )
}
