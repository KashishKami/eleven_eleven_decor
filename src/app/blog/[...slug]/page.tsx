import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import pageVisibility from '../../../../php-admin/data/page-visibility.json'
import { DynamicBlogClient } from '@/components/blog/DynamicBlogClient'
import { BLOG_CATEGORIES } from '@/types/blog'
import { getStoredBlogPosts } from '@/lib/server-blog'
import JsonLd from '@/components/seo/JsonLd'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerators'

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
    const title = category ? `${category.name} Articles | 1111 Decor Journal` : 'Blog Category | 1111 Decor'
    const description = category?.description || 'Explore luxury event planning and decor insights from 1111 Decor.'
    return { title, description }
  }

  const posts = getStoredBlogPosts()
  const post = posts.find((p) => p.slug === articleSlug)
  const title = post ? `${post.title} | 1111 Decor` : 'Blog Article | 1111 Decor'
  const description = post?.excerpt || 'Read the latest trends, styling guides, and event insights from 1111 Decor.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post?.image ? [{ url: post.image }] : [],
    },
  }
}

export default function DynamicBlogPage({ params }: { params: { slug: string[] } }) {
  if (!pageVisibility.blog) {
    notFound()
  }

  const slugArray = params?.slug || []
  const isCategory = slugArray.length === 1
  const categorySlug = slugArray[0] || ''
  const articleSlug = slugArray.length > 1 ? slugArray[1] : slugArray[0]

  let schemaData = null
  let breadcrumbsData = null

  if (isCategory) {
    const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug)
    breadcrumbsData = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog/' },
      { name: category?.name || 'Category', url: `/blog/${categorySlug}/` },
    ])
  } else {
    const posts = getStoredBlogPosts()
    const post = posts.find((p) => p.slug === articleSlug)
    if (post) {
      schemaData = generateArticleSchema({
        title: post.title,
        description: post.excerpt,
        slug: post.slug,
        category: post.category.toLowerCase().replace(/\s+/g, '-'),
        datePublished: post.date,
        image: post.image,
        author: post.author,
      })
      breadcrumbsData = generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: post.categoryName || post.category, url: `/blog/${post.category.toLowerCase().replace(/\s+/g, '-')}/` },
        { name: post.title, url: `/blog/${post.category.toLowerCase().replace(/\s+/g, '-')}/${post.slug}/` },
      ])
    }
  }

  return (
    <>
      {schemaData && <JsonLd data={schemaData} />}
      {breadcrumbsData && <JsonLd data={breadcrumbsData} />}
      <DynamicBlogClient slugArray={slugArray} />
    </>
  )
}
