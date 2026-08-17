'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { GALLERY_ITEMS, GalleryItem } from '@/data/gallery'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { Lightbox } from '@/components/ui/Lightbox'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import styles from './gallery.module.css'

const CATEGORY_TABS = [
  'All',
  'Weddings',
  'Corporate Events',
  'Birthdays',
  'Engagements',
  'Décor',
  'Stage Designs',
  'Venue Designs',
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null)

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: "11:11 Decor Moments We've Helped Create",
    description: 'Visual showcase of luxury event planning, royal wedding mandaps, and bespoke floral staging by 11:11 Decor.',
    url: 'https://1111decor.com/gallery/',
  }

  return (
    <div className={styles.galleryContainer}>
      <JsonLd data={schemaData} />

      {/* SECTION 1: Dark Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.22em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.25rem' }}>
            VISUAL PORTFOLIO
          </span>
          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff' }}>
            Moments We&apos;ve Helped Create
          </WindRevealHeading>
          <p className={styles.heroSubtitle}>
            A curated visual archive capturing the elegance, floral craftsmanship, and surgical precision behind our events.
          </p>
        </div>
      </section>

      {/* SECTION 2: Light Theme Filter Tabs & Image Grid */}
      <section className={styles.gridSectionLight}>
        <div className={styles.container}>
          {/* Category Filter Tabs */}
          <div className={styles.filtersRow}>
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`${styles.filterTab} ${selectedCategory === tab ? styles.filterTabActive : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className={styles.galleryGrid}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                data-testid="gallery-item"
                onClick={() => setActiveLightboxItem(item)}
                className={styles.galleryItemCard}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.galleryImage}
                />
                <div className={styles.overlay}>
                  <span className={styles.itemCategory}>{item.category}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Popup Modal */}
      <Lightbox
        item={activeLightboxItem}
        items={filteredItems}
        onClose={() => setActiveLightboxItem(null)}
        onNavigate={(newItem) => setActiveLightboxItem(newItem)}
      />

      <FooterCTA />
    </div>
  )
}
