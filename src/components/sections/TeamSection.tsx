'use client'

import React from 'react'
import { TEAM_DATA } from '@/data/team'
import { TeamCard } from '@/components/ui/TeamCard'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'

export function TeamSection() {
  return (
    <section
      id="team"
      style={{
        backgroundColor: '#ede5d8',
        padding: '7rem 1.5rem',
        color: '#1a1a1a',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span
            style={{
              color: '#c9a96e',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              fontWeight: 600,
              display: 'block',
            }}
          >
            MEET INCREDIBLE PEOPLE
          </span>
          <div style={{ maxWidth: '800px', margin: '0 auto 1.25rem' }}>
            <WindRevealHeading
              as="h2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                color: '#1a1a1a',
                letterSpacing: '0.04em',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              The Creative Minds Behind 1111 Decor
            </WindRevealHeading>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}
        >
          {TEAM_DATA.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
