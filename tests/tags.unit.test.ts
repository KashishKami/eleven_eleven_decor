import { describe, it, expect } from 'vitest'
import { GLOBAL_TAGS, type GlobalTag } from '@/types/tags'
import sitemap from '@/app/sitemap'
import type { BlogPost } from '@/types/blog'
import type { PortfolioProject } from '@/types/portfolio'
import type { Venue } from '@/types/venues'
import type { GalleryItem } from '@/types/gallery'

describe('Global 15 Topic Tags Architecture & Contracts (W-705)', () => {
  it('validates the complete 15 global tags registry with clean slugs and descriptions', () => {
    const expectedTags = [
      { slug: 'event-ideas', name: 'Event Ideas' },
      { slug: 'event-planning', name: 'Event Planning' },
      { slug: 'event-decoration', name: 'Event Decoration' },
      { slug: 'event-management', name: 'Event Management' },
      { slug: 'party-ideas', name: 'Party Ideas' },
      { slug: 'party-decoration', name: 'Party Decoration' },
      { slug: 'wedding-ideas', name: 'Wedding Ideas' },
      { slug: 'wedding-decoration', name: 'Wedding Decoration' },
      { slug: 'birthday-ideas', name: 'Birthday Ideas' },
      { slug: 'birthday-decoration', name: 'Birthday Decoration' },
      { slug: 'event-themes', name: 'Event Themes' },
      { slug: 'decoration-ideas', name: 'Decoration Ideas' },
      { slug: 'event-trends', name: 'Event Trends' },
      { slug: 'celebration-ideas', name: 'Celebration Ideas' },
      { slug: 'event-inspiration', name: 'Event Inspiration' },
    ]

    expect(GLOBAL_TAGS).toBeDefined()
    expect(GLOBAL_TAGS).toHaveLength(15)

    expectedTags.forEach((expected) => {
      const found = GLOBAL_TAGS.find((t: GlobalTag) => t.slug === expected.slug)
      expect(found).toBeDefined()
      expect(found?.name).toBe(expected.name)
      expect(found?.description).toBeDefined()
      expect(found?.description.length).toBeGreaterThan(15)
    })
  })

  it('guarantees sitemap includes all 15 /tags/[slug]/ root-level URLs with trailing slashes', () => {
    const sitemapEntries = sitemap()
    const urls = sitemapEntries.map((e) => e.url)

    GLOBAL_TAGS.forEach((tag: GlobalTag) => {
      expect(urls).toContain(`https://1111decor.com/tags/${tag.slug}/`)
    })
  })

  it('validates that BlogPost, Portfolio, Venue, and Gallery types support string[] tags', () => {
    const blog: BlogPost = {
      id: '1',
      slug: 'test-post',
      title: 'Test',
      excerpt: 'Test',
      category: 'weddings',
      date: 'Aug 2026',
      author: 'Studio',
      image: '/img.jpg',
      readTime: '5 min',
      tags: ['wedding-ideas', 'event-decoration'],
    }
    expect(blog.tags).toEqual(['wedding-ideas', 'event-decoration'])

    const project: PortfolioProject = {
      id: '1',
      slug: 'test-proj',
      title: 'Project',
      category: 'Weddings',
      location: 'Dehradun',
      heroImage: '/img.jpg',
      images: ['/img.jpg'],
      excerpt: 'Test',
      description: 'Test',
      tags: ['wedding-ideas', 'event-themes'],
    }
    expect(project.tags).toEqual(['wedding-ideas', 'event-themes'])

    const venue: Venue = {
      id: '1',
      slug: 'test-venue',
      name: 'Venue',
      category: 'Resort',
      location: 'Mussoorie',
      city: 'Mussoorie',
      capacity: '500 guests',
      coverImage: '/img.jpg',
      images: ['/img.jpg'],
      excerpt: 'Test',
      description: 'Test',
      tags: ['wedding-decoration', 'event-inspiration'],
    }
    expect(venue.tags).toEqual(['wedding-decoration', 'event-inspiration'])

    const galleryItem: GalleryItem = {
      id: '1',
      title: 'Floral Mandap',
      category: 'Weddings',
      image: '/img.jpg',
      tags: ['wedding-decoration', 'decoration-ideas'],
    }
    expect(galleryItem.tags).toEqual(['wedding-decoration', 'decoration-ideas'])
  })
  it('verifies generateStaticParams provides all 15 slugs for static export', async () => {
    const { generateStaticParams, generateMetadata } = await import('@/app/tags/[slug]/page')
    const params = generateStaticParams()
    expect(params).toHaveLength(15)
    expect(params.map((p) => p.slug)).toEqual(GLOBAL_TAGS.map((t) => t.slug))

    const meta = generateMetadata({ params: { slug: 'wedding-decoration' } })
    expect(meta.title).toContain('Wedding Decoration')
    expect(meta.description).toContain('Wedding Decoration')
    expect(meta.alternates?.canonical).toBe('https://1111decor.com/tags/wedding-decoration/')

    // Edge case: non-existent slug returns fallback title
    const missingMeta = generateMetadata({ params: { slug: 'non-existent-tag' } })
    expect(missingMeta.title).toBe('Topic Tag Not Found')
  })

  describe('Edge & Special Cases: Tag Filtering & Resilience', () => {
    it('handles legacy comma-separated string tags vs array tags consistently', () => {
      const itemWithArray = { tags: ['wedding-ideas', 'event-decoration'] }
      const itemWithString = { tags: 'wedding-ideas, event-decoration' }
      const itemWithEmptyTags = { tags: [] }
      const itemWithNullTags = { tags: null }
      const itemWithUndefinedTags = {}

      const checkMatch = (item: any, tagSlug: string) => {
        const raw = item.tags
        let tagsArr: string[] = []
        if (Array.isArray(raw)) tagsArr = raw
        else if (typeof raw === 'string') tagsArr = raw.split(',').map((s) => s.trim())
        return tagsArr.some(
          (t) =>
            t.toLowerCase() === tagSlug.toLowerCase() ||
            t.toLowerCase().replace(/\s+/g, '-') === tagSlug.toLowerCase()
        )
      }

      expect(checkMatch(itemWithArray, 'wedding-ideas')).toBe(true)
      expect(checkMatch(itemWithString, 'wedding-ideas')).toBe(true)
      expect(checkMatch(itemWithString, 'event-decoration')).toBe(true)
      expect(checkMatch(itemWithEmptyTags, 'wedding-ideas')).toBe(false)
      expect(checkMatch(itemWithNullTags, 'wedding-ideas')).toBe(false)
      expect(checkMatch(itemWithUndefinedTags, 'wedding-ideas')).toBe(false)
    })

    it('handles case-insensitivity and whitespace-to-hyphen conversion', () => {
      const checkMatch = (itemTag: string, queryTag: string) => {
        const normalizedItem = itemTag.toLowerCase().trim().replace(/\s+/g, '-')
        const normalizedQuery = queryTag.toLowerCase().trim().replace(/\s+/g, '-')
        return normalizedItem === normalizedQuery
      }

      expect(checkMatch('Wedding Ideas', 'wedding-ideas')).toBe(true)
      expect(checkMatch('WEDDING-IDEAS', 'wedding-ideas')).toBe(true)
      expect(checkMatch('  Event Planning  ', 'event-planning')).toBe(true)
      expect(checkMatch('birthday-decoration', 'BIRTHDAY-DECORATION')).toBe(true)
      expect(checkMatch('Random Tag', 'wedding-ideas')).toBe(false)
    })

    it('validates all 15 global tag slugs match the strict URL-safe regex', () => {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
      GLOBAL_TAGS.forEach((tag) => {
        expect(tag.slug).toMatch(slugRegex)
        expect(tag.slug).not.toContain(' ')
        expect(tag.slug).not.toContain('_')
        expect(tag.slug).toEqual(tag.slug.toLowerCase())
      })
    })
    it('filters tagged cross-module items based on PageVisibility configuration', () => {
      const mockVisibility = {
        blog: true,
        gallery: false,
        portfolio: false,
        venues: false,
      }

      const mockBlogs: BlogPost[] = [
        { id: '1', slug: 'wedding-guide', title: 'Wedding Guide', excerpt: '...', category: 'weddings', date: 'Sep 2026', author: 'Team', image: '/img.jpg', readTime: '5 min', tags: ['event-planning'] },
      ]
      const mockProjects: PortfolioProject[] = [
        { id: '1', slug: 'royal-wedding', title: 'Royal Wedding', category: 'Weddings', location: 'Dehradun', excerpt: '...', description: '...', heroImage: '/img.jpg', images: ['/img.jpg'], tags: ['event-planning'] },
      ]
      const mockVenues: Venue[] = [
        { id: '1', slug: 'grand-palace', name: 'Grand Palace', category: 'Resort', location: 'Dehradun', city: 'Dehradun', capacity: '500', excerpt: '...', description: '...', coverImage: '/img.jpg', images: ['/img.jpg'], tags: ['event-planning'] },
      ]
      const mockGallery: GalleryItem[] = [
        { id: '1', title: 'Stage', category: 'Weddings', src: '/img.jpg', aspectRatio: 'landscape', tags: ['event-planning'] },
      ]

      // Filter function simulating DynamicTagClient visibility filtering
      const filterByVisibility = (items: { blogs: BlogPost[]; portfolio: PortfolioProject[]; venues: Venue[]; gallery: GalleryItem[] }, vis: typeof mockVisibility) => {
        const visibleBlogs = vis.blog ? items.blogs : []
        const visiblePortfolio = vis.portfolio ? items.portfolio : []
        const visibleVenues = vis.venues ? items.venues : []
        const visibleGallery = vis.gallery ? items.gallery : []
        return {
          blogs: visibleBlogs,
          portfolio: visiblePortfolio,
          venues: visibleVenues,
          gallery: visibleGallery,
          total: visibleBlogs.length + visiblePortfolio.length + visibleVenues.length + visibleGallery.length,
        }
      }

      const filtered = filterByVisibility(
        { blogs: mockBlogs, portfolio: mockProjects, venues: mockVenues, gallery: mockGallery },
        mockVisibility
      )

      expect(filtered.blogs).toHaveLength(1)
      expect(filtered.portfolio).toHaveLength(0)
      expect(filtered.venues).toHaveLength(0)
      expect(filtered.gallery).toHaveLength(0)
      expect(filtered.total).toBe(1)
    })
  })
})
