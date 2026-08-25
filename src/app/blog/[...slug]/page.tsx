import React from 'react'
import type { Metadata } from 'next'
import { DynamicBlogClient } from '@/components/blog/DynamicBlogClient'
import { BLOG_CATEGORIES } from '@/types/blog'
import { getStoredBlogPosts } from '@/lib/server-blog'

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
  const slugArray = params?.slug || []
  return <DynamicBlogClient slugArray={slugArray} />
}
