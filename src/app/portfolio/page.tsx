import React from 'react'
import type { Metadata } from 'next'
import { getAllPortfolioProjectsServer } from '@/lib/server-portfolio'
import { PortfolioClient } from '@/components/portfolio/PortfolioClient'
import JsonLd from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | 11:11 Decor',
  description:
    'Explore our portfolio of royal weddings, luxury corporate events, and bespoke celebrations curated by 11:11 Decor.',
  openGraph: {
    title: 'Portfolio & Case Studies | 11:11 Decor',
    description:
      'Explore our portfolio of royal weddings, luxury corporate events, and bespoke celebrations curated by 11:11 Decor.',
    url: 'https://1111decor.com/portfolio/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://1111decor.com/portfolio/',
  },
}

export default function PortfolioHubPage() {
  const initialProjects = getAllPortfolioProjectsServer()

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '11:11 Decor Portfolio Showcase',
    itemListElement: initialProjects.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.title,
      url: `https://1111decor.com/portfolio/${p.slug}/`,
    })),
  }

  return (
    <>
      <JsonLd data={schemaData} />
      <PortfolioClient initialProjects={initialProjects} />
    </>
  )
}
