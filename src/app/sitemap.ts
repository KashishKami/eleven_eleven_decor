import type { MetadataRoute } from 'next'
import { getPageVisibility } from '@/lib/server-visibility'
import { SERVICES_DATA } from '@/data/services'
import { EVENT_CATEGORIES } from '@/data/events'
import { PORTFOLIO_PROJECTS } from '@/data/portfolio'
import { VENUES } from '@/data/venues'
import { BLOG_CATEGORIES } from '@/types/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const pageVisibility = getPageVisibility()
  // Uses environment variable NEXT_PUBLIC_SITE_URL if configured, with a default fallback
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://1111decor.com').replace(/\/$/, '')
  const currentDate = new Date().toISOString().split('T')[0]

  // Core Static Hub Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/testimonials/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...(pageVisibility.portfolio
      ? [
          {
            url: `${baseUrl}/portfolio/`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
          },
        ]
      : []),
    ...(pageVisibility.venues
      ? [
          {
            url: `${baseUrl}/venues/`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
          },
        ]
      : []),
    ...(pageVisibility.gallery
      ? [
          {
            url: `${baseUrl}/gallery/`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          },
        ]
      : []),
    ...(pageVisibility.blog
      ? [
          {
            url: `${baseUrl}/blog/`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.85,
          },
        ]
      : []),
    {
      url: `${baseUrl}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  // Dynamic Service Detail Pages
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Dynamic Event Category Detail Pages
  const eventRoutes: MetadataRoute.Sitemap = EVENT_CATEGORIES.map((event) => ({
    url: `${baseUrl}/events/${event.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Dynamic Portfolio Case Studies (gated by visibility)
  const portfolioRoutes: MetadataRoute.Sitemap = pageVisibility.portfolio
    ? PORTFOLIO_PROJECTS.map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}/`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.75,
      }))
    : []

  // Dynamic Venue Detail Pages (gated by visibility)
  const venueRoutes: MetadataRoute.Sitemap = pageVisibility.venues
    ? VENUES.map((venue) => ({
        url: `${baseUrl}/venues/${venue.slug}/`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.75,
      }))
    : []

  // Blog Category Hub Pages (gated by visibility)
  const blogCategoryRoutes: MetadataRoute.Sitemap = pageVisibility.blog
    ? BLOG_CATEGORIES.map((category) => ({
        url: `${baseUrl}/blog/${category.slug}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    : []

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...eventRoutes,
    ...portfolioRoutes,
    ...venueRoutes,
    ...blogCategoryRoutes,
  ]
}
