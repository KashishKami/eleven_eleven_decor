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
    return { title: 'Venue Not Found | 1111 Decor' }
  }
  const venue = getVenueBySlugServer(params.slug)
  if (!venue) {
    return { title: 'Venue Not Found | 1111 Decor' }
  }

  return {
    title: venue.metaTitle,
    description: venue.metaDescription,
    openGraph: {
      title: venue.metaTitle,
      description: venue.metaDescription,
      url: `https://1111decor.com/venues/${venue.slug}/`,
      images: [{ url: venue.heroImage }],
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
