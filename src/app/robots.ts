import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/manage-7f3b9x2k/'],
    },
    sitemap: 'https://1111decor.com/php-admin/api/sitemap-index.php',
  }
}
