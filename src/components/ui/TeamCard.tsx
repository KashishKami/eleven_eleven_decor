'use client'

import React from 'react'
import Image from 'next/image'
import { TeamMember } from '@/data/team'

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  if (!member) return null

  return (
    <div
      style={{
        position: 'relative',
        height: '440px',
        borderRadius: '18px',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
      }}
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
          background: 'linear-gradient(to top, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.2) 65%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, padding: '1.75rem' }}>
        <span
          style={{
            display: 'block',
            marginBottom: '0.35rem',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: '#c9a96e',
          }}
        >
          {member.role}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.45rem',
            marginBottom: '0.5rem',
            color: '#ffffff',
            fontWeight: 600,
          }}
        >
          {member.name}
        </h3>
        <p style={{ color: '#e0d8cc', fontSize: '0.875rem', lineHeight: 1.55 }}>
          {member.bio}
        </p>
      </div>
    </div>
  )
}
