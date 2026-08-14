'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useScrolled } from '@/hooks/useScrolled'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Menu', href: '/menu' },
  { label: 'Events', href: '/event' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export function NavigationClient() {
  const scrolled = useScrolled(80)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      data-scrolled={scrolled ? 'true' : 'false'}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        backgroundColor: scrolled ? 'rgba(26, 26, 26, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201, 169, 110, 0.2)' : 'none',
        transition: 'background-color 0.4s ease, border-bottom 0.4s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
        }}
      >
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            className="heading-md"
            style={{
              color: '#ffffff',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            1111 <span style={{ color: 'var(--color-accent)' }}>Decor</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: '#f5f0e8',
                letterSpacing: '0.05em',
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.8)',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="desktop-only">
          <Link
            href="/contact"
            style={{
              padding: '0.625rem 1.5rem',
              backgroundColor: '#c9a96e',
              color: '#111111',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 700,
              borderRadius: '4px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(201, 169, 110, 0.45)',
              transition: 'background-color 0.3s ease',
            }}
          >
            Reserve Event
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="mobile-hamburger"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '6px',
            padding: '8px',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'var(--color-secondary)',
              transition: 'transform 0.3s ease',
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'var(--color-secondary)',
              transition: 'opacity 0.3s ease',
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'var(--color-secondary)',
              transition: 'transform 0.3s ease',
            }}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            width: '100vw',
            height: 'calc(100vh - 80px)',
            backgroundColor: '#1a1a1a',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            zIndex: 999,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="heading-md"
              style={{ color: 'var(--color-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              marginTop: '1rem',
              padding: '0.875rem 1.5rem',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-primary)',
              textAlign: 'center',
              fontWeight: 600,
              borderRadius: '4px',
            }}
          >
            Reserve Event
          </Link>
        </div>
      )}

      {/* Responsive Header CSS */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  )
}
