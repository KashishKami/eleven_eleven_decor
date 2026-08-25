import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://elevenelevendecor.com').replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/manage-7f3b9x2k/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
