'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import { useBlogPost } from '@/hooks/useBlogPost'
import { BlogCard } from '@/components/ui/BlogCard'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { FooterCTA } from '@/components/sections/FooterCTA'
import { BLOG_CATEGORIES } from '@/types/blog'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

function resolveImageUrl(src?: string): string {
  if (!src) return 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop'
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  if (src.startsWith('/')) {
    const base = API_BASE || (typeof window !== 'undefined' && window.location.port === '3000' ? 'http://localhost:8080' : '')
    return base ? `${base}${src}` : src
  }
  return src
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function transformArticleContent(html?: string): string {
  if (!html) return ''
  const base = API_BASE || (typeof window !== 'undefined' && window.location.port === '3000' ? 'http://localhost:8080' : '')
  
  let processed = html
  if (base) {
    processed = processed.replace(/src=["'](\/(?:manage-[^"']*|uploads\/[^"']*))["']/gi, (match, path) => {
      return `src="${base}${path}"`
    })
  }

  // Ensure headings have id attributes for anchor jumping
  processed = processed.replace(/<h([1-6])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    if (attrs.includes('id=')) {
      return match
    }
    const plainText = text.replace(/<[^>]+>/g, '').trim()
    const slug = slugifyHeading(plainText)
    return `<h${level} id="${slug}"${attrs}>${text}</h${level}>`
  })

  return processed
}

export function DynamicBlogClient({ slugArray }: { slugArray: string[] }) {
  const isCategoryView = slugArray.length === 1
  const categorySlug = slugArray[0] || ''
  const articleSlug = slugArray.length > 1 ? slugArray[1] : slugArray[0]

  if (isCategoryView) {
    return <BlogCategoryView categorySlug={categorySlug} />
  }

  return <BlogArticleView articleSlug={articleSlug || ''} />
}

