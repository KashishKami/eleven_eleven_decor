import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllVenuesServer, getVenueBySlugServer } from '@/lib/server-venues'
import { DynamicVenueClient } from '@/components/venues/DynamicVenueClient'

interface Props {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  const venues = getAllVenuesServer()
  if (venues.length === 0) {
    return [{ slug: '__empty__' }]
  }
  return venues.map((venue) => ({
    slug: venue.slug,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  if (params.slug === '__empty__') {
    return { title: 'Venue Not Found' }
  }
  const venue = getVenueBySlugServer(params.slug)
  if (!venue) {
    return { title: 'Venue Not Found' }
  }

  const cleanTitle = (venue.metaTitle || venue.name).replace(/\s*\|\s*11:?11\s*Decor.*$/i, '').trim()
  const fullTitle = venue.metaTitle || `${venue.name} | 11:11 Decor`

  return {
    title: cleanTitle,
    description: venue.metaDescription,
    openGraph: {
      title: fullTitle,
      description: venue.metaDescription,
      url: `https://1111decor.com/venues/${venue.slug}/`,
      images: venue.heroImage ? [{ url: venue.heroImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: venue.metaDescription,
      images: venue.heroImage ? [venue.heroImage] : ['/hero-banner.jpg'],
    },
    alternates: {
      canonical: `https://1111decor.com/venues/${venue.slug}/`,
    },
  }
}

export default function VenueDetailPage({ params }: Props) {
  if (params.slug === '__empty__') {
    notFound()
  }

  const venue = getVenueBySlugServer(params.slug)

  return <DynamicVenueClient slug={params.slug} initialVenue={venue || null} />
}
