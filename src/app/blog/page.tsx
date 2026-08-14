import React from 'react'
import type { Metadata } from 'next'
import { BlogSection } from '@/components/sections/BlogSection'
import { FooterCTA } from '@/components/sections/FooterCTA'

export const metadata: Metadata = {
  title: 'Blog & Event Journal | 1111 Decor',
  description: 'Read the latest trends, styling guides, and luxury event insights from 1111 Decor.',
}

export default function BlogPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <BlogSection />
      <FooterCTA />
    </div>
  )
}
