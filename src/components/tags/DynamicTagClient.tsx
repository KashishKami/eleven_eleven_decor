'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GLOBAL_TAGS, type GlobalTag } from '@/types/tags'
import type { BlogPost } from '@/types/blog'
import type { PortfolioProject } from '@/types/portfolio'
import type { Venue } from '@/types/venues'
import type { GalleryItem } from '@/data/gallery'
import { WindRevealHeading } from '@/components/ui/WindRevealHeading'
import { Lightbox } from '@/components/ui/Lightbox'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import { resolveImageUrl } from '@/lib/image-url'

import { usePageVisibility } from '@/hooks/usePageVisibility'

interface Props {
  tag: GlobalTag
}

type TabType = 'all' | 'blogs' | 'portfolio' | 'venues' | 'gallery'

export function DynamicTagClient({ tag }: Props) {
  const visibility = usePageVisibility()
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([])
  const [venues, setVenues] = useState<Venue[]>([])
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null)

  // Ensure activeTab resets if current active tab section is disabled
  useEffect(() => {
    if (activeTab === 'blogs' && !visibility.blog) setActiveTab('all')
    if (activeTab === 'portfolio' && !visibility.portfolio) setActiveTab('all')
    if (activeTab === 'venues' && !visibility.venues) setActiveTab('all')
    if (activeTab === 'gallery' && !visibility.gallery) setActiveTab('all')
  }, [activeTab, visibility])

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    const baseUrl = isLocal ? 'http://127.0.0.1:8080' : ''
    const apiPrefix = isLocal ? '/api' : '/php-admin/api'

    const fetchTaggedData = async () => {
      try {
        const [blogRes, portRes, venRes, galRes] = await Promise.allSettled([
          visibility.blog ? fetch(`${baseUrl}${apiPrefix}/blogs.php?tag=${encodeURIComponent(tag.slug)}`, { cache: 'no-store' }) : Promise.resolve(null),
          visibility.portfolio ? fetch(`${baseUrl}${apiPrefix}/portfolio.php?tag=${encodeURIComponent(tag.slug)}`, { cache: 'no-store' }) : Promise.resolve(null),
          visibility.venues ? fetch(`${baseUrl}${apiPrefix}/venues.php?tag=${encodeURIComponent(tag.slug)}`, { cache: 'no-store' }) : Promise.resolve(null),
          visibility.gallery ? fetch(`${baseUrl}${apiPrefix}/gallery.php?tag=${encodeURIComponent(tag.slug)}`, { cache: 'no-store' }) : Promise.resolve(null),
        ] as const)

        if (!isMounted) return

        const toArray = (data: unknown, key: string): unknown[] => {
          if (Array.isArray(data)) return data
          if (data && typeof data === 'object') {
            const record = data as Record<string, unknown>
            if (Array.isArray(record[key])) return record[key] as unknown[]
            if (Array.isArray(record['items'])) return record['items'] as unknown[]
          }
          return []
        }

        if (blogRes.status === 'fulfilled' && blogRes.value && blogRes.value.ok) {
          const data = await blogRes.value.json()
          setBlogs(toArray(data, 'posts') as BlogPost[])
        } else if (!visibility.blog) {
          setBlogs([])
        }

        if (portRes.status === 'fulfilled' && portRes.value && portRes.value.ok) {
          const data = await portRes.value.json()
          setPortfolio(toArray(data, 'projects') as PortfolioProject[])
        } else if (!visibility.portfolio) {
          setPortfolio([])
        }

        if (venRes.status === 'fulfilled' && venRes.value && venRes.value.ok) {
          const data = await venRes.value.json()
          setVenues(toArray(data, 'venues') as Venue[])
        } else if (!visibility.venues) {
          setVenues([])
        }

        if (galRes.status === 'fulfilled' && galRes.value && galRes.value.ok) {
          const data = await galRes.value.json()
          const rawItems = toArray(data, 'items') as Record<string, unknown>[]
          const formatted: GalleryItem[] = rawItems.map((g) => ({
            id: String(g['id'] || Math.random()),
            src: String(g['src'] || g['image'] || ''),
            title: String(g['title'] || ''),
            category: (g['category'] as GalleryItem['category']) || 'Weddings',
            aspectRatio: (g['aspectRatio'] as GalleryItem['aspectRatio']) || 'landscape',
          }))
          setGallery(formatted)
        } else if (!visibility.gallery) {
          setGallery([])
        }
      } catch (err) {
        console.error('Failed to load tagged content:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchTaggedData()

    return () => {
      isMounted = false
    }
  }, [tag.slug, visibility])

  const visibleBlogs = visibility.blog ? blogs : []
  const visiblePortfolio = visibility.portfolio ? portfolio : []
  const visibleVenues = visibility.venues ? venues : []
  const visibleGallery = visibility.gallery ? gallery : []

  const totalItems = visibleBlogs.length + visiblePortfolio.length + visibleVenues.length + visibleGallery.length

  const otherTags = GLOBAL_TAGS.filter((t) => t.slug !== tag.slug)

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `${tag.name} | 11:11 Decor`,
        description: tag.description,
        url: `https://1111decor.com/tags/${tag.slug}/`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1111decor.com/' },
          { '@type': 'ListItem', position: 2, name: 'Topics', item: 'https://1111decor.com/tags/' },
          { '@type': 'ListItem', position: 3, name: tag.name, item: `https://1111decor.com/tags/${tag.slug}/` },
        ],
      },
    ],
  }

  return (
    <div style={{ background: '#0a0a0a', color: '#f5f0e8', minHeight: '100vh' }}>
      <JsonLd data={schemaData} />

      {/* Hero Header */}
      <section style={{ padding: '8rem 1.5rem 4rem', background: 'radial-gradient(ellipse at 50% 20%, rgba(201, 169, 110, 0.12) 0%, rgba(10, 10, 10, 1) 75%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#8a8275' }}>
            <Link href="/" style={{ color: '#8a8275', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem', color: '#555' }}>/</span>
            <span style={{ color: '#c9a96e' }}>Topics</span>
            <span style={{ margin: '0 0.5rem', color: '#555' }}>/</span>
            <span style={{ color: '#f5f0e8' }}>{tag.name}</span>
          </nav>

          <span style={{ display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '50px', background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', color: '#c9a96e', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
            TOPIC ARCHIVE
          </span>

          <WindRevealHeading as="h1" className="heading-xl" style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
            {tag.name}
          </WindRevealHeading>

          <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', color: '#a39c90', lineHeight: 1.7 }}>
            {tag.description}
          </p>

          {/* Cross-Module Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem', marginTop: '2.5rem' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                border: activeTab === 'all' ? '1px solid #c9a96e' : '1px solid rgba(255,255,255,0.1)',
                background: activeTab === 'all' ? '#c9a96e' : 'rgba(255,255,255,0.03)',
                color: activeTab === 'all' ? '#111' : '#f5f0e8',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              All Content ({totalItems})
            </button>
            {visibility.blog && (
              <button
                onClick={() => setActiveTab('blogs')}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '8px',
                  border: activeTab === 'blogs' ? '1px solid #c9a96e' : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === 'blogs' ? '#c9a96e' : 'rgba(255,255,255,0.03)',
                  color: activeTab === 'blogs' ? '#111' : '#f5f0e8',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Articles ({visibleBlogs.length})
              </button>
            )}
            {visibility.portfolio && (
              <button
                onClick={() => setActiveTab('portfolio')}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '8px',
                  border: activeTab === 'portfolio' ? '1px solid #c9a96e' : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === 'portfolio' ? '#c9a96e' : 'rgba(255,255,255,0.03)',
                  color: activeTab === 'portfolio' ? '#111' : '#f5f0e8',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Portfolio ({visiblePortfolio.length})
              </button>
            )}
            {visibility.venues && (
              <button
                onClick={() => setActiveTab('venues')}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '8px',
                  border: activeTab === 'venues' ? '1px solid #c9a96e' : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === 'venues' ? '#c9a96e' : 'rgba(255,255,255,0.03)',
                  color: activeTab === 'venues' ? '#111' : '#f5f0e8',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Venues ({visibleVenues.length})
              </button>
            )}
            {visibility.gallery && (
              <button
                onClick={() => setActiveTab('gallery')}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '8px',
                  border: activeTab === 'gallery' ? '1px solid #c9a96e' : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === 'gallery' ? '#c9a96e' : 'rgba(255,255,255,0.03)',
                  color: activeTab === 'gallery' ? '#111' : '#f5f0e8',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Gallery ({visibleGallery.length})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Results Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#8a8275' }}>
            <p>Loading curated {tag.name.toLowerCase()} content...</p>
          </div>
        ) : totalItems === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1.5rem', background: '#141414', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '1.35rem', color: '#c9a96e', marginBottom: '0.75rem', fontFamily: 'Georgia, serif' }}>
              Fresh Inspirations Coming Soon
            </h3>
            <p style={{ color: '#8a8275', maxWidth: '550px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Our design studio is actively staging new projects, venue showcases, and decor masterclasses tagged under <strong>{tag.name}</strong>.
            </p>
            <Link
              href="/blog/"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.75rem',
                background: '#c9a96e',
                color: '#111',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              Browse All Blog Stories &rarr;
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
            {/* BLOG POSTS */}
            {visibility.blog && (activeTab === 'all' || activeTab === 'blogs') &&
              visibleBlogs.map((post) => (
                <article
                  key={`blog-${post.id || post.slug}`}
                  data-testid="tag-item-blog"
                  style={{
                    background: '#141414',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, border-color 0.2s',
                  }}
                >
                  <Link href={`/blog/${post.category}/${post.slug}/`} style={{ display: 'block', position: 'relative', width: '100%', height: '220px' }}>
                    <Image
                      src={resolveImageUrl(post.image)}
                      alt={post.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.75)', color: '#c9a96e', border: '1px solid rgba(201,169,110,0.3)', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Article
                    </span>
                  </Link>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ fontSize: '0.8rem', color: '#8a8275', marginBottom: '0.5rem' }}>
                      {post.date} &bull; {post.readTime}
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'Georgia, serif', lineHeight: 1.4 }}>
                      <Link href={`/blog/${post.category}/${post.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {post.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#8a8275', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.category}/${post.slug}/`}
                      style={{ color: '#c9a96e', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      Read Full Article &rarr;
                    </Link>
                  </div>
                </article>
              ))}

            {/* PORTFOLIO PROJECTS */}
            {visibility.portfolio && (activeTab === 'all' || activeTab === 'portfolio') &&
              visiblePortfolio.map((proj) => (
                <article
                  key={`portfolio-${proj.id || proj.slug}`}
                  data-testid="tag-item-portfolio"
                  style={{
                    background: '#141414',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Link href={`/portfolio/${proj.slug}/`} style={{ display: 'block', position: 'relative', width: '100%', height: '220px' }}>
                    <Image
                      src={resolveImageUrl(proj.heroImage || proj.images?.[0] || '')}
                      alt={proj.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.75)', color: '#86efac', border: '1px solid rgba(134,239,172,0.3)', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Portfolio
                    </span>
                  </Link>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ fontSize: '0.8rem', color: '#8a8275', marginBottom: '0.5rem' }}>
                      {proj.category} &bull; {proj.location}
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'Georgia, serif', lineHeight: 1.4 }}>
                      <Link href={`/portfolio/${proj.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {proj.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#8a8275', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                      {proj.excerpt}
                    </p>
                    <Link
                      href={`/portfolio/${proj.slug}/`}
                      style={{ color: '#c9a96e', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      View Case Study &rarr;
                    </Link>
                  </div>
                </article>
              ))}

            {/* VENUES */}
            {visibility.venues && (activeTab === 'all' || activeTab === 'venues') &&
              visibleVenues.map((venue) => (
                <article
                  key={`venue-${venue.id || venue.slug}`}
                  data-testid="tag-item-venue"
                  style={{
                    background: '#141414',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Link href={`/venues/${venue.slug}/`} style={{ display: 'block', position: 'relative', width: '100%', height: '220px' }}>
                    <Image
                      src={resolveImageUrl(venue.coverImage || venue.heroImage || venue.images?.[0] || '')}
                      alt={venue.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.75)', color: '#93c5fd', border: '1px solid rgba(147,197,253,0.3)', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Venue Staging
                    </span>
                  </Link>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ fontSize: '0.8rem', color: '#8a8275', marginBottom: '0.5rem' }}>
                      {venue.location} &bull; {venue.capacity}
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'Georgia, serif', lineHeight: 1.4 }}>
                      <Link href={`/venues/${venue.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {venue.name}
                      </Link>
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#8a8275', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>
                      {venue.excerpt || venue.tagline}
                    </p>
                    <Link
                      href={`/venues/${venue.slug}/`}
                      style={{ color: '#c9a96e', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      Explore Venue Specs &rarr;
                    </Link>
                  </div>
                </article>
              ))}

            {/* GALLERY PHOTOS */}
            {visibility.gallery && (activeTab === 'all' || activeTab === 'gallery') &&
              visibleGallery.map((photo) => (
                <article
                  key={`photo-${photo.id}`}
                  data-testid="tag-item-gallery"
                  onClick={() => setActiveLightboxItem(photo)}
                  style={{
                    background: '#141414',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    position: 'relative',
                    height: '280px',
                  }}
                >
                  <Image
                    src={resolveImageUrl(photo.src)}
                    alt={photo.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.75)', color: '#f472b6', border: '1px solid rgba(244,114,182,0.3)', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', zIndex: 2 }}>
                    Gallery
                  </span>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem' }}>
                    <span style={{ color: '#c9a96e', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{photo.category}</span>
                    <h4 style={{ color: '#ffffff', fontSize: '1rem', marginTop: '0.25rem', fontFamily: 'Georgia, serif' }}>{photo.title}</h4>
                  </div>
                </article>
              ))}
          </div>
        )}

        {/* Related Topic Tags Cloud for SEO and Cross Navigation */}
        <div style={{ marginTop: '5rem', padding: '3rem 2rem', background: '#141414', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#c9a96e', marginBottom: '1rem', fontFamily: 'Georgia, serif' }}>
            Explore More Luxury Event Topics
          </h3>
          <p style={{ color: '#8a8275', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            Discover expert event staging guides, floral inspiration, venue blueprints, and party themes.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {otherTags.map((t) => (
              <Link
                key={t.slug}
                href={`/tags/${t.slug}/`}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#d1d1d1',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                #{t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery items */}
      <Lightbox
        item={activeLightboxItem}
        items={visibleGallery}
        onClose={() => setActiveLightboxItem(null)}
        onNavigate={(newItem) => setActiveLightboxItem(newItem)}
      />

      <FooterCTA />
    </div>
  )
}
