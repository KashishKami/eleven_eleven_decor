import React from 'react'
import type { Metadata } from 'next'
import { DynamicBlogClient } from '@/components/blog/DynamicBlogClient'
import { BLOG_CATEGORIES } from '@/types/blog'
import { getStoredBlogPosts } from '@/lib/server-blog'
import JsonLd from '@/components/seo/JsonLd'
import { generateArticleSchemaGraph, generateBreadcrumbSchema } from '@/lib/schemaGenerators'
import { extractFaqsFromHtml } from '@/lib/faqExtractor'

export const dynamicParams = true

export async function generateStaticParams() {
  const posts = getStoredBlogPosts()

  // 1-segment routes: /blog/[category]/
  const categoryParams = BLOG_CATEGORIES.map((cat) => ({
    slug: [cat.slug],
  }))

  // 2-segment routes: /blog/[category]/[slug]/
  const postParams = posts.map((post) => ({
    slug: [post.category.toLowerCase().replace(/\s+/g, '-'), post.slug],
  }))

  return [...categoryParams, ...postParams]
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slugArray = params?.slug || []
  const isCategory = slugArray.length === 1
  const categorySlug = slugArray[0] || ''
  const articleSlug = slugArray.length > 1 ? slugArray[1] : slugArray[0]

  if (isCategory) {
    const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug)
    const pageTitle = category ? `${category.name} Articles` : 'Blog Category'
    const fullTitle = category ? `${category.name} Articles | 11:11 Decor` : 'Blog Category | 11:11 Decor'
    const description = category?.description || 'Explore luxury event planning and decor insights from 11:11 Decor.'
    const url = `https://1111decor.com/blog/${categorySlug}/`
    return {
      title: pageTitle,
      description,
      openGraph: {
        title: fullTitle,
        description,
        url,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description,
        images: ['/hero-banner.jpg'],
      },
      alternates: {
        canonical: url,
      },
    }
  }

  const posts = getStoredBlogPosts()
  const post = posts.find((p) => p.slug === articleSlug)
  const pageTitle = post ? (post.metaTitle || post.title) : 'Blog Article'
  const fullTitle = post ? (post.metaTitle ? post.metaTitle : `${post.title} | 11:11 Decor`) : 'Blog Article | 11:11 Decor'
  const description = post?.metaDescription || post?.excerpt || 'Read the latest trends, styling guides, and event insights from 11:11 Decor.'
  const categorySegment = post ? post.category.toLowerCase().replace(/\s+/g, '-') : categorySlug || 'events'
  const url = `https://1111decor.com/blog/${categorySegment}/${articleSlug}/`
  const image = post?.image || '/hero-banner.jpg'

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: 'article',
      images: post?.image ? [{ url: post.image, width: 1200, height: 630, alt: pageTitle }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default function DynamicBlogPage({ params }: { params: { slug: string[] } }) {
  const slugArray = params?.slug || []
  const isCategory = slugArray.length === 1
  const categorySlug = slugArray[0] || ''
  const articleSlug = slugArray.length > 1 ? slugArray[1] : slugArray[0]

  let schemaGraph = null
  let categoryBreadcrumbs = null

  if (isCategory) {
    const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug)
    categoryBreadcrumbs = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog/' },
      { name: category?.name || 'Category', url: `/blog/${categorySlug}/` },
    ])
  } else {
    const posts = getStoredBlogPosts()
    const post = posts.find((p) => p.slug === articleSlug)
    if (post) {
      const faqs = (post.faqs && post.faqs.length > 0) ? post.faqs : extractFaqsFromHtml(post.content)
      schemaGraph = generateArticleSchemaGraph({
        title: post.title,
        description: post.excerpt,
        slug: post.slug,
        category: post.category.toLowerCase().replace(/\s+/g, '-'),
        categoryName: post.categoryName || post.category,
        datePublished: post.date,
        image: post.image,
        author: post.author,
        faqs,
      })
    }
  }

  return (
    <>
      {schemaGraph && <JsonLd data={schemaGraph} />}
      {categoryBreadcrumbs && <JsonLd data={categoryBreadcrumbs} />}
      <DynamicBlogClient slugArray={slugArray} />
    </>
  )
}
