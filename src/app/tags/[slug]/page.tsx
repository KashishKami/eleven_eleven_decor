import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GLOBAL_TAGS } from '@/types/tags'
import { DynamicTagClient } from '@/components/tags/DynamicTagClient'

interface Props {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return GLOBAL_TAGS.map((tag) => ({
    slug: tag.slug,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  const tag = GLOBAL_TAGS.find((t) => t.slug === params.slug)
  if (!tag) {
    return { title: 'Topic Tag Not Found' }
  }

  const title = `${tag.name} Ideas & Inspiration`
  const fullTitle = `${title} | 11:11 Decor`
  const description = `${tag.name} — ${tag.description} Discover luxury wedding decor, floral installations, venues, and party inspiration with 11:11 Decor.`

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: `https://1111decor.com/tags/${tag.slug}/`,
      siteName: '11:11 Decor',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: `https://1111decor.com/tags/${tag.slug}/`,
    },
  }
}

export default function TagArchivePage({ params }: Props) {
  const tag = GLOBAL_TAGS.find((t) => t.slug === params.slug)

  if (!tag) {
    notFound()
  }

  return <DynamicTagClient tag={tag} />
}
