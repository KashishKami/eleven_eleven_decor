import type { MetadataRoute } from 'next'
import { SERVICES_DATA } from '@/data/services'
import { EVENT_CATEGORIES } from '@/data/events'
import { PORTFOLIO_PROJECTS } from '@/data/portfolio'
import { VENUES } from '@/data/venues'
import { BLOG_CATEGORIES } from '@/types/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  // Uses environment variable NEXT_PUBLIC_SITE_URL if configured, with a default fallback
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://elevenelevendecor.com').replace(/\/$/, '')
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
    {
      url: `${baseUrl}/portfolio/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/venues/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
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

  // Dynamic Portfolio Case Studies
  const portfolioRoutes: MetadataRoute.Sitemap = PORTFOLIO_PROJECTS.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  // Dynamic Venue Detail Pages
  const venueRoutes: MetadataRoute.Sitemap = VENUES.map((venue) => ({
    url: `${baseUrl}/venues/${venue.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  // Blog Category Hub Pages
  const blogCategoryRoutes: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((category) => ({
    url: `${baseUrl}/blog/${category.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...eventRoutes,
    ...portfolioRoutes,
    ...venueRoutes,
    ...blogCategoryRoutes,
  ]
}
