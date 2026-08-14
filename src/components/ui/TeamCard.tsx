'use client'

import React from 'react'
import Image from 'next/image'
import { TeamMember } from '@/data/team'

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div
      className="card-base card-team"
      style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
    >
      <Image
        src={member.image}
        alt={`Portrait of ${member.name}, ${member.role} at 1111 Decor`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{ objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,15,15,0.95) 0%, rgba(15,15,15,0.2) 60%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <span className="label" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
          {member.role}
        </span>
        <h3 className="heading-sm" style={{ marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
          {member.name}
        </h3>
        <p className="body-sm" style={{ color: '#b0a898' }}>
          {member.bio}
        </p>
      </div>
    </div>
  )
}
