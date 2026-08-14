'use client'

import React from 'react'
import { PROCESS_DATA } from '@/data/process'

export function WorkProcess() {
  return (
    <section id="work-process" className="section-padding" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>
            Our Work Process
          </span>
          <h2 className="heading-lg">How We Bring Your Vision To Life</h2>
        </div>

        <div className="grid-responsive-4" style={{ position: 'relative' }}>
          {PROCESS_DATA.map((step) => (
            <div
              key={step.number}
              style={{
                position: 'relative',
                backgroundColor: '#202020',
                padding: '2rem 1.5rem',
                borderRadius: '4px',
                border: '1px solid rgba(201, 169, 110, 0.15)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                }}
              >
                <span
                  style={{
                    fontSize: '2.5rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                  }}
                >
                  {step.number}
                </span>
                <span style={{ fontSize: '1.75rem' }}>{step.icon}</span>
              </div>
              <h3 className="heading-sm" style={{ marginBottom: '0.75rem', color: 'var(--color-secondary)' }}>
                {step.title}
              </h3>
              <p className="body-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
