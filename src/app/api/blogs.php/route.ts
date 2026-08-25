import { NextResponse } from 'next/server'
import { getStoredBlogPosts } from '@/lib/server-blog'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')?.trim()?.toLowerCase()

    let posts = getStoredBlogPosts()
    if (category) {
      posts = posts.filter(
        (p) =>
          p.category.toLowerCase().replace(/\s+/g, '-') === category ||
          p.category.toLowerCase() === category
      )
    }

    return NextResponse.json(posts, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 })
  }
}
