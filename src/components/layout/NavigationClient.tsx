'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useScrolled } from '@/hooks/useScrolled'

/* ─── Data ─────────────────────────────────────────────────────────────── */

const SERVICES_LINKS = [
  { label: 'Event Management', href: '/services/event-management/' },
  { label: 'Event Planning', href: '/services/event-planning/' },
  { label: 'Event Decoration', href: '/services/event-decoration/' },
  { label: 'Wedding Decoration', href: '/services/wedding-decoration/' },
  { label: 'Corporate Event Management', href: '/services/corporate-event-management/' },
  { label: 'Stage Decoration', href: '/services/stage-decoration/' },
  { label: 'Venue Decoration', href: '/services/venue-decoration/' },
  { label: 'Floral Decoration', href: '/services/floral-decoration/' },
  { label: 'Lighting & Production', href: '/services/lighting-production/' },
  { label: 'Entertainment & Hospitality', href: '/services/entertainment-hospitality/' },
]

const EVENTS_LINKS = [
  { label: 'Wedding Events', href: '/events/wedding-events/' },
  { label: 'Corporate Events', href: '/events/corporate-events/' },
  { label: 'Birthday Events', href: '/events/birthday-events/' },
  { label: 'Engagement Events', href: '/events/engagement-events/' },
  { label: 'Private Events', href: '/events/private-events/' },
  { label: 'Destination Events', href: '/events/destination-events/' },
]

/* ─── Dropdown Component ────────────────────────────────────────────────── */

interface DropdownItem { label: string; href: string }

interface NavDropdownProps {
  label: string
  items: DropdownItem[]
}

function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpen(true)
  }
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        aria-haspopup="true"
        aria-expanded={open}
        className="nav-item-link nav-dropdown-trigger"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {label}
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.65rem',
            transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            marginTop: '1px',
          }}
        >
          ▾
        </span>
      </button>

      {/* Dropdown Panel */}
      <div
        role="menu"
        style={{
          position: 'absolute',
          top: 'calc(100% + 18px)',
          left: '50%',
          minWidth: '260px',
          backgroundColor: 'rgba(14, 14, 14, 0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(201, 169, 110, 0.18)',
          borderTop: '2px solid #c9a96e',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
          padding: '0.5rem 0',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transform: open
            ? 'translateX(-50%) translateY(0px)'
            : 'translateX(-50%) translateY(-8px)',
          transition: 'opacity 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94), visibility 0.22s',
          zIndex: 100,
        }}
      >
        {/* Gold accent top rule (decorative) */}
        <div style={{
          height: '1px',
          margin: '0 1.25rem 0.5rem',
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35), transparent)',
        }} />

        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className="dropdown-link"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 1.25rem',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              color: '#d0c8be',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              borderLeft: '2px solid transparent',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#c9a96e',
                flexShrink: 0,
                opacity: 0.6,
              }}
            />
            {item.label}
          </Link>
        ))}

        {/* Bottom subtle gradient */}
        <div style={{
          height: '1px',
          margin: '0.5rem 1.25rem 0',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        }} />
      </div>
    </div>
  )
}

/* ─── Mobile Accordion Group ────────────────────────────────────────────── */

interface MobileGroupProps {
  label: string
  items: DropdownItem[]
  onClose: () => void
}

function MobileGroup({ label, items, onClose }: MobileGroupProps) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '1rem 0',
          background: 'none',
          border: 'none',
          color: '#ffffff',
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          cursor: 'pointer',
        }}
      >
        {label}
        <span style={{
          fontSize: '0.7rem',
          transition: 'transform 0.25s ease',
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          color: '#c9a96e',
        }}>
          ▾
        </span>
      </button>

      <div style={{
        maxHeight: open ? `${items.length * 52}px` : '0',
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 0 0.75rem 1rem',
              color: '#b0a89d',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              fontWeight: 500,
              textDecoration: 'none',
              borderLeft: '2px solid rgba(201,169,110,0.25)',
            }}
          >
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#c9a96e', flexShrink: 0 }} />
            {item.label}
          </Link>
        ))}
        <div style={{ height: '0.75rem' }} />
      </div>
    </div>
  )
}

