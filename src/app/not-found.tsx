import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        paddingTop: '120px',
      }}
    >
      <span className="label" style={{ marginBottom: '1rem' }}>
        404 — Page Not Found
      </span>
      <h1 className="heading-xl" style={{ marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
        This Event Page Does Not Exist
      </h1>
      <p className="body-lg" style={{ maxWidth: '540px', marginBottom: '2.5rem' }}>
        The page you are looking for may have been moved or is currently being crafted. Return to our primary showcase to explore 1111 Decor experiences.
      </p>
      <Link
        href="/"
        style={{
          padding: '1rem 2.25rem',
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderRadius: '4px',
        }}
      >
        Return To Home
      </Link>
    </div>
  )
}