function BlogCategoryView({ categorySlug }: { categorySlug: string }) {
  const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug) || {
    slug: categorySlug,
    name: categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: 'Explore insightful articles and decor advice.',
  }

  const { posts, loading } = useBlogPosts(categorySlug)

  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ede5d8', minHeight: '100vh' }}>
      <section
        style={{
          padding: '6rem 1.5rem 3.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p
            style={{
              color: '#c9a96e',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 600,
            }}
          >
            CATEGORY ARCHIVE
          </p>

          <div style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            <WindRevealHeading
              as="h1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                color: '#1a1a1a',
                letterSpacing: '0.03em',
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              {category.name}
            </WindRevealHeading>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: '#5a544c',
              fontSize: '1.1rem',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            {category.description}
          </p>

          {/* Category Filter Pills */}
          <nav
            aria-label="Blog categories"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '2.75rem',
            }}
          >
            <Link
              href="/blog"
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '30px',
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
              }}
            >
              All Articles
            </Link>

            {BLOG_CATEGORIES.map((cat) => {
              const isSelected = categorySlug === cat.slug
              return (
                <Link
                  key={cat.slug}
                  href={`/blog/${cat.slug}`}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '30px',
                    border: isSelected ? '1px solid #c9a96e' : '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: isSelected ? '#c9a96e' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#1a1a1a',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </section>

      {/* Filtered Posts Grid */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4.5rem 1.5rem 6rem',
        }}
      >
        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  height: '420px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ fontSize: '1.25rem', color: '#6b6b6b', fontFamily: 'var(--font-body)' }}>
              No articles published in this category yet.
            </p>
            <Link
              href="/blog"
              style={{
                display: 'inline-block',
                marginTop: '1.5rem',
                color: '#c9a96e',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                textDecoration: 'underline',
              }}
            >
              Browse all articles &rarr;
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <FooterCTA />
    </div>
  )
}

function BlogArticleView({ articleSlug }: { articleSlug: string }) {
  const { post, loading, error } = useBlogPost(articleSlug)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Reading progress bar setup
  useEffect(() => {
    if (typeof window === 'undefined' || !progressBarRef.current) return

    const el = progressBarRef.current
    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (el) {
          el.style.transform = `scaleX(${self.progress})`
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [post])

  // Inject Article JSON-LD structured data client-side
  useEffect(() => {
    if (!post || typeof document === 'undefined') return

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: [post.image],
      datePublished: post.date,
      author: [
        {
          '@type': 'Organization',
          name: post.author || '1111 Decor',
          url: 'https://elevenelevendecor.com',
        },
      ],
      publisher: {
        '@type': 'Organization',
        name: '1111 Decor',
        logo: {
          '@type': 'ImageObject',
          url: 'https://elevenelevendecor.com/logo.png',
        },
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'article-jsonld'
    script.text = JSON.stringify(schemaData)
    document.head.appendChild(script)

    return () => {
      const existing = document.getElementById('article-jsonld')
      if (existing) {
        existing.remove()
      }
    }
  }, [post])

  if (loading) {
    return (
      <div style={{ paddingTop: '140px', minHeight: '80vh', textAlign: 'center', backgroundColor: '#ede5d8' }}>
        <p style={{ color: '#8a8275', fontSize: '1.25rem', fontFamily: 'var(--font-body)' }}>Loading article...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div style={{ paddingTop: '140px', minHeight: '80vh', textAlign: 'center', backgroundColor: '#ede5d8' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>
          Article Not Found
        </h1>
        <p style={{ color: '#6b6b6b', marginBottom: '2rem', fontFamily: 'var(--font-body)' }}>
          The article you are looking for might have been moved or updated.
        </p>
        <Link
          href="/blog"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.75rem',
            backgroundColor: '#c9a96e',
            color: '#ffffff',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
          }}
        >
          Return to Blog Hub
        </Link>
      </div>
    )
  }

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
    if (target) {
      const href = target.getAttribute('href')
      if (href && href.length > 1) {
        const targetEl = document.querySelector(href)
        if (targetEl) {
          e.preventDefault()
          const top = targetEl.getBoundingClientRect().top + window.scrollY - 100
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ede5d8', minHeight: '100vh' }}>
      {/* Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: '#c9a96e',
          transformOrigin: '0% 50%',
          transform: 'scaleX(0)',
          zIndex: 9999,
        }}
      />

      {/* Article Header Hero with WindRevealHeading */}
      <section
        style={{
          padding: '5rem 1.5rem 3rem',
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(201, 169, 110, 0.15)',
            color: '#a8834a',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '0.4rem 1.25rem',
            borderRadius: '20px',
            marginBottom: '1.75rem',
          }}
        >
          {post.categoryName || post.category.replace(/-/g, ' ')}
        </div>

        <div style={{ maxWidth: '1020px', margin: '0 auto 1.5rem' }}>
          <WindRevealHeading
            as="h1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 4.8vw, 3.75rem)',
              color: '#1a1a1a',
              fontWeight: 500,
              lineHeight: 1.18,
              letterSpacing: '0.02em',
            }}
          >
            {post.title}
          </WindRevealHeading>
        </div>

        <div
          style={{
            color: '#7a7266',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '1.25rem',
          }}
        >
          <span>By {post.author}</span>
          <span>&bull;</span>
          <span>{post.date}</span>
          <span>&bull;</span>
          <span>{post.readTime}</span>
        </div>
      </section>

      {/* Featured Main Image (Expanded Width) */}
      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto 4rem',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(360px, 52vw, 620px)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(0,0,0,0.1)',
          }}
        >
          <Image
            src={resolveImageUrl(post.image)}
            alt={post.title}
            fill
            unoptimized
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Article Content Body (Matched to 1100px Width) */}
      <article
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1.5rem 5rem',
        }}
      >
        {post.content ? (
          <div
            className="article-editorial-content"
            onClick={handleContentClick}
            dangerouslySetInnerHTML={{ __html: transformArticleContent(post.content) }}
          />
        ) : (
          <div className="article-editorial-content">
            <p>{post.excerpt}</p>
          </div>
        )}

        {/* FAQs Accordion if available */}
        {post.faqs && post.faqs.length > 0 && (
          <section
            style={{
              marginTop: '5rem',
              paddingTop: '3.5rem',
              borderTop: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.85rem, 3.5vw, 2.35rem)',
                color: '#1a1a1a',
                marginBottom: '2rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              Frequently Asked Questions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {post.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.08)',
                      overflow: 'hidden',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '1.35rem 1.6rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.05rem',
                        color: '#1a1a1a',
                      }}
                    >
                      <span>{faq.question}</span>
                      <span style={{ color: '#c9a96e', fontSize: '1.35rem', lineHeight: 1 }}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: '0 1.6rem 1.35rem',
                          color: '#4a443c',
                          fontFamily: 'var(--font-body)',
                          fontSize: '1rem',
                          lineHeight: 1.7,
                          borderTop: '1px solid rgba(0,0,0,0.04)',
                        }}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Related Service Link CTA Banner */}
        {post.relatedServiceSlug && (
          <div
            style={{
              marginTop: '4.5rem',
              padding: '2.25rem 2.75rem',
              backgroundColor: '#1a1a1a',
              color: '#f5f0e8',
              borderRadius: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
            }}
          >
            <div>
              <p
                style={{
                  color: '#c9a96e',
                  fontSize: '0.75rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  fontFamily: 'var(--font-body)',
                  marginBottom: '0.4rem',
                }}
              >
                RECOMMENDED SERVICE
              </p>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.65rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                {post.relatedServiceName || 'Tailored Decor Services'}
              </h4>
            </div>

            <Link
              href={`/services/${post.relatedServiceSlug}/`}
              style={{
                padding: '0.85rem 1.75rem',
                backgroundColor: '#c9a96e',
                color: '#1a1a1a',
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                transition: 'all 0.3s ease',
              }}
            >
              Explore Service &rarr;
            </Link>
          </div>
        )}
      </article>

      <FooterCTA />
    </div>
  )
}
