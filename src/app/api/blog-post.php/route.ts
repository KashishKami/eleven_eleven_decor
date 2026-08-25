import { NextResponse } from 'next/server'
import { getStoredBlogPosts } from '@/lib/server-blog'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')?.trim()?.toLowerCase()

    if (!slug) {
      return NextResponse.json({ error: 'Slug required' }, { status: 400 })
    }

    const posts = getStoredBlogPosts()
    const post = posts.find((p) => p.slug.toLowerCase() === slug)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to load post' }, { status: 500 })
  }
}
