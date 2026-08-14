import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#111111',
        color: 'var(--color-secondary)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBlock: '4rem 2rem',
      }}
    >
      <div className="container">
        <div className="grid-responsive-3" style={{ marginBottom: '3rem' }}>
          {/* Column 1: Brand Info */}
          <div>
            <span className="heading-md" style={{ display: 'block', marginBottom: '1rem' }}>
              1111 <span style={{ color: 'var(--color-accent)' }}>Decor</span>
            </span>
            <p className="body-sm" style={{ maxWidth: '320px', marginBottom: '1.5rem' }}>
              Crafting extraordinary luxury event decor, bespoke dining experiences, and unforgettable celebrations with unyielding perfectionism.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ color: 'var(--color-accent)' }}>✦ Instagram</span>
              <span style={{ color: 'var(--color-accent)' }}>✦ Pinterest</span>
              <span style={{ color: 'var(--color-accent)' }}>✦ LinkedIn</span>
            </div>
          </div>

          {/* Column 2: Discover Links */}
          <div>
            <h4 className="label" style={{ marginBottom: '1.25rem', color: 'var(--color-accent)' }}>
              Discover
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link href="/about-us" className="body-sm">
                  About 1111 Decor
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="body-sm">
                  Our Creative Team
                </Link>
              </li>
              <li>
                <Link href="/menu" className="body-sm">
                  Catering & Dining Menus
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="body-sm">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="body-sm">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Event Services */}
          <div>
            <h4 className="label" style={{ marginBottom: '1.25rem', color: 'var(--color-accent)' }}>
              Event Experiences
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link href="/event" className="body-sm">
                  Corporate Galas & Summits
                </Link>
              </li>
              <li>
                <Link href="/event" className="body-sm">
                  Weddings & Receptions
                </Link>
              </li>
              <li>
                <Link href="/event" className="body-sm">
                  Private Social Dinners
                </Link>
              </li>
              <li>
                <Link href="/venue" className="body-sm">
                  Exclusive Venues Archive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="body-sm">
                  Reserve Your Date
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p className="body-sm">
            © {new Date().getFullYear()} 1111 Decor (Eleven Eleven Decor). All rights reserved. Replica of Anika Event Theme.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/faqs" className="body-sm">
              Privacy Policy
            </Link>
            <Link href="/faqs" className="body-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