/* ─── Main Navigation ───────────────────────────────────────────────────── */

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
        backgroundColor: scrolled ? 'rgba(13, 13, 13, 0.96)' : 'transparent',
        backgroundImage: scrolled
          ? 'none'
          : 'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0) 100%)',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : 'none',
        transition: 'background-color 0.4s ease, border-bottom 0.4s ease, backdrop-filter 0.4s ease',
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
        {/* ── Brand Logo ── */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            }}
          >
            11:11 <span style={{ color: '#c9a96e' }}>Decor</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav
          className="desktop-only"
          aria-label="Main navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
        >
          <NavDropdown label="Services" items={SERVICES_LINKS} />
          <NavDropdown label="Events" items={EVENTS_LINKS} />
          <Link href="/portfolio/" className="nav-item-link">Portfolio</Link>
          <Link href="/blog/" className="nav-item-link">Blog</Link>
          <Link href="/about-us/" className="nav-item-link">About Us</Link>
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="desktop-only" style={{ flexShrink: 0 }}>
          <Link
            href="/contact/"
            className="nav-cta-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.625rem 1.375rem',
              backgroundColor: '#c9a96e',
              color: '#111111',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              borderRadius: '4px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(201,169,110,0.38)',
              transition: 'background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease',
            }}
          >
            Plan Your Event
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-drawer"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="mobile-hamburger"
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '5px',
            padding: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span style={{
            width: '24px', height: '2px',
            backgroundColor: '#ffffff',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: mobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            display: 'block',
          }} />
          <span style={{
            width: '24px', height: '2px',
            backgroundColor: '#ffffff',
            transition: 'opacity 0.3s ease',
            opacity: mobileMenuOpen ? 0 : 1,
            display: 'block',
          }} />
          <span style={{
            width: '24px', height: '2px',
            backgroundColor: '#ffffff',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: mobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            display: 'block',
          }} />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        id="mobile-menu-drawer"
        aria-hidden={!mobileMenuOpen}
        style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: '100vw',
          height: 'calc(100vh - 80px)',
          backgroundColor: '#0e0e0e',
          borderTop: '1px solid rgba(201,169,110,0.2)',
          padding: '1.5rem 1.5rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          zIndex: 999,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Gold accent rule */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, #c9a96e, transparent)',
          marginBottom: '1.5rem',
        }} />

        <MobileGroup label="Services" items={SERVICES_LINKS} onClose={() => setMobileMenuOpen(false)} />
        <MobileGroup label="Events" items={EVENTS_LINKS} onClose={() => setMobileMenuOpen(false)} />

        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { label: 'Portfolio', href: '/portfolio/' },
            { label: 'Blog', href: '/blog/' },
            { label: 'About Us', href: '/about-us/' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '1rem 0',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact/"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            marginTop: '2rem',
            padding: '1rem 1.5rem',
            backgroundColor: '#c9a96e',
            color: '#111111',
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: '4px',
            textDecoration: 'none',
            boxShadow: '0 6px 20px rgba(201,169,110,0.35)',
          }}
        >
          Plan Your Event
        </Link>
      </div>

      {/* ── Styles ── */}
      <style jsx global>{`
        /* ─ Nav link base ─ */
        .nav-item-link,
        .nav-item-link:link,
        .nav-item-link:visited,
        .nav-item-link:active,
        .nav-dropdown-trigger {
          position: relative;
          font-family: var(--font-body) !important;
          font-size: 0.9375rem !important;
          font-weight: 600 !important;
          color: #ffffff !important;
          letter-spacing: 0.04em;
          text-shadow: 0 1px 8px rgba(0,0,0,0.7);
          text-decoration: none !important;
          padding-bottom: 4px;
          white-space: nowrap;
          transition: color 0.25s ease;
        }

        /* Gold underline sweep */
        .nav-item-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a96e, transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border-radius: 2px;
        }
        .nav-item-link:hover,
        .nav-item-link:hover:visited {
          color: #c9a96e !important;
        }
        .nav-item-link:hover::after {
          transform: scaleX(1);
        }

        /* Dropdown links hover */
        .dropdown-link:hover {
          color: #c9a96e !important;
          background-color: rgba(201, 169, 110, 0.06) !important;
          border-left-color: #c9a96e !important;
          padding-left: calc(1.25rem + 4px) !important;
        }

        /* CTA hover */
        .nav-cta-button:hover {
          background-color: #b8924e !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 8px 28px rgba(201,169,110,0.5) !important;
        }

        /* Responsive */
        @media (max-width: 900px) {
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
