import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
    return { title: 'Project Not Found' }
  }
  const project = getPortfolioProjectBySlugServer(params.slug)
  if (!project) {
    return { title: 'Project Not Found' }
  }

  const cleanTitle = (project.metaTitle || project.title).replace(/\s*\|\s*11:?11\s*Decor.*$/i, '').trim()
  const fullTitle = project.metaTitle || `${project.title} | 11:11 Decor`

  return {
    title: cleanTitle,
    description: project.metaDescription,
    openGraph: {
      title: fullTitle,
      description: project.metaDescription,
      url: `https://1111decor.com/portfolio/${project.slug}/`,
      images: project.heroImage ? [{ url: project.heroImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: project.metaDescription,
      images: project.heroImage ? [project.heroImage] : ['/hero-banner.jpg'],
    },
    alternates: {
      canonical: `https://1111decor.com/portfolio/${project.slug}/`,
    },
  }
}

export default function PortfolioDetailPage({ params }: Props) {
  if (params.slug === '__empty__') {
    notFound()
  }

  const project = getPortfolioProjectBySlugServer(params.slug)

  return <DynamicPortfolioClient slug={params.slug} initialProject={project || null} />
}
