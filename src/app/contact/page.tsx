import React from 'react'
import type { Metadata } from 'next'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import JsonLd from '@/components/seo/JsonLd'
import ContactForm from '@/components/contact/ContactForm'
import { CONTACT_INFO } from '@/data/contact'

export const metadata: Metadata = {
  title: "Contact Us — Let's Plan Your Event | 11:11 Decor",
  description:
    'Connect with 11:11 Decor in Dehradun. Reserve your date for bespoke wedding decoration, corporate gala management, floral styling, and luxury event planning.',
  openGraph: {
    title: "Contact Us — Let's Plan Your Event | 11:11 Decor",
    description:
      'Connect with 11:11 Decor in Dehradun. Reserve your date for bespoke wedding decoration, corporate gala management, floral styling, and luxury event planning.',
    url: 'https://1111decor.com/contact/',
  },
  alternates: {
    canonical: 'https://1111decor.com/contact/',
  },
}

export default function ContactPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: CONTACT_INFO.brandName,
    url: 'https://1111decor.com/contact/',
    logo: 'https://1111decor.com/logo.png',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    description:
      'Luxury event planning, bespoke floral styling, stage architecture, and celebration decor services in Dehradun and across Uttarakhand.',
    telephone: '+919876543210',
    email: 'contact@1111decor.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address.street,
      addressLocality: CONTACT_INFO.address.city,
      addressRegion: CONTACT_INFO.address.state,
      postalCode: CONTACT_INFO.address.postalCode,
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '20:00',
      },
    ],
  }

  return (
    <div style={{ paddingTop: '96px', backgroundColor: '#0d0d0d', color: '#f5f0e8', minHeight: '100vh' }}>
      <JsonLd data={schemaData} />

      {/* HERO SECTION */}
      <section
        style={{
          paddingBlock: 'clamp(4rem, 8vw, 6rem) clamp(2.5rem, 5vw, 4rem)',
          textAlign: 'center',
          backgroundColor: '#121212',
          borderBottom: '1px solid rgba(201, 169, 110, 0.2)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '960px', marginInline: 'auto', paddingInline: '1.5rem' }}>
          <span
            style={{
              fontSize: '0.85rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent, #c9a96e)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            GET IN TOUCH & RESERVATIONS
          </span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
            {"Let's Plan Your Event"}
          </WindRevealHeading>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              lineHeight: 1.7,
              color: '#d0c8be',
              maxWidth: '780px',
              marginInline: 'auto',
            }}
          >
            {CONTACT_INFO.subtitle}
          </p>
        </div>
      </section>

      {/* MAIN TWO-COLUMN SECTION */}
      <section style={{ paddingBlock: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
        <div
          style={{
            maxWidth: '1280px',
            marginInline: 'auto',
            paddingInline: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 4vw, 4.5rem)',
            alignItems: 'start',
          }}
        >
          {/* LEFT COLUMN: Contact Cards & Details */}
          <div>
            <span
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-accent, #c9a96e)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Direct Contacts
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display, Cormorant Garamond, serif)',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                color: '#ffffff',
                fontWeight: 400,
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}
            >
              Connect With Our Design Studio
            </h2>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#b0a89d',
                marginBottom: '2.5rem',
              }}
            >
              We welcome in-person appointments at our studio or virtual consultations for destination weddings and regional celebrations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Card 1: Studio Address */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#161616',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.25rem',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(201, 169, 110, 0.12)',
                    border: '1px solid rgba(201, 169, 110, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent, #c9a96e)',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}
                >
                  📍
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#ffffff', fontWeight: 600 }}>
                    Our Studio & Headquarters
                  </h3>
                  <p style={{ margin: 0, color: '#b0a89d', lineHeight: 1.5, fontSize: '0.95rem' }}>
                    {CONTACT_INFO.address.formatted}
                  </p>
                </div>
              </div>

              {/* Card 2: Phone & WhatsApp */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#161616',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.25rem',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(201, 169, 110, 0.12)',
                    border: '1px solid rgba(201, 169, 110, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent, #c9a96e)',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}
                >
                  📞
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#ffffff', fontWeight: 600 }}>
                    Phone & WhatsApp Inquiries
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <a
                      href={CONTACT_INFO.phone.href}
                      style={{
                        color: 'var(--color-accent, #c9a96e)',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                      }}
                    >
                      Call: {CONTACT_INFO.phone.display}
                    </a>
                    <span style={{ color: '#555555' }}>•</span>
                    <a
                      href={CONTACT_INFO.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#60a5fa',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                      }}
                    >
                      Chat on WhatsApp ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: Email */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#161616',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.25rem',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(201, 169, 110, 0.12)',
                    border: '1px solid rgba(201, 169, 110, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent, #c9a96e)',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}
                >
                  ✉️
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#ffffff', fontWeight: 600 }}>
                    Official Email
                  </h3>
                  <a
                    href={CONTACT_INFO.email.href}
                    style={{
                      color: 'var(--color-accent, #c9a96e)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      display: 'inline-block',
                      marginTop: '0.25rem',
                    }}
                  >
                    {CONTACT_INFO.email.display}
                  </a>
                </div>
              </div>

              {/* Card 4: Operating Hours */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#161616',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.25rem',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(201, 169, 110, 0.12)',
                    border: '1px solid rgba(201, 169, 110, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent, #c9a96e)',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}
                >
                  🕒
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#ffffff', fontWeight: 600 }}>
                    Consultation Hours
                  </h3>
                  <p style={{ margin: 0, color: '#b0a89d', lineHeight: 1.5, fontSize: '0.95rem' }}>
                    {CONTACT_INFO.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* INTERACTIVE MAP CONTAINER */}
      <section
        data-testid="contact-map-container"
        style={{
          borderTop: '1px solid rgba(201, 169, 110, 0.2)',
          backgroundColor: '#111111',
          position: 'relative',
          lineHeight: 0,
        }}
      >
        <iframe
          src={CONTACT_INFO.mapEmbedUrl}
          title="11:11 Decor Location Map — Dehradun, Uttarakhand"
          width="100%"
          height="450"
          style={{
            border: 0,
            display: 'block',
            filter: 'grayscale(0.6) invert(0.9) contrast(1.2)',
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  )
}
