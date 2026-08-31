import React from 'react'
import Link from 'next/link'
import pageVisibility from '../../../php-admin/data/page-visibility.json'

export function Footer() {
  const currentYear = new Date().getFullYear()

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
          {/* Column 1: Brand */}
          <div style={{ gridColumn: 'span 1' }}>
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
                href="tel:+919876543210"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.825rem',
                  color: '#c9a96e',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.2s ease',
                }}
              >
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@1111decor.com"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.825rem',
                  color: '#7a7168',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                hello@1111decor.com
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

          {/* Column 3: Events */}
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
                { label: 'About Us', href: '/about-us/' },
                ...(pageVisibility.portfolio ? [{ label: 'Portfolio', href: '/portfolio/' }] : []),
                ...(pageVisibility.gallery ? [{ label: 'Gallery', href: '/gallery/' }] : []),
                { label: 'Packages', href: '/packages/' },
                ...(pageVisibility.venues ? [{ label: 'Venues', href: '/venues/' }] : []),
                ...(pageVisibility.blog ? [{ label: 'Blog', href: '/blog/' }] : []),
                { label: 'Contact Us', href: '/contact/' },
              ].map((link) => (
                <li key={link.href}>
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

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            {['Instagram', 'Facebook', 'Pinterest'].map((platform) => (
              <span
                key={platform}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#555050',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
