'use client'

import React from 'react'
import Link from 'next/link'
import { CONTACT_INFO } from '@/data/contact'
import { usePageVisibility } from '@/hooks/usePageVisibility'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const visibility = usePageVisibility()

  return (
    <footer
      style={{
        backgroundColor: '#0d0d0d',
        color: 'var(--color-secondary)',
        borderTop: '1px solid rgba(201, 169, 110, 0.12)',
        paddingBlock: '5rem 2.5rem',
      }}
    >
      <div className="container">
        {/* Top 4-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Column 1: Brand & Contact */}
          <div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                11:11 <span style={{ color: '#c9a96e' }}>Decor</span>
              </span>
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#7a7168',
                lineHeight: 1.75,
                maxWidth: '280px',
                marginBottom: '1.75rem',
              }}
            >
              An event management and décor studio. We plan and design weddings, celebrations, and corporate events from first concept to final detail.
            </p>

            {/* Contact snippet */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href={CONTACT_INFO.phone.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.825rem',
                  color: '#c9a96e',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.2s ease',
                }}
              >
                {CONTACT_INFO.phone.display}
              </a>
              <a
                href={CONTACT_INFO.email.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.825rem',
                  color: '#7a7168',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {CONTACT_INFO.email.display}
              </a>
            </div>

            {/* Check our work on Instagram */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  color: '#9e9589',
                  marginBottom: '0.4rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Check our work on
              </span>
              <a
                href={CONTACT_INFO.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile: @_11.11decor_"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#c9a96e',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="18"
                  height="18"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a96e',
                marginBottom: '1.5rem',
              }}
            >
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', padding: 0, margin: 0 }}>
              {[
                { label: 'Event Planning', href: '/services/event-planning/' },
                { label: 'Event Decoration', href: '/services/event-decoration/' },
                { label: 'Wedding Decoration', href: '/services/wedding-decoration/' },
                { label: 'Corporate Event Management', href: '/services/corporate-event-management/' },
                { label: 'Stage Decoration', href: '/services/stage-decoration/' },
                { label: 'Birthday Decoration', href: '/services/birthday-decoration/' },
                { label: 'Floral Decoration', href: '/services/floral-decoration/' },
                { label: 'All Services →', href: '/services/' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Event Types */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a96e',
                marginBottom: '1.5rem',
              }}
            >
              Event Types
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', padding: 0, margin: 0 }}>
              {[
                { label: 'Wedding Events', href: '/events/wedding-events/' },
                { label: 'Corporate Events', href: '/events/corporate-events/' },
                { label: 'Birthday Events', href: '/events/birthday-events/' },
                { label: 'Engagement Events', href: '/events/engagement-events/' },
                { label: 'Private Events', href: '/events/private-events/' },
                { label: 'Destination Events', href: '/events/destination-events/' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c9a96e',
                marginBottom: '1.5rem',
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', padding: 0, margin: 0 }}>
              {[
                { label: 'About Us', href: '/about-us/', className: '' },
                ...(visibility.portfolio ? [{ label: 'Portfolio', href: '/portfolio/', className: 'gated-footer-portfolio' }] : []),
                ...(visibility.gallery ? [{ label: 'Gallery', href: '/gallery/', className: 'gated-footer-gallery' }] : []),
                { label: 'Packages', href: '/packages/', className: '' },
                ...(visibility.venues ? [{ label: 'Venues', href: '/venues/', className: 'gated-footer-venues' }] : []),
                ...(visibility.blog ? [{ label: 'Blog', href: '/blog/', className: 'gated-footer-blog' }] : []),
                { label: 'Contact Us', href: '/contact/', className: '' },
              ].map((link) => (
                <li key={link.href} className={link.className}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gold divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
            marginBottom: '2rem',
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: '#4a4744',
              margin: 0,
            }}
          >
            © {currentYear} 11:11 Decor (Eleven Eleven Decor). All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#7a7168' }}>
              Check our work on
            </span>
            <a
              href={CONTACT_INFO.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @_11.11decor_"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#c9a96e',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                transition: 'opacity 0.2s ease',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
