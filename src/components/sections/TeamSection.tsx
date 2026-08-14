'use client'

import React from 'react'
import { TEAM_DATA } from '@/data/team'
import { TeamCard } from '@/components/ui/TeamCard'

export function TeamSection() {
  return (
    <section id="team" className="section-padding" style={{ backgroundColor: '#141414' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>
            Meet Incredible People
          </span>
          <h2 className="heading-lg">The Creative Minds Behind 1111 Decor</h2>
        </div>

        <div className="grid-responsive-4">
          {TEAM_DATA.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
