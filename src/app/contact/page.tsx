import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Reservations | 1111 Decor',
  description: 'Reserve your date with 1111 Decor for bespoke event styling, floral design, and luxury catering.',
}

export default function ContactPage() {
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
        <span className="label">Get In Touch</span>
        <h1 className="heading-xl" style={{ marginTop: '0.5rem', color: 'var(--color-secondary)' }}>
          Reserve Your Celebration
        </h1>
      </div>
      <div className="section-padding container" style={{ maxWidth: '800px' }}>
        <form
          style={{
            backgroundColor: '#1a1a1a',
            padding: '2.5rem',
            borderRadius: '8px',
            border: '1px solid rgba(201, 169, 110, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Victoria Sterling"
              style={{
                width: '100%',
                padding: '0.875rem 1.25rem',
                backgroundColor: '#242424',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                color: 'var(--color-secondary)',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="victoria@example.com"
              style={{
                width: '100%',
                padding: '0.875rem 1.25rem',
                backgroundColor: '#242424',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                color: 'var(--color-secondary)',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Event Type & Date
            </label>
            <input
              type="text"
              placeholder="e.g. Wedding Gala - December 2026"
              style={{
                width: '100%',
                padding: '0.875rem 1.25rem',
                backgroundColor: '#242424',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                color: 'var(--color-secondary)',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Tell Us About Your Vision
            </label>
            <textarea
              rows={5}
              placeholder="Share details about guest count, venue preferences, and desired aesthetic..."
              style={{
                width: '100%',
                padding: '0.875rem 1.25rem',
                backgroundColor: '#242424',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                color: 'var(--color-secondary)',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '1.125rem',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '4px',
            }}
          >
            Submit Reservation Inquiry
          </button>
        </form>
      </div>
    </div>
  )
}
