'use client'

import React from 'react'
import Image from 'next/image'

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container">
        <div className="grid-responsive-2" style={{ alignItems: 'center' }}>
          {/* Left Column: Features */}
          <div>
            <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>
              Why Choose Us
            </span>
            <h2 className="heading-lg" style={{ marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
              Unforgettable Catering & Event Mastery
            </h2>
            <p className="body-lg" style={{ marginBottom: '2.5rem' }}>
              We set the gold standard in event execution. Our surgical attention to detail ensures that every centerpiece, napkin fold, and culinary course is executed flawlessly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Feature 1 */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(201, 169, 110, 0.15)',
                    border: '1px solid var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  ⚜️
                </div>
                <div>
                  <h3 className="heading-sm" style={{ marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                    Bespoke Spatial Design
                  </h3>
                  <p className="body-md">
                    Custom 3D layout renders and architectural floral installations tailored specifically to your venue footprint.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(201, 169, 110, 0.15)',
                    border: '1px solid var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  🥂
                </div>
                <div>
                  <h3 className="heading-sm" style={{ marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                    Michelin-Standard Gastronomy
                  </h3>
                  <p className="body-md">
                    Multi-sensory tasting menus and sommelier wine pairings crafted by our award-winning culinary directors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Height Image with Callout */}
          <div style={{ position: 'relative', height: '520px' }}>
            <div className="card-base" style={{ height: '100%', border: '1px solid rgba(201, 169, 110, 0.2)' }}>
              <Image
                src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop"
                alt="Unforgettable Catering & Premium Dining by 1111 Decor"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                backgroundColor: 'rgba(26, 26, 26, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--color-accent)',
                padding: '1.25rem 1.75rem',
                borderRadius: '4px',
              }}
            >
              <span className="label" style={{ display: 'block', color: 'var(--color-accent)' }}>
                Premium dining
              </span>
              <span className="heading-sm" style={{ color: 'var(--color-secondary)' }}>
                Abundant flavors
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
