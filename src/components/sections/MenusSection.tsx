'use client'

import React from 'react'
import { MENUS_DATA } from '@/data/menus'
import { MenuCard } from '@/components/ui/MenuCard'

export function MenusSection() {
  return (
    <section id="popular-menus" className="section-padding" style={{ backgroundColor: '#141414' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>
            Catering Menus
          </span>
          <h2 className="heading-lg">Most Popular Gastronomy Offerings</h2>
        </div>

        <div className="grid-responsive-4">
          {MENUS_DATA.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
