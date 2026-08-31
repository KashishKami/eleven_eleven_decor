import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import pageVisibility from '../../../../php-admin/data/page-visibility.json'
import { getAllPortfolioProjectsServer, getPortfolioProjectBySlugServer } from '@/lib/server-portfolio'
import { DynamicPortfolioClient } from '@/components/portfolio/DynamicPortfolioClient'

interface Props {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  const projects = getAllPortfolioProjectsServer()
  if (projects.length === 0) {
    return [{ slug: '__empty__' }]
  }
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  if (params.slug === '__empty__') {
    return { title: 'Project Not Found | 1111 Decor' }
  }
  const project = getPortfolioProjectBySlugServer(params.slug)
  if (!project || !pageVisibility.portfolio) {
    return { title: 'Project Not Found | 1111 Decor' }
  }

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: `https://elevenelevendecor.com/portfolio/${project.slug}/`,
      images: [{ url: project.heroImage }],
    },
    alternates: {
      canonical: `https://elevenelevendecor.com/portfolio/${project.slug}/`,
    },
  }
}

export default function PortfolioDetailPage({ params }: Props) {
  if (params.slug === '__empty__' || !pageVisibility.portfolio) {
    notFound()
  }

  const project = getPortfolioProjectBySlugServer(params.slug)

  return <DynamicPortfolioClient slug={params.slug} initialProject={project || null} />
}
