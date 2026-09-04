import fs from 'fs'
import path from 'path'
import type { BlogPost } from '@/types/blog'
import { BLOG_DATA } from '@/data/blog'

import { getServerDataDir } from './server-data-dir'

interface RawPhpPost {
  id: string | number
  slug: string
  title: string
  excerpt?: string
  content?: string
  category: string
  category_name?: string
  created_at?: string
  author?: string
  image?: string
  read_time?: string
  published?: boolean | number
  faqs?: Array<{ question: string; answer: string }>
  related_service_slug?: string
  related_service_name?: string
}

/**
 * Server-only helper to read all stored blog posts from the PHP data store
 * or fallback to static seed data.
 */
export function getStoredBlogPosts(): BlogPost[] {
  try {
    const jsonPath = path.join(getServerDataDir(), 'posts.json')
    if (fs.existsSync(jsonPath)) {
      const data = fs.readFileSync(jsonPath, 'utf-8')
      const posts = JSON.parse(data)
      if (Array.isArray(posts) && posts.length > 0) {
        return posts.map((p: RawPhpPost) => ({
          id: String(p.id),
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt || '',
          content: p.content || '',
          category: p.category,
          categoryName: p.category_name || p.category,
          date: p.created_at
            ? new Date(p.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Recent',
          author: p.author || '1111 Decor Studio',
          image: p.image || 'https://images.unsplash.com/photo-1519741497674-611481863552',
          readTime: p.read_time || '5 min read',
          published: Boolean(p.published),
          faqs: p.faqs || [],
          relatedServiceSlug: p.related_service_slug || '',
          relatedServiceName: p.related_service_name || '',
        }))
      }
    }
  } catch {
    // Fallback
  }
  return BLOG_DATA
}
